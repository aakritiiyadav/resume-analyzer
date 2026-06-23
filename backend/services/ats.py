def calculate_ats_score(parsed_data):
    score = 0

    skills = parsed_data.get("skills", [])
    education = parsed_data.get("education", [])
    experience = parsed_data.get("experience_years", 0)

    if len(skills) >= 5:
        score += 40
    elif len(skills) >= 3:
        score += 25
    else:
        score += 10

    if education:
        score += 30

    if experience >= 1:
        score += 30

    return {
        "total_score": score,
        "feedback": "Good Resume" if score >= 70 else "Needs Improvement"
    }