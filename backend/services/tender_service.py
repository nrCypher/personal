from sqlalchemy.orm import Session

from backend.models import Tender
from backend.schemas import TenderCreate


def create_tender(db: Session, data: TenderCreate) -> Tender:
    tender = Tender(title=data.title, raw_text=data.raw_text, status="draft")
    db.add(tender)
    db.commit()
    db.refresh(tender)
    return tender


def get_tenders(db: Session) -> list[Tender]:
    return db.query(Tender).order_by(Tender.created_at.desc()).all()


def get_tender(db: Session, tender_id: int) -> Tender | None:
    return db.query(Tender).filter(Tender.id == tender_id).first()


def delete_tender(db: Session, tender_id: int) -> bool:
    tender = get_tender(db, tender_id)
    if not tender:
        return False
    db.delete(tender)
    db.commit()
    return True
