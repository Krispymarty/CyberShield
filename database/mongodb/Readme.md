# MongoDB Design

MongoDB stores semi-structured and high-volume security data.

Collections:
- device_logs
- behavior_logs
- location_history
- risk_logs
- alerts
- fraud_cases

PostgreSQL handles transactional banking data.
MongoDB handles fraud detection, risk analysis, user behavior tracking, and security monitoring.

All collections reference PostgreSQL users through `user_id`.