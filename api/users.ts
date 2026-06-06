import { user } from "@/api/endpoints";
import { ApiHandler } from "@/lib/api-handler";
import type { ApiEnvelope, UserData } from "@/types";

export async function getUserProfile(): Promise<UserData | null> {
  const handler = new ApiHandler({
    path: user.get.profile(),
  });
  try {
    const response = await handler.get();
    const payload = response.data as ApiEnvelope<UserData>;
    return payload?.data ?? null;
  } catch {
    return null;
  }
}
