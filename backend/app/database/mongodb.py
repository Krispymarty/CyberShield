from pymongo import MongoClient

from app.config import MONGO_URL

if not MONGO_URL:
    raise RuntimeError("MONGO_URL or MONGODB_URL is missing")

client = MongoClient(MONGO_URL)
mongo_db = client["sentinel"]


def get_collection(collection_name: str):
    return mongo_db[collection_name]