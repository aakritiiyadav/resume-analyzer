from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.resume import router as resume_router
from routes.auth import router as auth_router

app = FastAPI(
    title="Resume Analyzer API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    resume_router,
    prefix="/api"
)

app.include_router(
    auth_router,
    prefix="/api/auth"
)

@app.get("/")
def root():
    return {
        "status": "Resume Analyzer API is running"
    }