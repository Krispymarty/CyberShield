from pymongo import MongoClient
from app.config import MONGO_URL

if not MONGO_URL:
    raise RuntimeError("MONGO_URL or MONGODB_URL is missing in .env")

client = MongoClient(MONGO_URL)
mongo_db = client["sentinel"]


def get_collection(name: str):
    return mongo_db[name]