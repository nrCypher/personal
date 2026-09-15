from datetime import datetime

from pydantic import BaseModel


class TenderCreate(BaseModel):
    title: str
    raw_text: str


class TenderResponse(BaseModel):
    id: int
    title: str
    raw_text: str
    extracted_requirements: str | None
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class TenderListItem(BaseModel):
    id: int
    title: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class ProposalGenerateRequest(BaseModel):
    guidance: str | None = None


class ProposalRegenerateRequest(BaseModel):
    feedback: str


class ProposalResponse(BaseModel):
    id: int
    tender_id: int
    version: int
    content: str
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ProposalListItem(BaseModel):
    id: int
    tender_id: int
    version: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class ReviewResponse(BaseModel):
    id: int
    proposal_id: int
    compliance_score: float
    summary: str
    requirement_checks: str
    issues_found: str
    recommendation: str
    created_at: datetime

    class Config:
        from_attributes = True


class DecisionRequest(BaseModel):
    decision: str
    feedback: str | None = None
