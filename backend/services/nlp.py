import json
import re
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

with open(os.path.join(BASE_DIR, "datasets", "skills.json")) as f:
    SKILLS_DB = [s.lower() for s in json.load(f)]

EDUCATION_KEYWORDS = [
    "b.tech", "btech", "b.e", "mca", "bca",
    "m.tech", "msc", "bsc", "bachelor",
    "master", "phd", "diploma", "mba"
]

def extract_skills(text: str) -> list:
    text_lower = text.lower()
    return [
        skill for skill in SKILLS_DB
        if re.search(rf"\b{re.escape(skill)}\b", text_lower)
    ]

def extract_education(text: str) -> list:
    text_lower = text.lower()
    return [edu for edu in EDUCATION_KEYWORDS if edu in text_lower]

def extract_experience(text: str) -> int:
    match = re.search(r"(\d+)\+?\s+years?", text, re.IGNORECASE)
    return int(match.group(1)) if match else 0

def analyze_resume(text: str) -> dict:
    return {
        "skills": extract_skills(text),
        "education": extract_education(text),
        "experience_years": extract_experience(text),
    }