from fastapi import APIRouter, Depends, HTTPException, status

from app.schemas.transactions import TransactionListResponse, TransferRequest, TransferResponse
from app.services.transaction_service import TransactionService

router = APIRouter()


def get_transaction_service() -> TransactionService:
    return TransactionService()


@router.post("/transfer", response_model=TransferResponse, status_code=status.HTTP_201_CREATED)
async def transfer_money(
    payload: TransferRequest,
    service: TransactionService = Depends(get_transaction_service),
) -> TransferResponse:
    try:
        return service.transfer_money(payload)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@router.get("/{user_id}", response_model=TransactionListResponse)
async def get_transactions(
    user_id: str,
    service: TransactionService = Depends(get_transaction_service),
) -> TransactionListResponse:
    try:
        return service.get_transactions(user_id)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
