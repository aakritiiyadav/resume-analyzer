from pydantic import BaseModel
from typing import List, Dict, Any
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from db.database import collection
from services.parser import parse_resume
from services.matcher import match_jobs, get_skill_gap
from services.ats import calculate_ats_score
from routes.auth import get_current_user_id
import os

router = APIRouter()


class ResumeResponse(BaseModel):
    resume_id: str
    email: str
    skills: List[str]
    education: List[str]
    experience_years: int
    ats_score: Dict[str, Any]
    matched_jobs: List[Dict[str, Any]]
    skill_gap: List[str]


@router.get("/")
def home():
    return {"message": "Resume route working"}


@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...), user_id: str = Depends(get_current_user_id)):
    try:
        os.makedirs("temp_uploads", exist_ok=True)

        file_path = f"temp_uploads/{file.filename}"

        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)

        parsed_data = parse_resume(file_path, file.filename)

        print("PARSED DATA:", parsed_data)

        matched_jobs = match_jobs(parsed_data["skills"])
        print("MATCHED JOBS:", matched_jobs)

        skill_gap = get_skill_gap(parsed_data["skills"])
        print("SKILL GAP:", skill_gap)

        ats_score = calculate_ats_score(parsed_data)
        print("ATS SCORE:", ats_score)

        resume_data = {
            "user_id": user_id,
            "email": parsed_data.get("email", ""),
            "skills": parsed_data.get("skills", []),
            "education": parsed_data.get("education", []),
            "experience_years": parsed_data.get("experience_years", 0),
            "ats_score": ats_score,
            "matched_jobs": matched_jobs,
            "skill_gap": skill_gap
        }

        inserted = collection.insert_one(resume_data)

        return {
            "resume_id": str(inserted.inserted_id),   # FIX HERE
            "email": resume_data["email"],
            "skills": resume_data["skills"],
            "education": resume_data["education"],
            "experience_years": resume_data["experience_years"],
            "ats_score": resume_data["ats_score"],
            "matched_jobs": resume_data["matched_jobs"],
            "skill_gap": resume_data["skill_gap"]
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}"
        )


@router.get("/history")
def get_history(user_id: str = Depends(get_current_user_id)):
    try:
        resumes = list(collection.find({"user_id": user_id}))

        for resume in resumes:
            resume["_id"] = str(resume["_id"])

        return resumes

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )