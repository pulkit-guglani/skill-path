# Skill Path

Mobile app for learning a hobby step by step. You pick a goal, review an AI-generated skill list, then work through video, reading, and practice lessons for each skill.

Built with Expo (SDK 54), Expo Router, NativeWind, and React Query. Talks to the NestJS API in `skill-path-api`.

## Setup

```bash
npm install
cp .env.example .env
```

Edit `.env` if you need to point at a different API. By default it uses the deployed Railway backend.

## Run locally

```bash
npm start
```

Android (dev build):

```bash
npm run android
```

iOS:

```bash
npm run ios
```

For local API development, set `EXPO_PUBLIC_API_ENV=local` in `.env` and run `skill-path-api` on your machine. Android emulator hits the host at `10.0.2.2:8000`.

## Release APK

Regenerate native project if needed:

```bash
npx expo prebuild --platform android
```

Build from `android/`:

```bash
cd android
./gradlew assembleRelease -PreactNativeArchitectures=arm64-v8a
```

APK: `android/app/build/outputs/apk/release/app-release.apk`

Env vars are baked in at build time — set `.env` before building.

## Tests

```bash
npm test
```
