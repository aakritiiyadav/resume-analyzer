from fastapi import APIRouter, UploadFile, File, HTTPException
from services.parser import parse_resume, extract_email
from services.nlp import analyze_resume
from services.scorer import calculate_ats_score
from services.matcher import match_jobs, get_skill_gap
from db.database import resumes_collection
import shutil
import os
import uuid

router = APIRouter()

UPLOAD_DIR = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "temp_uploads"
)

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.get("/")
def home():
    return {"message": "Resume route working"}


@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    if not (
        file.filename.lower().endswith(".pdf")
        or file.filename.lower().endswith(".docx")
    ):
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files allowed"
        )

    file_id = str(uuid.uuid4())
    file_path = os.path.join(
        UPLOAD_DIR,
        f"{file_id}_{file.filename}"
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        text = parse_resume(file_path, file.filename)

        if not text or len(text) < 50:
            raise HTTPException(
                status_code=400,
                detail="Resume content not readable"
            )

        email = extract_email(text)
        analysis = analyze_resume(text)

        ats = calculate_ats_score(
            text,
            analysis["skills"],
            analysis["experience_years"]
        )

        jobs = match_jobs(text)

        gap = get_skill_gap(
            analysis["skills"],
            jobs
        )

        resume_doc = {
            "resume_id": file_id,
            "email": email,
            "raw_text": text,
            **analysis,
            "ats_score": ats,
            "matched_jobs": jobs,
            "skill_gap": gap
        }

        await resumes_collection.insert_one(resume_doc)

        resume_doc.pop("_id", None)
        resume_doc.pop("raw_text", None)

        return resume_doc

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}"
        )

    finally:
        if os.path.exists(file_path):
            os.remove(file_path)