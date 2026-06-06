import { z } from "zod";
import { MAX_GENERATED_SKILLS } from "./common";
import { GeneratedSkillSchema } from "./skill";

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
