import { z } from "zod";
import { UUIDSchema } from "./common";
import {
  GeneratedLinkResourceSchema,
  GeneratedReadingArticleSchema,
  LinkResourceSchema,
  PracticeTaskSchema,
  ReadingArticleSchema,
} from "./resource";

export const SkillSourceSchema = z.enum(["ai", "custom"]);

export const SkillCompletionSchema = z.object({
  videoCompleted: z.boolean(),
  readingCompleted: z.boolean(),
  practiceCompleted: z.boolean(),
});

export const SkillSchema = z.object({
  id: UUIDSchema,
  title: z.string().trim().min(1, "Skill title is required"),
  order: z.number().int().min(0),
  source: SkillSourceSchema,
  whyItMatters: z.string().trim().min(1, "Why it matters is required"),
  videoResource: LinkResourceSchema,
  readingResource: ReadingArticleSchema,
  practiceTask: PracticeTaskSchema,
  completion: SkillCompletionSchema,
});

export const GeneratedSkillOutlineSchema = z.object({
  title: z.string().trim().min(1),
  whyItMatters: z.string().trim().min(1),
});

export const GeneratedSkillSchema = z.object({
  title: z.string().trim().min(1),
  whyItMatters: z.string().trim().min(1),
  videoResource: GeneratedLinkResourceSchema,
  readingResource: GeneratedReadingArticleSchema,
  practiceTask: PracticeTaskSchema,
});
