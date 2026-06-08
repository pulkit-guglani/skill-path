/**
 * API base URLs — isolated to avoid circular deps with client.
 *
 * Set EXPO_PUBLIC_API_ENV=local when running skill-path-api on your machine.
 * Optional override: EXPO_PUBLIC_API_BASE_URL=http://192.168.x.x:8000/api
 * (use your LAN IP on a physical device).
 */

import { Platform } from "react-native";

export type ApiEnv = "local" | "dev" | "prod" | "staging";

export const DEFAULT_API_BASE_DEV = "https://api-dev.example.com/api";
export const DEFAULT_API_BASE_PROD = "https://api.example.com/api";
export const DEFAULT_API_BASE_STAGING = "https://api-staging.example.com/api";

/** Android emulator reaches the host machine via 10.0.2.2, not localhost. */
export const DEFAULT_API_BASE_LOCAL_ANDROID = "http://10.0.2.2:8000/api";
export const DEFAULT_API_BASE_LOCAL_HOST = "http://localhost:8000/api";

export const API_ENV: ApiEnv = (() => {
  const env = process.env.EXPO_PUBLIC_API_ENV?.toLowerCase() || "local";
  if (env === "local" || env === "dev" || env === "prod" || env === "staging")
    return env;
  return __DEV__ ? "local" : "prod";
})();

function resolveLocalApiBase(): string {
  if (process.env.EXPO_PUBLIC_API_BASE_URL?.trim()) {
    return process.env.EXPO_PUBLIC_API_BASE_URL.trim();
  }

  if (Platform.OS === "android") {
    return DEFAULT_API_BASE_LOCAL_ANDROID;
  }

  return DEFAULT_API_BASE_LOCAL_HOST;
}

export const API_BASE_URL = (() => {
  switch (API_ENV) {
    case "local":
      return resolveLocalApiBase();
    case "dev":
      return DEFAULT_API_BASE_DEV;
    case "staging":
      return DEFAULT_API_BASE_STAGING;
    case "prod":
    default:
      return DEFAULT_API_BASE_PROD;
  }
})();
