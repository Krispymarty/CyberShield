from fastapi import APIRouter

router = APIRouter()


@router.post("/transfer")
async def transfer_money():

    return {
        "success": True,
        "transaction_id": "TXN001"
    }


@router.get("/{user_id}")
async def get_transactions(user_id: str):

    return {
        "user_id": user_id,
        "transactions": []
    }