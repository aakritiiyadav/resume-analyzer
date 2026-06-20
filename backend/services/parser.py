import pdfplumber
from docx import Document
import re

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

def parse_resume(file_path: str, filename: str) -> str:
    if filename.lower().endswith(".pdf"):
        return extract_text_from_pdf(file_path)
    elif filename.lower().endswith(".docx"):
        return extract_text_from_docx(file_path)
    raise ValueError("Unsupported file type. Use PDF or DOCX.")

def extract_email(text: str) -> str:
    match = re.search(r"[\w.\-]+@[\w.\-]+\.\w+", text)
    return match.group() if match else ""

def extract_phone(text: str) -> str:
    match = re.search(r"(\+91[\-\s]?)?[6-9]\d{9}", text)
    return match.group() if match else ""

def extract_experience_years(text: str) -> int:
    match = re.search(r"(\d+)\+?\s+years?", text, re.IGNORECASE)
    return int(match.group(1)) if match else 0