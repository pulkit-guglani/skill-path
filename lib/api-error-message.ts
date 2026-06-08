function isTimeoutError(error: unknown, message: string): boolean {
  const code = (error as { code?: string })?.code;
  return (
    code === "ECONNABORTED" ||
    message.includes("timeout") ||
    message.includes("timed out")
  );
}

export function getFriendlyApiErrorMessage(
  error: unknown,
  fallback: string
): string {
  if (error instanceof Error && error.message.trim()) {
    const message = error.message.trim();

    if (isTimeoutError(error, message)) {
      return "Lesson generation is taking longer than expected. Keep the API running and try again — large paths can take a few minutes.";
    }

    if (message === "Network Error") {
      return "Cannot reach the API. Ensure skill-path-api is running (npm run start:dev) and EXPO_PUBLIC_API_ENV=local. Android emulator uses 10.0.2.2; physical devices need EXPO_PUBLIC_API_BASE_URL set to your Mac's LAN IP.";
    }

    return message;
  }

  return fallback;
}
