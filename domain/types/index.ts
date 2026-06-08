import type { z } from "zod";
import type {
  CreateGoalInputSchema,
  GenerateRoadmapInputSchema,
  GenerateSkillContentInputSchema,
  GeneratedRoadmapSchema,
  GeneratedSkillsOutlineSchema,
  GoalSchema,
  GoalStatusSchema,
  LinkResourceSchema,
  PracticeTaskSchema,
  ReadingArticleSchema,
  SkillCompletionSchema,
  SkillOutlineInputSchema,
  SkillSchema,
  SkillSourceSchema,
  GeneratedSkillOutlineSchema,
  GeneratedSkillSchema,
} from "../schemas";

export type LinkResource = z.infer<typeof LinkResourceSchema>;
export type ReadingArticle = z.infer<typeof ReadingArticleSchema>;
export type PracticeTask = z.infer<typeof PracticeTaskSchema>;
export type SkillSource = z.infer<typeof SkillSourceSchema>;
export type SkillCompletion = z.infer<typeof SkillCompletionSchema>;
export type GeneratedSkillOutline = z.infer<typeof GeneratedSkillOutlineSchema>;
export type GeneratedSkill = z.infer<typeof GeneratedSkillSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type GoalStatus = z.infer<typeof GoalStatusSchema>;
export type Goal = z.infer<typeof GoalSchema>;
export type CreateGoalInput = z.infer<typeof CreateGoalInputSchema>;
export type GeneratedSkillsOutline = z.infer<typeof GeneratedSkillsOutlineSchema>;
export type GeneratedRoadmap = z.infer<typeof GeneratedRoadmapSchema>;
export type GenerateRoadmapInput = z.infer<typeof GenerateRoadmapInputSchema>;
export type SkillOutlineInput = z.infer<typeof SkillOutlineInputSchema>;
export type GenerateSkillContentInput = z.infer<
  typeof GenerateSkillContentInputSchema
>;
