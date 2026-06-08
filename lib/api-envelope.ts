import type { AxiosResponse } from "axios";
import type { z } from "zod";
import type { ApiEnvelope } from "@/types";
import { ApiRequestError } from "@/lib/api-handler";

export function unwrapApiEnvelope<T>(response: AxiosResponse<unknown>): T {
  const payload = response.data as ApiEnvelope<T>;

  if (payload?.success !== true || payload.data === undefined) {
    throw new ApiRequestError("Invalid API response envelope", {
      data: response.data,
    });
  }

  return payload.data;
}

export function unwrapApiEnvelopeNullable<T>(
  response: AxiosResponse<unknown>
): T | null {
  const payload = response.data as ApiEnvelope<T | null>;

  if (payload?.success !== true) {
    throw new ApiRequestError("Invalid API response envelope", {
      data: response.data,
    });
  }

  return payload.data ?? null;
}

function formatZodIssues(error: z.ZodError): string {
  const details = error.issues
    .map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join(".") : "response";
      return `${path}: ${issue.message}`;
    })
    .join("; ");

  return details
    ? `API response failed validation (${details})`
    : "API response failed validation";
}

export function parseApiData<T>(data: unknown, schema: z.ZodType<T>): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new ApiRequestError(formatZodIssues(result.error), {
      data: result.error.flatten(),
    });
  }

  return result.data;
}

export function unwrapAndParse<T>(
  response: AxiosResponse<unknown>,
  schema: z.ZodType<T>
): T {
  return parseApiData(unwrapApiEnvelope<unknown>(response), schema);
}

export function unwrapAndParseNullable<T>(
  response: AxiosResponse<unknown>,
  schema: z.ZodType<T>
): T | null {
  const data = unwrapApiEnvelopeNullable<unknown>(response);
  if (data === null) {
    return null;
  }
  return parseApiData(data, schema);
}
