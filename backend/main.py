from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from backend.database import create_tables
from backend.routers import proposals, reviews, tenders


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_tables()
    yield


app = FastAPI(title="AI Proposal Generator", version="0.1.0", lifespan=lifespan)

app.include_router(tenders.router, prefix="/api/v1")
app.include_router(proposals.router, prefix="/api/v1")
app.include_router(reviews.router, prefix="/api/v1")

app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")
