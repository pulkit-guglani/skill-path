import { goals } from "@/api/endpoints";
import {
  GeneratedRoadmapSchema,
  GoalSchema,
  SkillSchema,
} from "@/domain/schemas";
import type {
  GenerateRoadmapInput,
  GeneratedRoadmap,
  Goal,
  Skill,
  SkillCompletion,
} from "@/domain/types";
import { ApiHandler } from "@/lib/api-handler";
import {
  unwrapAndParse,
  unwrapAndParseNullable,
} from "@/lib/api-envelope";

export const GENERATE_ROADMAP_TIMEOUT_MS = 90_000;

export interface CreateGoalPayload {
  id: string;
  hobby: string;
  goal: string;
  skills: Skill[];
}

export type UpdateCompletionPayload = Partial<SkillCompletion>;

export async function generateRoadmap(
  input: GenerateRoadmapInput
): Promise<GeneratedRoadmap> {
  const handler = new ApiHandler({
    path: goals.generateRoadmap(),
    data: input,
    timeout: GENERATE_ROADMAP_TIMEOUT_MS,
  });
  const response = await handler.post();
  return unwrapAndParse(response, GeneratedRoadmapSchema);
}

export async function createGoal(payload: CreateGoalPayload): Promise<Goal> {
  const handler = new ApiHandler({
    path: goals.create(),
    data: payload,
  });
  const response = await handler.post();
  return unwrapAndParse(response, GoalSchema);
}

export async function getActiveGoal(): Promise<Goal | null> {
  const handler = new ApiHandler({
    path: goals.active(),
  });
  const response = await handler.get();
  return unwrapAndParseNullable(response, GoalSchema);
}

export async function getGoalById(id: string): Promise<Goal> {
  const handler = new ApiHandler({
    path: goals.byId(id),
  });
  const response = await handler.get();
  return unwrapAndParse(response, GoalSchema);
}

export async function confirmGoal(id: string): Promise<Goal> {
  const handler = new ApiHandler({
    path: goals.confirm(id),
  });
  const response = await handler.patch();
  return unwrapAndParse(response, GoalSchema);
}

export async function updateSkills(
  goalId: string,
  skills: Skill[]
): Promise<Goal> {
  const handler = new ApiHandler({
    path: goals.skills(goalId),
    data: { skills },
  });
  const response = await handler.patch();
  return unwrapAndParse(response, GoalSchema);
}

export async function updateCompletion(
  goalId: string,
  skillId: string,
  patch: UpdateCompletionPayload
): Promise<Skill> {
  const handler = new ApiHandler({
    path: goals.completion(goalId, skillId),
    data: patch,
  });
  const response = await handler.patch();
  return unwrapAndParse(response, SkillSchema);
}
