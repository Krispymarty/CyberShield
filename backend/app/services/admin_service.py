from datetime import datetime, timezone

from app.schemas.admin import (
    AdminDashboardResponse,
    AdminUserItem,
    AdminUsersResponse,
    UserStatusRequest,
    UserStatusResponse,
)
from app.database.mongodb import get_collection

class AdminService:
    def get_dashboard(self) -> AdminDashboardResponse:
        alerts = get_collection("alerts")
        fraud_cases = get_collection("fraud_cases")
        risk_logs = get_collection("risk_logs")

        return AdminDashboardResponse(
            total_users=1000,
            fraud_attempts=alerts.count_documents({}),
            blocked_users=20,
            active_investigations=fraud_cases.count_documents({
                "status": "OPEN"
            }),
            high_risk_logins_today=risk_logs.count_documents({
                "risk_level": {
                    "$in": ["HIGH", "CRITICAL"]
                }
            }),
            sim_swap_alerts_today=alerts.count_documents({
                "alert_type": "SIM_SWAP"
            }),
        )

    def get_users(self) -> AdminUsersResponse:
        return AdminUsersResponse(
            users=[
                AdminUserItem(
                    user_id="USR001",
                    full_name="Aarav Sharma",
                    email="aarav@example.com",
                    status="ACTIVE",
                    trust_score=92,
                    risk_level="LOW",
                    last_login_at=datetime(2026, 6, 8, 8, 55, tzinfo=timezone.utc),
                ),
                AdminUserItem(
                    user_id="USR404",
                    full_name="Nisha Rao",
                    email="nisha@example.com",
                    status="UNDER_REVIEW",
                    trust_score=48,
                    risk_level="HIGH",
                    last_login_at=datetime(2026, 6, 8, 3, 15, tzinfo=timezone.utc),
                ),
            ],
        )

    def block_user(self, payload: UserStatusRequest) -> UserStatusResponse:
        return UserStatusResponse(
            success=True,
            message=f"User blocked. Reason: {payload.reason}",
            user_id=payload.user_id,
            status="BLOCKED",
        )

    def unblock_user(self, payload: UserStatusRequest) -> UserStatusResponse:
        return UserStatusResponse(
            success=True,
            message=f"User unblocked. Reason: {payload.reason}",
            user_id=payload.user_id,
            status="ACTIVE",
        )
