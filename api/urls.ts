/**
 * API base URLs — isolated to avoid circular deps with client.
 * Set EXPO_PUBLIC_API_ENV in .env to "local" | "dev" | "staging" | "prod"
 */

export type ApiEnv = "local" | "dev" | "prod" | "staging";

export const DEFAULT_API_BASE_DEV = "https://api-dev.example.com/api";
export const DEFAULT_API_BASE_PROD = "https://api.example.com/api";
export const DEFAULT_API_BASE_STAGING = "https://api-staging.example.com/api";
export const DEFAULT_API_BASE_LOCAL = "http://localhost:8000/api";

export const API_ENV: ApiEnv = (() => {
  const env = process.env.EXPO_PUBLIC_API_ENV?.toLowerCase() || "dev";
  if (env === "local" || env === "dev" || env === "prod" || env === "staging")
    return env;
  return __DEV__ ? "dev" : "prod";
})();

export const API_BASE_URL = (() => {
  switch (API_ENV) {
    case "local":
      return DEFAULT_API_BASE_LOCAL;
    case "dev":
      return DEFAULT_API_BASE_DEV;
    case "staging":
      return DEFAULT_API_BASE_STAGING;
    case "prod":
    default:
      return DEFAULT_API_BASE_PROD;
  }
})();
