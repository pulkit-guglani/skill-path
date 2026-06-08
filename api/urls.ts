/**
 * API base URLs — isolated to avoid circular deps with client.
 *
 * Default: deployed Railway API.
 * Local dev only when EXPO_PUBLIC_API_ENV=local.
 */

import Constants from "expo-constants";
import { Platform } from "react-native";

export type ApiEnv = "local" | "dev" | "prod" | "staging";

export const DEPLOYED_API_BASE_URL =
  "https://skill-path-api-production.up.railway.app/api";

/** Android emulator reaches the host machine via 10.0.2.2, not localhost. */
export const DEFAULT_API_BASE_LOCAL_ANDROID = "http://10.0.2.2:8000/api";
export const DEFAULT_API_BASE_LOCAL_HOST = "http://localhost:8000/api";

const extra = Constants.expoConfig?.extra as
  | { apiEnv?: string; apiBaseUrl?: string }
  | undefined;

function resolveLocalApiBase(): string {
  if (Platform.OS === "android") {
    return DEFAULT_API_BASE_LOCAL_ANDROID;
  }

  return DEFAULT_API_BASE_LOCAL_HOST;
}

function isLocalApiEnv(): boolean {
  const env =
    process.env.EXPO_PUBLIC_API_ENV?.toLowerCase() ??
    extra?.apiEnv?.toLowerCase();
  return env === "local";
}

export const API_ENV: ApiEnv = isLocalApiEnv() ? "local" : "prod";

export const API_BASE_URL = (() => {
  if (isLocalApiEnv()) {
    const override = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();
    return override ?? resolveLocalApiBase();
  }

  return (
    process.env.EXPO_PUBLIC_API_BASE_URL?.trim() ??
    extra?.apiBaseUrl ??
    DEPLOYED_API_BASE_URL
  );
})();
