# Sentinel AI — Mobile App

React Native mobile application built with **Expo SDK 56** for the CyberShield / Sentinel AI cybersecurity platform.

## Tech Stack

- **Framework**: React Native 0.85.3 + Expo SDK 56
- **Routing**: expo-router (file-based routing)
- **Styling**: NativeWind (TailwindCSS for React Native)
- **Auth**: SecureStore, Biometric Authentication, Passkeys
- **State**: React Context API
- **Language**: TypeScript

## Project Structure

```
mobile-app/
├── src/
│   ├── app/              # Expo Router pages
│   │   ├── (auth)/       # Login & Register screens
│   │   ├── (tabs)/       # Main app tab screens
│   │   ├── _layout.tsx   # Root layout
│   │   ├── index.tsx     # Entry redirect
│   │   └── splash.tsx    # Splash screen
│   ├── components/       # Reusable UI components
│   ├── constants/        # Theme & configuration
│   ├── context/          # React contexts (Auth)
│   ├── hooks/            # Custom React hooks
│   ├── services/         # Auth, security, biometric services
│   └── global.css        # NativeWind global styles
├── assets/               # App icons, images, splash screens
├── android/              # Generated Android native project
├── server/               # Development companion API server
├── app.json              # Expo configuration
├── eas.json              # EAS Build configuration
├── package.json          # Dependencies
├── babel.config.js       # Babel configuration
├── metro.config.js       # Metro bundler configuration
├── tailwind.config.js    # NativeWind / Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

## Features

- **Security Dashboard**: Real-time security score with animated ring visualization
- **Threat Alerts**: Categorized security alerts and notifications
- **Risk Assessment**: Risk analysis and monitoring
- **Digital Wallets**: Secure wallet management
- **Security Settings**: Comprehensive security configuration
- **Biometric Auth**: Fingerprint and face authentication
- **Passkey Support**: WebAuthn-based passwordless authentication
- **OTP Verification**: One-time password authentication

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI (`npx expo`)
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

```bash
cd mobile-app
npm install
```

### Development

```bash
# Start Expo development server
npx expo start

# Run on Android
npx expo run:android

# Run on iOS (macOS only)
npx expo run:ios

# Run on Web
npx expo start --web
```

### Development Server (Auth API)

The `server/` directory contains a companion Express.js API for authentication during development:

```bash
cd server
npm install
npm run dev
```

### Building

```bash
# Development build
eas build --profile development --platform android

# Production build
eas build --profile production --platform android
```

## Configuration

- **Expo**: `app.json` — App name, icons, splash screen, plugins
- **EAS**: `eas.json` — Build profiles (development, preview, production)
- **TypeScript**: `tsconfig.json` — Strict mode with path aliases (`@/` → `./src/`)
- **Tailwind**: `tailwind.config.js` — Custom Sentinel color palette
