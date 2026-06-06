import { z } from "zod";
import {
  GoalTextSchema,
  HobbyTextSchema,
  TimestampSchema,
  UUIDSchema,
} from "./common";
import { SkillSchema } from "./skill";

export const GoalStatusSchema = z.enum(["draft", "confirmed", "completed"]);

export const GoalSchema = z.object({
  id: UUIDSchema,
  hobby: HobbyTextSchema,
  goal: GoalTextSchema,
  status: GoalStatusSchema,
  skills: z.array(SkillSchema),
  createdAt: TimestampSchema,
  updatedAt: TimestampSchema,
});

export const CreateGoalInputSchema = z.object({
  hobby: HobbyTextSchema,
  goal: GoalTextSchema,
});
