import pdfplumber
from docx import Document
import re


SKILLS_DB = [
    "python", "java", "javascript", "react", "nodejs",
    "mongodb", "sql", "html", "css", "tailwind",
    "fastapi", "django", "machine learning", "data science"
]


def extract_text_from_pdf(file_path: str) -> str:
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
    return text.strip()


def extract_text_from_docx(file_path: str) -> str:
    doc = Document(file_path)
    return "\n".join([para.text for para in doc.paragraphs]).strip()


def extract_email(text: str) -> str:
    match = re.search(r"[\w\.-]+@[\w\.-]+\.\w+", text)
    return match.group() if match else ""


def extract_phone(text: str) -> str:
    match = re.search(r"(\+91[\-\s]?)?[6-9]\d{9}", text)
    return match.group() if match else ""


def extract_experience_years(text: str) -> int:
    match = re.search(r"(\d+)\+?\s+years?", text, re.IGNORECASE)
    return int(match.group(1)) if match else 0


def extract_skills(text: str):
    text_lower = text.lower()
    found_skills = []

    for skill in SKILLS_DB:
        if skill.lower() in text_lower:
            found_skills.append(skill)

    return found_skills


def extract_education(text: str):
    education_keywords = [
        "Bachelor of Technology",
        "B.Tech",
        "BCA",
        "B.Com",
        "Bachelor of Commerce",
        "MCA",
        "MBA",
        "B.Sc",
        "M.Tech"
    ]

    found = []

    for edu in education_keywords:
        if edu.lower() in text.lower():
            found.append(edu)

    return found


def parse_resume(file_path: str, filename: str):
    if filename.lower().endswith(".pdf"):
        text = extract_text_from_pdf(file_path)

    elif filename.lower().endswith(".docx"):
        text = extract_text_from_docx(file_path)

    else:
        raise ValueError("Unsupported file type. Use PDF or DOCX.")

    return {
        "email": extract_email(text),
        "phone": extract_phone(text),
        "skills": extract_skills(text),
        "education": extract_education(text),
        "experience_years": extract_experience_years(text),
        "raw_text": text
    }