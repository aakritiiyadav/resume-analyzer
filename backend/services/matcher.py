from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

with open(os.path.join(BASE_DIR, "datasets", "jobs.json")) as f:
    JOBS = json.load(f)


def match_jobs(resume_text: str, top_n: int = 5) -> list:
    job_texts = [
        " ".join(job["skills"]) + " " + job["description"]
        for job in JOBS
    ]

    all_texts = [resume_text] + job_texts

    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf_matrix = vectorizer.fit_transform(all_texts)

    scores = cosine_similarity(
        tfidf_matrix[0:1],
        tfidf_matrix[1:]
    ).flatten()

    ranked = sorted(
        zip(JOBS, scores),
        key=lambda x: x[1],
        reverse=True
    )[:top_n]

    return [
        {
            "role": job["role"],
            "match_percent": round(float(score) * 100, 1),
            "skills_required": job["skills"]
        }
        for job, score in ranked
    ]


def get_skill_gap(resume_skills: list, matched_jobs: list) -> list:
    if not matched_jobs:
        return []

    top_job_skills = matched_jobs[0]["skills_required"]
    resume_lower = [skill.lower() for skill in resume_skills]

    return [
        skill for skill in top_job_skills
        if skill.lower() not in resume_lower
    ]