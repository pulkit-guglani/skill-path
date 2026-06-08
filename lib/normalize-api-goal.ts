import { asRecord } from "@/domain/schemas/resource";

function ensureHttpsUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }
  return `https://${url}`;
}

function normalizeReadingResource(value: unknown): unknown {
  const record = asRecord(value);
  if (!record) {
    return value;
  }

  if (typeof record.content === "string") {
    return {
      title: typeof record.title === "string" ? record.title : "Reading",
      content: record.content,
    };
  }

  if (typeof record.url === "string") {
    const title =
      typeof record.title === "string" ? record.title.trim() : "Reading";
    return {
      title,
      content: `## ${title}\n\nLegacy reading link: ${record.url}\n\nDelete and recreate your path to generate in-app article content.`,
    };
  }

  return value;
}

function normalizeVideoResource(value: unknown): unknown {
  const record = asRecord(value);
  if (!record || typeof record.url !== "string") {
    return value;
  }

  return {
    ...record,
    url: ensureHttpsUrl(record.url.trim()),
  };
}

function normalizeSkill(value: unknown): unknown {
  const record = asRecord(value);
  if (!record) {
    return value;
  }

  return {
    ...record,
    videoResource: normalizeVideoResource(record.videoResource),
    readingResource: normalizeReadingResource(record.readingResource),
  };
}

export function normalizeGoalFromApi(data: unknown): unknown {
  const record = asRecord(data);
  if (!record || !Array.isArray(record.skills)) {
    return data;
  }

  return {
    ...record,
    skills: record.skills.map(normalizeSkill),
  };
}
