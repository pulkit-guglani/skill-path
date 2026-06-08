import { z } from "zod";
import { MAX_GENERATED_SKILLS } from "./common";
import {
  GeneratedSkillOutlineSchema,
  GeneratedSkillSchema,
} from "./skill";

export const GeneratedSkillsOutlineSchema = z.object({
  skills: z
    .array(GeneratedSkillOutlineSchema)
    .min(1, "Skills outline must include at least one skill")
    .max(
      MAX_GENERATED_SKILLS,
      `Skills outline must include at most ${MAX_GENERATED_SKILLS} skills`
    ),
});

export const GeneratedRoadmapSchema = z.object({
  skills: z
    .array(GeneratedSkillSchema)
    .min(1, "Roadmap must include at least one skill")
    .max(
      MAX_GENERATED_SKILLS,
      `Roadmap must include at most ${MAX_GENERATED_SKILLS} skills`
    ),
});

export const GenerateRoadmapInputSchema = z.object({
  hobby: z.string().trim().min(2).max(50),
  goal: z.string().trim().min(5).max(200),
});

export const SkillOutlineInputSchema = z.object({
  title: z.string().trim().min(1),
  whyItMatters: z.string().trim().min(1),
});

export const GenerateSkillContentInputSchema = z.object({
  hobby: z.string().trim().min(2).max(50),
  goal: z.string().trim().min(5).max(200),
  skills: z
    .array(SkillOutlineInputSchema)
    .min(1)
    .max(MAX_GENERATED_SKILLS),
});
