def calculate_ats_score(text: str, skills: list, experience: int) -> dict:
    score = 0
    breakdown = {}

    # Skills score (max 40)
    skill_score = min(len(skills) * 4, 40)
    score += skill_score
    breakdown["skills"] = skill_score

    # Experience score (max 20)
    exp_score = min(experience * 5, 20)
    score += exp_score
    breakdown["experience"] = exp_score

    # Important sections (max 20)
    text_lower = text.lower()
    sections = {
        "contact": any(k in text_lower for k in ["email", "phone", "@", "mobile"]),
        "skills": "skill" in text_lower,
        "projects": "project" in text_lower,
        "education": any(k in text_lower for k in ["education", "college", "university"]),
    }

    section_score = sum(5 for v in sections.values() if v)
    score += section_score
    breakdown["sections"] = section_score

    # Formatting score (max 20)
    lines = [line for line in text.split("\n") if line.strip()]
    format_score = min(len(lines) // 3, 20)
    score += format_score
    breakdown["formatting"] = format_score

    return {
        "total": min(score, 100),
        "breakdown": breakdown,
        "sections_found": sections
    }