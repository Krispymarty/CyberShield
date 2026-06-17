# Architecture Documentation
# CyberShield (Sentinel AI) Architecture

## Overview

CyberShield (Sentinel AI) is an AI-powered adaptive authentication and fraud detection platform designed to provide secure digital banking and financial transactions.

The system combines:

* Adaptive Authentication
* Behavioral Biometrics
* Device Fingerprinting
* Risk-Based Authentication
* Fraud Detection
* Real-Time Alerts

CyberShield uses both PostgreSQL and MongoDB to separate transactional banking data from behavioral and risk analytics data.

---

# High-Level Architecture

```text
Mobile App / Web Portal / Admin Dashboard
                    │
                    ▼
              FastAPI Backend
                    │
     ┌──────────────┼──────────────┐
     │              │              │
     ▼              ▼              ▼
Authentication   Risk Engine   Transaction Service
     │              │              │
     └──────────────┼──────────────┘
                    │
      ┌─────────────┴─────────────┐
      ▼                           ▼
 PostgreSQL                  MongoDB
(Relational DB)            (NoSQL DB)
```

---

# User Channels

## Mobile Application

Features:

* User Registration
* Login
* Dashboard
* Transactions
* Security Center
* Alerts

## Web Portal

Features:

* Login/Register
* Account Management
* Transactions
* Security Controls
* Profile Management

## Admin Dashboard

Features:

* User Monitoring
* Fraud Analytics
* Alert Management
* Investigation Tools
* User Blocking / Unblocking

---

# Backend Services

## Authentication Service

Responsibilities:

* User Registration
* Login
* OTP Verification
* Passkey Verification
* Authentication Status Management

---

## Device Service

Responsibilities:

* Device Fingerprinting
* Trusted Device Detection
* New Device Detection
* Device History Tracking

---

## Risk Engine Service

Responsibilities:

* Collect Behavioral Signals
* Analyze User Behavior
* Calculate Risk Score
* Determine Authentication Action

Outputs:

* LOW Risk
* MEDIUM Risk
* HIGH Risk

---

## Transaction Service

Responsibilities:

* Process Transactions
* Validate Accounts
* Verify User Authentication
* Perform Risk Checks

---

## Alert Service

Responsibilities:

* Generate Security Alerts
* Notify Users
* Notify Administrators
* Create Fraud Investigation Cases

---

## Admin Service

Responsibilities:

* User Management
* Fraud Case Review
* Audit Logs
* System Monitoring

---

# PostgreSQL Database Design

PostgreSQL stores structured and transactional data.

## Tables

### users

Stores user profile information.

Fields:

* user_id
* full_name
* email
* phone
* password_hash
* dob

---

### accounts

Stores bank account information.

Fields:

* account_id
* user_id
* account_number
* account_type
* balance
* status

---

### transactions

Stores money transfer records.

Fields:

* transaction_id
* account_id
* receiver_account_id
* amount
* transaction_type
* status

---

### beneficiaries

Stores saved beneficiary accounts.

Fields:

* beneficiary_id
* user_id
* beneficiary_name
* beneficiary_account
* bank_name

---

### auth_status

Stores authentication verification status.

Fields:

* otp_verified
* biometric_verified
* passkey_verified

---

### login_history

Stores login records.

Fields:

* ip_address
* device_name
* login_status
* login_time

---

## PostgreSQL Relationships

```text
Users
│
├── Accounts
│
├── Beneficiaries
│
├── Transactions
│
├── Login History
│
└── Auth Status
```

---

# MongoDB Database Design

MongoDB stores dynamic behavioral and security data.

## Collections

### device_logs

Stores:

* Device Fingerprints
* Device IDs
* Device Trust Status

---

### behavior_logs

Stores:

* Typing Speed
* Mouse Movements
* Copy-Paste Events
* User Interaction Patterns

---

### location_history

Stores:

* Current Location
* Previous Locations
* Travel Patterns

---

### risk_logs

Stores:

* Risk Scores
* Risk Factors
* Risk Engine Decisions

---

### alerts

Stores:

* Security Alerts
* Login Warnings
* Transaction Warnings

---

### fraud_cases

Stores:

* Investigation Cases
* Fraud Evidence
* Case Status

---

## MongoDB Relationships

```text
User ID
│
├── Device Logs
├── Behavior Logs
├── Location History
├── Risk Logs
├── Alerts
└── Fraud Cases
```

---

# Risk Engine Workflow

## Step 1 – Data Collection

The system captures:

* Device Information
* IP Address
* SIM Information
* User Location
* Typing Patterns
* Copy-Paste Behavior

---

## Step 2 – Logging

Behavioral data is stored in MongoDB.

Collections Used:

* device_logs
* behavior_logs
* location_history

---

## Step 3 – Feature Processing

Features extracted:

* Device Consistency
* Typing Consistency
* Location Consistency
* Copy-Paste Frequency
* Login Frequency

---

## Step 4 – Risk Scoring

The ML model calculates a score:

```text
0 - 40   → LOW
41 - 70  → MEDIUM
71 - 100 → HIGH
```

---

## Step 5 – Decision Engine

### LOW Risk

Action:

* Allow Login

---

### MEDIUM Risk

Action:

* OTP Verification

---

### HIGH Risk

Action:

* Block Login
* Generate Alert
* Notify Admin
* Create Fraud Case

---

# Data Flow Diagram (DFD)

```text
User Login
     │
     ▼
Capture Data
(Device + Location + IP +
Typing + CopyPaste + SIM)
     │
     ▼
MongoDB Logging
     │
     ▼
Risk Engine
     │
     ▼
Risk Score Generated
     │
 ┌───┼───────────────┐
 │   │               │
 ▼   ▼               ▼

LOW MEDIUM         HIGH

 │     │             │
 │     │             │
 ▼     ▼             ▼

Allow OTP      Block Login
Login Verify   Create Alert
               Notify Admin
               Create Fraud Case
```

---

# Technology Stack

## Frontend

* Next.js
* React
* TypeScript

## Backend

* FastAPI
* Python

## Databases

* PostgreSQL
* MongoDB

## Cache

* Redis

## Authentication

* OTP
* Passkeys
* Device Verification

## AI/ML

* Risk Scoring Model
* Behavioral Analysis
* Fraud Detection

---

# Future Enhancements

* Continuous Authentication
* Face Recognition
* Voice Biometrics
* Federated Learning
* Explainable AI Risk Decisions
* Cross-Bank Fraud Intelligence Sharing
* Real-Time Threat Intelligence Integration

---

# Authors

CyberShield Development Team

UPES Hackathon Project

AI-Powered Adaptive Authentication & Fraud Detection Platform
