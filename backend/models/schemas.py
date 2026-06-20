from pydantic import BaseModel
from typing import List, Dict, Any

class ResumeResponse(BaseModel):
    resume_id: str
    email: str
    skills: List[str]
    education: List[str]
    experience_years: int
    ats_score: Dict[str, Any]
    matched_jobs: List[Dict[str, Any]]
    skill_gap: List[str]