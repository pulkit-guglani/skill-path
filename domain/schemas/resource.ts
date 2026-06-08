import { z } from "zod";

export function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function ensureHttpsUrl(url: unknown): unknown {
  if (typeof url !== "string") {
    return url;
  }
  const trimmed = url.trim();
  if (!trimmed) {
    return trimmed;
  }
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export const LinkResourceSchema = z.object({
  title: z.string().trim().min(1, "Resource title is required"),
  url: z.string().url("Resource URL must be valid"),
});

export const GeneratedLinkResourceSchema = z.preprocess((value) => {
  const record = asRecord(value);
  if (!record) {
    return value;
  }
  return {
    ...record,
    title:
      typeof record.title === "string" ? record.title.trim() : record.title,
    url: ensureHttpsUrl(record.url),
  };
}, LinkResourceSchema);

export const ReadingArticleSchema = z.object({
  title: z.string().trim().min(1, "Article title is required"),
  content: z
    .string()
    .trim()
    .min(50, "Article content must be at least 50 characters"),
});

export const GeneratedReadingArticleSchema = z.preprocess((value) => {
  const record = asRecord(value);
  if (!record) {
    return value;
  }

  const title =
    typeof record.title === "string" ? record.title.trim() : "Reading";
  const content =
    (typeof record.content === "string" && record.content.trim()) ||
    (typeof record.body === "string" && record.body.trim()) ||
    (typeof record.text === "string" && record.text.trim()) ||
    (typeof record.url === "string"
      ? `## ${title}\n\nThis reading supports your current skill. Focus on the core ideas and apply them in your next practice session.\n\n## Key ideas\n\n- Break the skill into one small concept.\n- Practice slowly before increasing speed.\n- Review mistakes and adjust your approach.`
      : undefined);

  return {
    title,
    content,
  };
}, ReadingArticleSchema);

export const PracticeTaskSchema = z.object({
  title: z.string().trim().min(1, "Practice title is required"),
  description: z.string().trim().min(1, "Practice description is required"),
});
