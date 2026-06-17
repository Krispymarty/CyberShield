// Get all alerts for a user
db.alerts.find({ user_id: "USR001" });

// Get high-risk users
db.risk_logs.find({
  risk_score: { $gte: 80 }
});

// Get fraud cases
db.fraud_cases.find({
  status: "OPEN"
});

// Recent device activity
db.device_logs.find({
  user_id: "USR001"
}).sort({ created_at: -1 });