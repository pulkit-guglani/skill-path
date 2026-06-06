import { APP_API } from "@/api/client";
import type { AxiosHeaders } from "axios";

export interface HandlerOptions {
  path?: string;
  params?: object;
  data?: object;
  headers?: AxiosHeaders;
  timeout?: number;
}

export class ApiRequestError extends Error {
  status?: number;
  data?: unknown;

  constructor(
    message: string,
    options?: { status?: number; data?: unknown }
  ) {
    super(message);
    this.name = "ApiRequestError";
    this.status = options?.status;
    this.data = options?.data;
  }
}

function getApiErrorMessage(err: unknown, fallback: string): string {
  const anyErr = err as any;
  const data = anyErr?.response?.data;

  const candidate =
    data?.message ??
    data?.error?.message ??
    data?.error ??
    (typeof data === "string" ? data : undefined) ??
    anyErr?.message;

  if (typeof candidate === "string") {
    const trimmed = candidate.trim();
    if (trimmed) return trimmed;
  }
  if (candidate != null) return String(candidate);

  return fallback;
}

function toApiRequestError(err: unknown): ApiRequestError {
  if (err instanceof ApiRequestError) return err;

  const anyErr = err as any;
  const status = anyErr?.response?.status ?? anyErr?.status;
  const data = anyErr?.response?.data ?? anyErr?.data;

  const message = getApiErrorMessage(
    err,
    typeof anyErr?.message === "string" && anyErr.message.trim()
      ? anyErr.message
      : "Request failed"
  );

  return new ApiRequestError(message, { status, data });
}

export class ApiHandler {
  path: string;
  params?: object;
  data?: object;
  headers?: AxiosHeaders;
  timeout: number;

  constructor(options: HandlerOptions) {
    this.path = options.path ?? "";
    this.params = options.params;
    this.data = options.data;
    this.headers = options.headers;
    this.timeout = options.timeout ?? 30000;
  }

  private async request<T>(requestFn: () => Promise<T>): Promise<T> {
    try {
      return await requestFn();
    } catch (error: unknown) {
      throw toApiRequestError(error);
    }
  }

  async get(options?: { signal?: AbortSignal }) {
    return this.request(async () => {
      const response = await APP_API.get(this.path, {
        headers: this.headers,
        params: this.params,
        paramsSerializer: { indexes: null },
        signal: options?.signal,
        timeout: this.timeout,
      });
      return response;
    });
  }

  async post() {
    return this.request(async () => {
      const response = await APP_API.post(this.path, this.data, {
        headers: this.headers,
        timeout: this.timeout,
      });
      return response;
    });
  }

  async patch() {
    return this.request(async () => {
      const response = await APP_API.patch(this.path, this.data, {
        headers: this.headers,
        timeout: this.timeout,
      });
      return response;
    });
  }

  async put() {
    return this.request(async () => {
      const response = await APP_API.put(this.path, this.data, {
        headers: this.headers,
        timeout: this.timeout,
      });
      return response;
    });
  }

  async delete() {
    return this.request(async () => {
      const response = await APP_API.delete(this.path, {
        headers: this.headers,
        params: this.params,
        paramsSerializer: { indexes: null },
        data: this.data,
        timeout: this.timeout,
      });
      return response;
    });
  }
}
