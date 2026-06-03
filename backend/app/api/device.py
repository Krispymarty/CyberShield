from fastapi import APIRouter

router = APIRouter()


@router.post("/register")
async def register_device():

    return {
        "success": True
    }


@router.get("/{user_id}")
async def get_devices(user_id: str):

    return {
        "user_id": user_id,
        "devices": []
    }