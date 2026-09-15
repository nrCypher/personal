from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.schemas import TenderCreate, TenderListItem, TenderResponse
from backend.services import tender_service
from backend.services.ai_service import AIService

router = APIRouter(tags=["tenders"])


@router.post("/tenders", response_model=TenderResponse)
def create_tender(data: TenderCreate, db: Session = Depends(get_db)):
    return tender_service.create_tender(db, data)


@router.get("/tenders", response_model=list[TenderListItem])
def list_tenders(db: Session = Depends(get_db)):
    return tender_service.get_tenders(db)


@router.get("/tenders/{tender_id}", response_model=TenderResponse)
def get_tender(tender_id: int, db: Session = Depends(get_db)):
    tender = tender_service.get_tender(db, tender_id)
    if not tender:
        raise HTTPException(status_code=404, detail="Concurso nao encontrado")
    return tender


@router.delete("/tenders/{tender_id}")
def delete_tender(tender_id: int, db: Session = Depends(get_db)):
    if not tender_service.delete_tender(db, tender_id):
        raise HTTPException(status_code=404, detail="Concurso nao encontrado")
    return {"message": "Concurso eliminado"}


@router.post("/tenders/{tender_id}/analyze", response_model=TenderResponse)
def analyze_tender(tender_id: int, db: Session = Depends(get_db)):
    tender = tender_service.get_tender(db, tender_id)
    if not tender:
        raise HTTPException(status_code=404, detail="Concurso nao encontrado")

    ai = AIService()
    requirements = ai.extract_requirements(tender.raw_text)

    tender.extracted_requirements = requirements
    tender.status = "analyzed"
    db.commit()
    db.refresh(tender)
    return tender
