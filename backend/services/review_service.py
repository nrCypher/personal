from sqlalchemy.orm import Session

from backend.models import Review


def get_reviews_for_proposal(db: Session, proposal_id: int) -> list[Review]:
    return (
        db.query(Review)
        .filter(Review.proposal_id == proposal_id)
        .order_by(Review.created_at.desc())
        .all()
    )


def get_review(db: Session, review_id: int) -> Review | None:
    return db.query(Review).filter(Review.id == review_id).first()


def create_review(
    db: Session,
    proposal_id: int,
    compliance_score: float,
    summary: str,
    requirement_checks: str,
    issues_found: str,
    recommendation: str,
) -> Review:
    review = Review(
        proposal_id=proposal_id,
        compliance_score=compliance_score,
        summary=summary,
        requirement_checks=requirement_checks,
        issues_found=issues_found,
        recommendation=recommendation,
    )
    db.add(review)
    db.commit()
    db.refresh(review)
    return review
