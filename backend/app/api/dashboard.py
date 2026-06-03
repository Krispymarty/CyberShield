from fastapi import APIRouter

router = APIRouter()


@router.get("/{user_id}")
async def get_dashboard(user_id: str):

    return {
        "user_id": user_id,
        "balance": 50000,
        "trust_score": 95,
        "risk_level": "LOW"
    }