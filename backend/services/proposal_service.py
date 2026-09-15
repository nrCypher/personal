from sqlalchemy.orm import Session

from backend.models import Proposal


def get_proposals_for_tender(db: Session, tender_id: int) -> list[Proposal]:
    return (
        db.query(Proposal)
        .filter(Proposal.tender_id == tender_id)
        .order_by(Proposal.version.desc())
        .all()
    )


def get_proposal(db: Session, proposal_id: int) -> Proposal | None:
    return db.query(Proposal).filter(Proposal.id == proposal_id).first()


def get_latest_version(db: Session, tender_id: int) -> int:
    last = (
        db.query(Proposal)
        .filter(Proposal.tender_id == tender_id)
        .order_by(Proposal.version.desc())
        .first()
    )
    return last.version if last else 0


def create_proposal(db: Session, tender_id: int, content: str, version: int) -> Proposal:
    proposal = Proposal(
        tender_id=tender_id,
        content=content,
        version=version,
        status="draft",
    )
    db.add(proposal)
    db.commit()
    db.refresh(proposal)
    return proposal
