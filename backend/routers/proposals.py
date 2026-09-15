from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.schemas import (
    ProposalGenerateRequest,
    ProposalListItem,
    ProposalRegenerateRequest,
    ProposalResponse,
)
from backend.services import proposal_service, tender_service
from backend.services.ai_service import AIService

router = APIRouter(tags=["proposals"])


@router.post("/tenders/{tender_id}/proposals/generate", response_model=ProposalResponse)
def generate_proposal(
    tender_id: int,
    data: ProposalGenerateRequest | None = None,
    db: Session = Depends(get_db),
):
    tender = tender_service.get_tender(db, tender_id)
    if not tender:
        raise HTTPException(status_code=404, detail="Concurso nao encontrado")
    if tender.status == "draft" or not tender.extracted_requirements:
        raise HTTPException(
            status_code=400,
            detail="Concurso ainda nao foi analisado. Analise primeiro.",
        )

    ai = AIService()
    guidance = data.guidance if data else None
    content = ai.generate_proposal(
        title=tender.title,
        requirements=tender.extracted_requirements,
        guidance=guidance,
    )

    version = proposal_service.get_latest_version(db, tender_id) + 1
    proposal = proposal_service.create_proposal(db, tender_id, content, version)

    tender.status = "proposal_generated"
    db.commit()

    return proposal


@router.get("/tenders/{tender_id}/proposals", response_model=list[ProposalListItem])
def list_proposals(tender_id: int, db: Session = Depends(get_db)):
    tender = tender_service.get_tender(db, tender_id)
    if not tender:
        raise HTTPException(status_code=404, detail="Concurso nao encontrado")
    return proposal_service.get_proposals_for_tender(db, tender_id)


@router.get("/proposals/{proposal_id}", response_model=ProposalResponse)
def get_proposal(proposal_id: int, db: Session = Depends(get_db)):
    proposal = proposal_service.get_proposal(db, proposal_id)
    if not proposal:
        raise HTTPException(status_code=404, detail="Proposta nao encontrada")
    return proposal


@router.post("/proposals/{proposal_id}/regenerate", response_model=ProposalResponse)
def regenerate_proposal(
    proposal_id: int,
    data: ProposalRegenerateRequest,
    db: Session = Depends(get_db),
):
    proposal = proposal_service.get_proposal(db, proposal_id)
    if not proposal:
        raise HTTPException(status_code=404, detail="Proposta nao encontrada")

    tender = tender_service.get_tender(db, proposal.tender_id)

    ai = AIService()
    content = ai.regenerate_proposal(
        title=tender.title,
        requirements=tender.extracted_requirements,
        previous_content=proposal.content,
        previous_version=proposal.version,
        feedback=data.feedback,
    )

    new_version = proposal_service.get_latest_version(db, tender.id) + 1
    new_proposal = proposal_service.create_proposal(
        db, tender.id, content, new_version
    )
    return new_proposal
