from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from db.database import collection
from services.parser import parse_resume
from services.ats import calculate_ats_score
from routes.auth import get_current_user_id
from services.ml_processor import predict_role_ml, calculate_semantic_similarity, extract_ner_entities, recommend_roles_ml
import os

router = APIRouter()


class ResumeResponse(BaseModel):
    resume_id: Optional[str] = None
    email: str
    skills: List[str]
    education: List[str]
    experience_years: int
    companies: List[str]
    predicted_role: str
    ats_score: Dict[str, Any]
    matched_jobs: List[Dict[str, Any]]
    skill_gap: List[str]


@router.get("/")
def home():
    return {"message": "Resume route working"}


def process_resume_ml(file_path: str, filename: str) -> dict:
    """Helper to parse a resume file and execute ML processing models."""
    # 1. Parse raw text
    parsed_data = parse_resume(file_path, filename)
    raw_text = parsed_data.get("raw_text", "")
    
    # 2. Extract entities using spaCy NER
    nlp_entities = extract_ner_entities(raw_text)
    
    # Merge regex parse with NLP entities
    skills = list(set(parsed_data.get("skills", []) + nlp_entities.get("skills", [])))
    education = list(set(parsed_data.get("education", []) + nlp_entities.get("education", [])))
    experience_years = max(parsed_data.get("experience_years", 0), nlp_entities.get("experience_years", 0))
    companies = nlp_entities.get("companies", [])
    
    merged_data = {
        "skills": skills,
        "education": education,
        "experience_years": experience_years,
        "companies": companies,
        "raw_text": raw_text
    }
    
    # 3. Job recommendations using Semantic Similarity (ML recommendation)
    matched_jobs = recommend_roles_ml(raw_text)
    
    # 4. Predicted role using Classification model (scikit-learn)
    predicted_role = predict_role_ml(raw_text)
    
    # 5. Extract skill gaps
    skill_gap = []
    for job in matched_jobs:
        skill_gap.extend(job.get("missing_skills", []))
    skill_gap = list(set(skill_gap))
    
    # 6. Calculate ATS score
    ats_score = calculate_ats_score(merged_data)
    
    return {
        "email": parsed_data.get("email", ""),
        "skills": skills,
        "education": education,
        "experience_years": experience_years,
        "companies": companies,
        "predicted_role": predicted_role,
        "ats_score": ats_score,
        "matched_jobs": matched_jobs,
        "skill_gap": skill_gap
    }


@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...), user_id: str = Depends(get_current_user_id)):
    try:
        os.makedirs("temp_uploads", exist_ok=True)
        file_path = f"temp_uploads/{file.filename}"

        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)

        # Run ML processing pipeline
        analysis = process_resume_ml(file_path, file.filename)

        resume_data = {
            "user_id": user_id,
            "email": analysis["email"],
            "skills": analysis["skills"],
            "education": analysis["education"],
            "experience_years": analysis["experience_years"],
            "companies": analysis["companies"],
            "predicted_role": analysis["predicted_role"],
            "ats_score": analysis["ats_score"],
            "matched_jobs": analysis["matched_jobs"],
            "skill_gap": analysis["skill_gap"]
        }

        # Save to database
        inserted = collection.insert_one(resume_data)

        # Delete temp file
        if os.path.exists(file_path):
            os.remove(file_path)

        return {
            "resume_id": str(inserted.inserted_id),
            "email": resume_data["email"],
            "skills": resume_data["skills"],
            "education": resume_data["education"],
            "experience_years": resume_data["experience_years"],
            "companies": resume_data["companies"],
            "predicted_role": resume_data["predicted_role"],
            "ats_score": resume_data["ats_score"],
            "matched_jobs": resume_data["matched_jobs"],
            "skill_gap": resume_data["skill_gap"]
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}"
        )


@router.post("/upload-resume-public")
async def upload_resume_public(file: UploadFile = File(...)):
    """Allows anonymous users to upload a resume and receive the score/ML report without authentication."""
    try:
        os.makedirs("temp_uploads", exist_ok=True)
        file_path = f"temp_uploads/{file.filename}"

        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)

        # Run ML processing pipeline
        analysis = process_resume_ml(file_path, file.filename)

        # Delete temp file
        if os.path.exists(file_path):
            os.remove(file_path)

        return {
            "resume_id": None,
            "email": analysis["email"],
            "skills": analysis["skills"],
            "education": analysis["education"],
            "experience_years": analysis["experience_years"],
            "companies": analysis["companies"],
            "predicted_role": analysis["predicted_role"],
            "ats_score": analysis["ats_score"],
            "matched_jobs": analysis["matched_jobs"],
            "skill_gap": analysis["skill_gap"]
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