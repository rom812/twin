from pypdf import PdfReader
import json

def safe_load_json(filepath, default=None):
    """Safely load JSON with fallback"""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        print(f"Warning: Could not load {filepath}: {e}")
        return default or {}

def safe_load_text(filepath, default=""):
    """Safely load text with fallback"""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError as e:
        print(f"Warning: Could not load {filepath}: {e}")
        return default

# Read CV PDF with improved error handling
try:
    reader = PdfReader("./data/ROMCV_2026.pdf")
    linkedin = ""
    for page in reader.pages:
        text = page.extract_text()
        if text:
            linkedin += text
    if not linkedin.strip():
        linkedin = "CV could not be parsed (empty content)"
except FileNotFoundError:
    print("Warning: CV PDF not found at ./data/ROMCV_2026.pdf")
    linkedin = "CV not found - please upload your CV PDF to backend/data/"
except Exception as e:
    print(f"Warning: CV could not be loaded: {str(e)}")
    linkedin = f"CV could not be loaded: {str(e)}"

# Read other data files with error handling
summary = safe_load_text("./data/summary.txt", "Professional summary not available")
style = safe_load_text("./data/style.txt", "Professional and clear communication")
facts = safe_load_json("./data/facts.json", {
    "full_name": "Professional",
    "name": "User"
})