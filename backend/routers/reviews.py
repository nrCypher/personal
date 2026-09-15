import json

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.schemas import DecisionRequest, ReviewResponse
from backend.services import proposal_service, review_service, tender_service
from backend.services.ai_service import AIService

router = APIRouter(tags=["reviews"])


@router.post("/proposals/{proposal_id}/review", response_model=ReviewResponse)
def review_proposal(proposal_id: int, db: Session = Depends(get_db)):
    proposal = proposal_service.get_proposal(db, proposal_id)
    if not proposal:
        raise HTTPException(status_code=404, detail="Proposta nao encontrada")

    tender = tender_service.get_tender(db, proposal.tender_id)
    if not tender or not tender.extracted_requirements:
        raise HTTPException(
            status_code=400, detail="Concurso sem requisitos extraidos"
        )

    ai = AIService()
    result = ai.review_proposal(
        requirements=tender.extracted_requirements,
        proposal_content=proposal.content,
    )

    review = review_service.create_review(
        db=db,
        proposal_id=proposal_id,
        compliance_score=result.get("overall_compliance_score", 0),
        summary=result.get("summary", ""),
        requirement_checks=json.dumps(
            result.get("requirement_checks", []), ensure_ascii=False
        ),
        issues_found=json.dumps(
            result.get("issues", []), ensure_ascii=False
        ),
        recommendation=result.get("recommendation", "rever"),
    )

    proposal.status = "reviewed"
    db.commit()

    return review


@router.get("/proposals/{proposal_id}/reviews", response_model=list[ReviewResponse])
def list_reviews(proposal_id: int, db: Session = Depends(get_db)):
    proposal = proposal_service.get_proposal(db, proposal_id)
    if not proposal:
        raise HTTPException(status_code=404, detail="Proposta nao encontrada")
    return review_service.get_reviews_for_proposal(db, proposal_id)


@router.get("/reviews/{review_id}", response_model=ReviewResponse)
def get_review(review_id: int, db: Session = Depends(get_db)):
    review = review_service.get_review(db, review_id)
    if not review:
        raise HTTPException(status_code=404, detail="Revisao nao encontrada")
    return review


@router.post("/reviews/{review_id}/decision", response_model=ReviewResponse)
def make_decision(
    review_id: int, data: DecisionRequest, db: Session = Depends(get_db)
):
    review = review_service.get_review(db, review_id)
    if not review:
        raise HTTPException(status_code=404, detail="Revisao nao encontrada")

    if data.decision not in ("accept", "reject"):
        raise HTTPException(
            status_code=400, detail="Decisao deve ser 'accept' ou 'reject'"
        )

    proposal = proposal_service.get_proposal(db, review.proposal_id)
    proposal.status = "accepted" if data.decision == "accept" else "rejected"
    db.commit()
    db.refresh(review)
    return review
