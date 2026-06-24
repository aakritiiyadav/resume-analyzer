import re
import spacy
from spacy.matcher import PhraseMatcher
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import numpy as np

# Load spaCy model
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    import subprocess
    import sys
    subprocess.run([sys.executable, "-m", "spacy", "download", "en_core_web_sm"], capture_output=True)
    try:
        nlp = spacy.load("en_core_web_sm")
    except Exception:
        # Fallback dummy nlp class if loading still fails in specific envs
        class DummyNLP:
            def __call__(self, text):
                class DummyDoc:
                    ents = []
                    vocab = None
                return DummyDoc()
        nlp = DummyNLP()

# Load SentenceTransformers (lazy load to speed up API start)
_similarity_model = None

def get_similarity_model():
    global _similarity_model
    if _similarity_model is None:
        try:
            from sentence_transformers import SentenceTransformer
            _similarity_model = SentenceTransformer('all-MiniLM-L6-v2')
        except Exception as e:
            print("SentenceTransformers load error, falling back to TF-IDF:", e)
            _similarity_model = "TFIDF"
    return _similarity_model

# ----------------- CLASSIFICATION MODEL (scikit-learn) -----------------
# Dataset for training typical resume profiles
TRAINING_RESUMES = [
    "frontend developer react js css html web design user interface developer reactjs javascript developer redux typescript html5 css3 tailwind frontend engineer UI",
    "experienced frontend developer building responsive web applications using react nextjs UI designer creating components",
    "ui engineer creating pixel perfect components web page animations styled components javascript typescript",
    "frontend engineer building high performance user interfaces nextjs component libraries react tailwindcss",
    "backend engineer python django fastapi database sql postgres mysql redis rest api devops docker microservices",
    "java spring boot backend developer microservices architecture relational databases hibernate oracle system engineer",
    "backend system developer nodejs express sql server mongodb api integration node developer",
    "system designer developer python flask postgres docker kubernetes backend infrastructure developer",
    "data scientist machine learning models pandas numpy scikit-learn deep learning tensorflow pytorch NLP",
    "ml engineer building neural networks regression classification computer vision spacy scikit-learn",
    "data analyst sql dashboard excel powerbi tableau reports business intelligence analyst data pipelines",
    "data analytics python pandas statistics data scientist exploratory data analysis visualization matplotlib",
    "machine learning researcher pytorch natural language processing computer vision data scientist"
]
TRAINING_LABELS = [
    "Frontend Developer", "Frontend Developer", "Frontend Developer", "Frontend Developer",
    "Backend Engineer", "Backend Engineer", "Backend Engineer", "Backend Engineer",
    "Data Scientist", "Data Scientist", "Data Scientist", "Data Scientist", "Data Scientist"
]

# Train the classifier
vectorizer = TfidfVectorizer(stop_words='english')
X_vec = vectorizer.fit_transform(TRAINING_RESUMES)
classifier = LogisticRegression(C=1.0)
classifier.fit(X_vec, TRAINING_LABELS)

def predict_role_ml(resume_text: str) -> str:
    """Predicts the matching role category using TF-IDF + LogisticRegression classification."""
    try:
        resume_vector = vectorizer.transform([resume_text])
        return classifier.predict(resume_vector)[0]
    except Exception:
        return "Backend Engineer"  # fallback

# ----------------- SEMANTIC SIMILARITY MODEL -----------------
def calculate_semantic_similarity(resume_text: str, jd_text: str) -> float:
    """Computes similarity using SentenceTransformers embeddings (or TF-IDF fallback)."""
    model = get_similarity_model()
    if model == "TFIDF" or model is None:
        # Fallback: Cosine similarity via TF-IDF
        try:
            tfidf = TfidfVectorizer(stop_words='english')
            matrices = tfidf.fit_transform([resume_text, jd_text])
            similarity = (matrices * matrices.T).toarray()[0, 1]
            return round(float(similarity) * 100, 1)
        except Exception:
            return 50.0

    try:
        # Embeddings
        resume_emb = model.encode(resume_text, convert_to_tensor=True)
        jd_emb = model.encode(jd_text, convert_to_tensor=True)
        
        from sentence_transformers import util
        similarity = util.cos_sim(resume_emb, jd_emb)
        return round(float(similarity.item()) * 100, 1)
    except Exception as e:
        print("Semantic similarity calculation failed:", e)
        # Cosine fallback
        try:
            tfidf = TfidfVectorizer(stop_words='english')
            matrices = tfidf.fit_transform([resume_text, jd_text])
            similarity = (matrices * matrices.T).toarray()[0, 1]
            return round(float(similarity) * 100, 1)
        except Exception:
            return 50.0

# ----------------- NER ENTITY EXTRACTION (spaCy) -----------------
def extract_ner_entities(text: str) -> dict:
    """Extracts Skills, Education, Companies, and Experience from text using spaCy NER & PhraseMatcher."""
    try:
        doc = nlp(text)
    except Exception:
        doc = None
        
    skills_list = [
        "python", "java", "javascript", "react", "nodejs", "mongodb", "sql", "html", "css", "tailwind",
        "fastapi", "django", "machine learning", "data science", "docker", "aws", "git", "github",
        "excel", "power bi", "tableau", "typescript", "kubernetes", "c++", "pytorch", "tensorflow"
    ]
    
    companies = []
    education = []
    skills = []
    experience_phrases = []

    if doc is not None and hasattr(doc, "ents"):
        edu_keywords = ["university", "college", "school", "institute", "academy", "technology", "engineering", "b.tech", "bca", "mca", "b.com"]
        
        for ent in doc.ents:
            label = ent.label_
            ent_text = ent.text.strip().replace("\n", " ")
            if label == "ORG":
                if any(k in ent_text.lower() for k in edu_keywords):
                    if ent_text not in education and len(ent_text) > 4:
                        education.append(ent_text)
                else:
                    if ent_text not in companies and len(ent_text) > 3:
                        companies.append(ent_text)
            elif label in ["DATE", "TIME"]:
                if ent_text not in experience_phrases:
                    experience_phrases.append(ent_text)

        # Extraction of skills using PhraseMatcher
        try:
            matcher = PhraseMatcher(nlp.vocab, attr="LOWER")
            patterns = [nlp.make_doc(s) for s in skills_list]
            matcher.add("SKILLS", patterns)
            matches = matcher(doc)
            for _, start, end in matches:
                skills.append(doc[start:end].text.lower())
            skills = list(set(skills))
        except Exception:
            pass

    # Fallbacks and cleanup
    if not skills:
        skills = [s for s in skills_list if s.lower() in text.lower()]
        
    if not education:
        found_edu = re.findall(r"(b\.?\s?tech|m\.?\s?tech|bca|mca|mba|b\.?sc|b\.?com|bachelor|master|university|college|institute|school)[^\n,]*", text, re.IGNORECASE)
        education = list(set([edu.strip() for edu in found_edu if len(edu.strip()) > 3]))[:2]
        
    if not companies:
        found_comp = re.findall(r"(?:at|with|joined|engineer at|developer at|intern at)\s+([A-Z][a-zA-Z0-9\s]+)(?:\n|,|\.)", text)
        companies = list(set([c.strip() for c in found_comp if len(c.strip()) > 3]))[:2]

    # Years of experience extraction
    years_match = re.search(r"(\d+)\+?\s+years?", text, re.IGNORECASE)
    years = int(years_match.group(1)) if years_match else 0
    if years == 0:
        for phrase in experience_phrases:
            m = re.search(r"(\d+)\s+years?", phrase, re.IGNORECASE)
            if m:
                years = int(m.group(1))
                break

    return {
        "skills": skills,
        "education": education[:2],
        "companies": companies[:3],
        "experience_years": years,
        "experience_phrases": experience_phrases[:3]
    }

# ----------------- JOB RECOMMENDATION MODEL (Semantic Similarity) -----------------
JOB_DESCRIPTIONS = {
    "Frontend Developer": "Building responsive web user interfaces, styled components, web animations using HTML, CSS, JavaScript, React, Next.js, and TypeScript.",
    "Backend Engineer": "Designing server-side systems, backend microservices, REST APIs, databases like SQL, PostgreSQL, MongoDB, Redis, and containerization using Docker/Kubernetes.",
    "Data Scientist": "Developing predictive machine learning models, neural networks, natural language processing, data analysis with Python, pandas, numpy, scikit-learn, TensorFlow, PyTorch.",
    "Data Analyst": "Analyzing business data, writing SQL queries, building dashboards, reports in Excel, PowerBI, Tableau, data visualization and business intelligence."
}

def recommend_roles_ml(resume_text: str):
    """Recommends roles dynamically by calculating semantic similarity of the resume against job profile descriptions."""
    recommendations = []
    for role, desc in JOB_DESCRIPTIONS.items():
        sim = calculate_semantic_similarity(resume_text, desc)
        
        role_skills = {
            "Frontend Developer": ["React", "JavaScript", "CSS", "HTML", "TypeScript", "Next.js"],
            "Backend Engineer": ["Python", "FastAPI", "SQL", "MongoDB", "Docker", "AWS", "Node.js"],
            "Data Scientist": ["Python", "Machine Learning", "PyTorch", "TensorFlow", "scikit-learn", "pandas"],
            "Data Analyst": ["SQL", "Excel", "Power BI", "Tableau", "pandas", "Python"]
        }[role]
        
        resume_lower = resume_text.lower()
        matched = [s for s in role_skills if s.lower() in resume_lower]
        missing = [s for s in role_skills if s.lower() not in resume_lower]
        
        # Ensure similarity is bounded and realistic
        sim_val = min(max(int(sim), 35), 98)
        
        recommendations.append({
            "job_role": role,
            "match_percentage": sim_val,
            "matched_skills": matched,
            "missing_skills": missing
        })
        
    recommendations.sort(key=lambda x: x["match_percentage"], reverse=True)
    return recommendations
