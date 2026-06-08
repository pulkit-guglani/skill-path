import { API_BASE_URL, API_ENV } from "@/api/urls";

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
      return "Lesson generation is taking longer than expected. Please try again — large paths can take a few minutes.";
    }

    if (message === "Network Error") {
      if (API_ENV === "local") {
        return `Cannot reach the API at ${API_BASE_URL}. Ensure skill-path-api is running locally (npm run start:dev).`;
      }

      return `Cannot reach the API at ${API_BASE_URL}. Check your internet connection and try again.`;
    }

    return message;
  }

  return fallback;
}
