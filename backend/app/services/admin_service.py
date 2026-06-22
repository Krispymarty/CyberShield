from datetime import datetime, timezone
from sqlalchemy.orm import Session

from app.models.alert import Alert
from app.models.risk_log import RiskLog
from app.models.fraud_case import FraudCase

from app.schemas.admin import (
    AdminDashboardResponse,
    AdminUserItem,
    AdminUsersResponse,
    UserStatusRequest,
    UserStatusResponse,
)


class AdminService:
    def __init__(self, db: Session):
        self.db = db

    def get_dashboard(self) -> AdminDashboardResponse:
        return AdminDashboardResponse(
            total_users=1000,

            fraud_attempts=
            self.db.query(Alert).count(),

            blocked_users=20,

            active_investigations=
            self.db.query(FraudCase)
            .filter(FraudCase.status == "OPEN")
            .count(),

            high_risk_logins_today=
            self.db.query(RiskLog)
            .filter(
                RiskLog.risk_level.in_(["HIGH", "CRITICAL"])
            )
            .count(),

            sim_swap_alerts_today=
            self.db.query(Alert)
            .filter(Alert.alert_type == "SIM_SWAP")
            .count(),
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
                    last_login_at=datetime(
                        2026,
                        6,
                        8,
                        8,
                        55,
                        tzinfo=timezone.utc,
                    ),
                ),
                AdminUserItem(
                    user_id="USR404",
                    full_name="Nisha Rao",
                    email="nisha@example.com",
                    status="UNDER_REVIEW",
                    trust_score=48,
                    risk_level="HIGH",
                    last_login_at=datetime(
                        2026,
                        6,
                        8,
                        3,
                        15,
                        tzinfo=timezone.utc,
                    ),
                ),
            ]
        )

    def block_user(
        self,
        payload: UserStatusRequest,
    ) -> UserStatusResponse:

        return UserStatusResponse(
            success=True,
            message=f"User blocked. Reason: {payload.reason}",
            user_id=payload.user_id,
            status="BLOCKED",
        )

    def unblock_user(
        self,
        payload: UserStatusRequest,
    ) -> UserStatusResponse:

        return UserStatusResponse(
            success=True,
            message=f"User unblocked. Reason: {payload.reason}",
            user_id=payload.user_id,
            status="ACTIVE",
        )