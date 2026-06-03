from fastapi import APIRouter

router = APIRouter()


@router.get("/dashboard")
async def admin_dashboard():

    return {
        "total_users": 0,
        "fraud_attempts": 0,
        "blocked_users": 0
    }


@router.get("/users")
async def users():

    return []


@router.post("/block-user")
async def block_user():

    return {
        "success": True
    }


@router.post("/unblock-user")
async def unblock_user():

    return {
        "success": True
    }