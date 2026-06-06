import { z } from "zod";

export const UUIDSchema = z.string().uuid();

export const TimestampSchema = z.string().datetime();

export const HobbyTextSchema = z
  .string()
  .trim()
  .min(2, "Hobby must be at least 2 characters")
  .max(50, "Hobby must be at most 50 characters");

export const GoalTextSchema = z
  .string()
  .trim()
  .min(5, "Goal must be at least 5 characters")
  .max(200, "Goal must be at most 200 characters");

export const MAX_GENERATED_SKILLS = 12;
