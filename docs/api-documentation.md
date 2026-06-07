# CyberShield API Documentation

## Base URL

```http
/api
```

---

# 1. Authentication APIs

## Register User

**Endpoint**

```http
POST /auth/register
```

### Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+971501234567",
  "password": "SecurePassword123",
  "dob": "2000-01-01"
}
```

### Response

```json
{
  "success": true,
  "userId": 101
}
```

---

## Login User

**Endpoint**

```http
POST /auth/login
```

### Request

```json
{
  "emailOrPhone": "john@example.com"
}
```

### Response

```json
{
  "success": true,
  "otpSent": true,
  "userId": 101
}
```

---

## Verify OTP

**Endpoint**

```http
POST /auth/verify-otp
```

### Request

```json
{
  "userId": 101,
  "otp": "123456"
}
```

### Response

```json
{
  "success": true,
  "token": "jwt-token"
}
```

---

# 2. Risk Engine APIs

## Evaluate Risk

**Endpoint**

```http
POST /risk/evaluate
```

### Request

```json
{
  "userId": 101,
  "deviceId": "DEV001",
  "ipAddress": "192.168.1.1",
  "location": "Dubai, UAE",
  "copyPasteUsed": true,
  "typingSpeed": 35,
  "vpnDetected": true,
  "newDevice": true,
  "simChanged": false
}
```

### Response

```json
{
  "riskScore": 82,
  "riskLevel": "HIGH",
  "decision": "BLOCK",
  "reasons": [
    "New Device",
    "VPN Detected",
    "Location Mismatch"
  ]
}
```

---

## Get Trust Score

**Endpoint**

```http
GET /risk/trust-score/:userId
```

### Response

```json
{
  "trustScore": 76,
  "riskLevel": "MEDIUM"
}
```

---

# 3. Device Intelligence APIs

## Register Device

**Endpoint**

```http
POST /device/register
```

### Request

```json
{
  "userId": 101,
  "deviceId": "DEV001",
  "os": "Android",
  "deviceModel": "Samsung S24",
  "browser": "Chrome"
}
```

### Response

```json
{
  "success": true,
  "trusted": true
}
```

---

## Get User Devices

**Endpoint**

```http
GET /device/user/:userId
```

### Response

```json
{
  "devices": [
    {
      "deviceId": "DEV001",
      "trusted": true,
      "os": "Android",
      "lastUsed": "2026-06-01T10:30:00Z"
    }
  ]
}
```

---

# 4. Banking APIs

## User Dashboard

**Endpoint**

```http
GET /dashboard/:userId
```

### Response

```json
{
  "balance": 5000.00,
  "trustScore": 76,
  "recentTransactions": [
    {
      "transactionId": "TXN001",
      "amount": 250,
      "status": "SUCCESS"
    }
  ]
}
```

---

## Transfer Money

**Endpoint**

```http
POST /transaction/transfer
```

### Request

```json
{
  "fromAccount": "1234567890",
  "toAccount": "9876543210",
  "amount": 500
}
```

### Response

```json
{
  "success": true,
  "transactionId": "TXN001",
  "status": "SUCCESS"
}
```

---

## Get Transaction History

**Endpoint**

```http
GET /transactions/:userId
```

### Response

```json
{
  "transactions": [
    {
      "transactionId": "TXN001",
      "amount": 500,
      "status": "SUCCESS"
    }
  ]
}
```

---

# 5. Alert APIs

## Get User Alerts

**Endpoint**

```http
GET /alerts/user/:userId
```

### Response

```json
{
  "alerts": [
    {
      "alertType": "Suspicious Login",
      "alertLevel": "HIGH",
      "timestamp": "2026-06-01T10:30:00Z"
    }
  ]
}
```

---

## Create Alert

**Endpoint**

```http
POST /alerts/create
```

### Request

```json
{
  "userId": 101,
  "alertType": "VPN Usage",
  "alertLevel": "MEDIUM"
}
```

### Response

```json
{
  "success": true,
  "alertId": "ALT001"
}
```

---

# 6. Admin APIs

## Admin Dashboard

**Endpoint**

```http
GET /admin/dashboard
```

### Response

```json
{
  "totalUsers": 1200,
  "fraudAttempts": 43,
  "activeInvestigations": 12
}
```

---

## Login Attempts

**Endpoint**

```http
GET /admin/login-attempts
```

### Response

```json
{
  "attempts": [
    {
      "userId": 101,
      "riskScore": 82,
      "status": "BLOCKED"
    }
  ]
}
```

---

## Fraud Cases

**Endpoint**

```http
GET /admin/fraud-cases
```

### Response

```json
{
  "cases": [
    {
      "caseId": "FC001",
      "status": "OPEN"
    }
  ]
}
```

---

## Block User

**Endpoint**

```http
POST /admin/block-user
```

### Request

```json
{
  "userId": 101
}
```

### Response

```json
{
  "success": true,
  "status": "BLOCKED"
}
```

---

## Unblock User

**Endpoint**

```http
POST /admin/unblock-user
```

### Request

```json
{
  "userId": 101
}
```

### Response

```json
{
  "success": true,
  "status": "ACTIVE"
}
```
