# Workflow Documentation

## Development Workflow

This document describes the development, testing, deployment, and operational workflow of the CyberShield (Sentinel AI) platform.

CyberShield is an AI-powered adaptive authentication and fraud detection system that combines identity verification, behavioral biometrics, device intelligence, and risk-based authentication to protect users from account takeover and fraud attacks.

---

## Local Development

### 1. Clone Repository

```bash
git clone https://github.com/Krispymarty/CyberShield.git
cd CyberShield
```

---

### 2. Project Structure

```text
CyberShield/
│
├── backend/
├── web-user/
├── web-admin/
├── mobile-app/
├── database/
│   ├── postgres/
│   └── mongodb/
└── docs/
```

---

### 3. Frontend Development

#### User Portal

Located in:

```text
web-user/
```

Run:

```bash
npm install
npm run dev
```

Features:

* Registration
* Login
* Passwordless Login
* OTP Verification
* Dashboard
* Money Transfer
* Security Center

---

#### Admin Portal

Located in:

```text
web-admin/
```

Run:

```bash
npm install
npm run dev
```

Features:

* Fraud Analytics
* Login Monitoring
* Risk Dashboard
* Alert Center
* User Management

---

### 4. Backend Development

Located in:

```text
backend/
```

Main services:

```text
backend/
│
├── auth/
├── risk/
├── devices/
├── transactions/
├── alerts/
├── admin/
└── database/
```

Core responsibilities:

* Authentication
* Risk Evaluation
* Device Management
* Fraud Detection
* Alert Generation
* Administrative Operations

---

### 5. PostgreSQL Development

Used for structured banking data.

Database:

```text
PostgreSQL
```

Tables:

```text
users
accounts
transactions
beneficiaries
auth_status
login_history
```

Files:

```text
database/postgres/
│
├── schema.sql
├── seed.sql
├── queries.sql
└── diagram.md
```

Responsibilities:

* User Management
* Account Management
* Transaction Records
* Authentication Status
* Login History

---

### 6. MongoDB Development

Used for fraud analytics and behavioral intelligence.

Collections:

```text
device_logs
behavior_logs
risk_logs
alerts
fraud_cases
location_history
```

Responsibilities:

* Device Fingerprinting
* Behavioral Monitoring
* Risk Logging
* Alert Storage
* Fraud Investigation Data

---

### 7. Local Authentication Workflow

```text
User Login
     │
     ▼
Capture Device Data
     │
     ▼
Store Behavioral Logs
     │
     ▼
Risk Evaluation
     │
     ▼
Generate Risk Score
     │
 ┌───┼──────────────┐
 │   │              │
 ▼   ▼              ▼

LOW MEDIUM        HIGH

 │     │            │
 ▼     ▼            ▼

Allow OTP       Block Login
Login Verify    Alert Admin
                Create Fraud Case
```

---

## Testing

### Frontend Testing

Verify:

* Registration
* Login
* Passwordless Authentication
* OTP Verification
* Dashboard Rendering
* Transfer Workflow
* Security Center

---

### Backend Testing

Verify:

#### Authentication APIs

```http
POST /auth/register
POST /auth/login
POST /auth/verify-otp
```

---

#### Risk APIs

```http
POST /risk/evaluate
GET /risk/trust-score/{id}
```

---

#### Device APIs

```http
POST /device/register
GET /device/user/{id}
```

---

#### Transaction APIs

```http
POST /transaction/transfer
GET /dashboard/{id}
```

---

#### Alert APIs

```http
GET /alerts/user/{id}
```

---

#### Admin APIs

```http
GET /admin/dashboard
GET /admin/login-attempts
POST /admin/block-user
POST /admin/unblock-user
```

---

### Database Testing

Verify:

#### PostgreSQL

* User Creation
* Account Creation
* Transaction Recording
* Login History Storage
* Beneficiary Management

Queries:

```sql
SELECT * FROM users;

SELECT * FROM accounts;

SELECT * FROM transactions;

SELECT * FROM login_history;
```

---

#### MongoDB

Verify:

* Device Logs
* Behavior Logs
* Risk Logs
* Alert Creation
* Fraud Case Creation

---

### Risk Engine Testing

Test scenarios:

#### Low Risk

Expected:

```text
Allow Login
```

---

#### Medium Risk

Expected:

```text
Request OTP Verification
```

---

#### High Risk

Expected:

```text
Block Login
Create Alert
Notify Admin
Create Fraud Case
```

---

## Deployment

### Development Environment

```text
Frontend:
- Next.js

Backend:
- FastAPI

Databases:
- PostgreSQL
- MongoDB

Cache:
- Redis
```

---

### Production Workflow

```text
User App / Web Portal
          │
          ▼
Authentication Service
          │
          ▼
Behavior Collection Layer
          │
          ▼
Risk Engine
          │
          ▼
Decision Engine
          │
 ┌────────┼─────────┐
 │        │         │
 ▼        ▼         ▼

Allow   Verify    Block

 │        │         │
 ▼        ▼         ▼

User   Step-Up   Security Alert
```

---

### Deployment Pipeline

```text
Developer
    │
    ▼
Feature Branch
    │
    ▼
Pull Request
    │
    ▼
Code Review
    │
    ▼
Merge to Master
    │
    ▼
Backend Deployment
    │
    ▼
Database Migration
    │
    ▼
Frontend Deployment
    │
    ▼
Production Release
```

---

## Git Workflow

### Create Feature Branch

```bash
git checkout master

git pull origin master

git checkout -b feature/postgres-auth-status
```

---

### Commit Changes

```bash
git add .

git commit -m "Added PostgreSQL authentication status tables"
```

---

### Push Branch

```bash
git push origin feature/postgres-auth-status
```

---

### Create Pull Request

```text
feature/postgres-auth-status
            │
            ▼
Pull Request
            │
            ▼
Review
            │
            ▼
Merge into Master
```

This workflow protects the master branch from accidental issues and ensures all features are reviewed before release.

---

## Current Project Status

### Completed

* User Website
* Admin Website
* PostgreSQL Schema Design
* PostgreSQL Seed Data
* PostgreSQL Testing
* Architecture Design
* Workflow Documentation

### In Progress

* Backend APIs
* MongoDB Collections
* Risk Engine Logic
* Device Intelligence Module
* Fraud Detection Module

### Pending

* Redis Integration
* ML Risk Scoring
* Production Deployment
* End-to-End Integration Testing

---

## Final Objective

CyberShield aims to provide adaptive authentication and fraud prevention using behavioral intelligence, device intelligence, and AI-powered risk scoring while maintaining a seamless user experience for legitimate users.
