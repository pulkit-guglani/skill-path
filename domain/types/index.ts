import type { z } from "zod";
import type {
  CreateGoalInputSchema,
  GenerateRoadmapInputSchema,
  GeneratedRoadmapSchema,
  GoalSchema,
  GoalStatusSchema,
  LinkResourceSchema,
  PracticeTaskSchema,
  SkillCompletionSchema,
  SkillSchema,
  SkillSourceSchema,
  GeneratedSkillSchema,
} from "../schemas";

export type LinkResource = z.infer<typeof LinkResourceSchema>;
export type PracticeTask = z.infer<typeof PracticeTaskSchema>;
export type SkillSource = z.infer<typeof SkillSourceSchema>;
export type SkillCompletion = z.infer<typeof SkillCompletionSchema>;
export type GeneratedSkill = z.infer<typeof GeneratedSkillSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type GoalStatus = z.infer<typeof GoalStatusSchema>;
export type Goal = z.infer<typeof GoalSchema>;
export type CreateGoalInput = z.infer<typeof CreateGoalInputSchema>;
export type GeneratedRoadmap = z.infer<typeof GeneratedRoadmapSchema>;
export type GenerateRoadmapInput = z.infer<typeof GenerateRoadmapInputSchema>;
