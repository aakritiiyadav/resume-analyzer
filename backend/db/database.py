from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load .env variables
load_dotenv()

# MongoDB URI from .env
MONGO_URI = os.getenv("MONGO_URI")

# Create MongoDB client
client = MongoClient(MONGO_URI)

# Select database
db = client["resumedb"]

# Select collection
collection = db["resumes"]