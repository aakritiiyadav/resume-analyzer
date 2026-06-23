job_roles = {
    "Frontend Developer": ["html", "css", "javascript", "react"],
    "Backend Developer": ["python", "fastapi", "mongodb", "sql"],
    "Data Analyst": ["python", "sql", "excel", "pandas"],
    "Machine Learning Engineer": ["python", "machine learning", "numpy", "pandas"]
}


def match_jobs(skills):
    matched = []

    for role, required_skills in job_roles.items():
        common_skills = list(set(skills) & set(required_skills))

        if common_skills:
            matched.append({
                "job_role": role,
                "matched_skills": common_skills,
                "match_percentage": int((len(common_skills) / len(required_skills)) * 100)
            })

    return matched


def get_skill_gap(skills):
    missing_skills = []

    for role, required_skills in job_roles.items():
        for skill in required_skills:
            if skill not in skills:
                missing_skills.append(skill)

    return list(set(missing_skills))