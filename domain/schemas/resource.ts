import { z } from "zod";

export const LinkResourceSchema = z.object({
  title: z.string().trim().min(1, "Resource title is required"),
  url: z.string().url("Resource URL must be valid"),
});

export const PracticeTaskSchema = z.object({
  title: z.string().trim().min(1, "Practice title is required"),
  description: z.string().trim().min(1, "Practice description is required"),
});
