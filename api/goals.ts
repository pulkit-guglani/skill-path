import type { AxiosResponse } from "axios";
import { goals } from "@/api/endpoints";
import {
  GeneratedRoadmapSchema,
  GeneratedSkillsOutlineSchema,
  GoalSchema,
  SkillSchema,
} from "@/domain/schemas";
import type {
  GenerateRoadmapInput,
  GenerateSkillContentInput,
  GeneratedRoadmap,
  GeneratedSkillsOutline,
  Goal,
  Skill,
  SkillCompletion,
} from "@/domain/types";
import { ApiHandler } from "@/lib/api-handler";
import {
  parseApiData,
  unwrapApiEnvelope,
  unwrapAndParse,
  unwrapApiEnvelopeNullable,
} from "@/lib/api-envelope";
import { normalizeGoalFromApi } from "@/lib/normalize-api-goal";

/** Gemini full-lesson generation often exceeds 90s for multi-skill paths. */
export const GENERATE_SKILL_CONTENT_TIMEOUT_MS = 240_000;

export interface CreateGoalPayload {
  id: string;
  hobby: string;
  goal: string;
  skills: Skill[];
}

export type UpdateCompletionPayload = Partial<SkillCompletion>;

export const GENERATE_SKILLS_TIMEOUT_MS = 60_000;

export async function generateSkills(
  input: GenerateRoadmapInput
): Promise<GeneratedSkillsOutline> {
  const handler = new ApiHandler({
    path: goals.generateSkills(),
    data: input,
    timeout: GENERATE_SKILLS_TIMEOUT_MS,
  });
  const response = await handler.post();
  return unwrapAndParse(response, GeneratedSkillsOutlineSchema);
}

export async function generateSkillContent(
  input: GenerateSkillContentInput
): Promise<GeneratedRoadmap> {
  const handler = new ApiHandler({
    path: goals.generateSkillContent(),
    data: input,
    timeout: GENERATE_SKILL_CONTENT_TIMEOUT_MS,
  });
  const response = await handler.post();
  return parseApiData(
    unwrapApiEnvelope<unknown>(response),
    GeneratedRoadmapSchema
  ) as GeneratedRoadmap;
}

export interface DeleteAllGoalsResult {
  deletedGoals: number;
}

export async function deleteAllGoals(): Promise<DeleteAllGoalsResult> {
  const handler = new ApiHandler({
    path: goals.deleteAll(),
  });
  const response = await handler.delete();
  return unwrapApiEnvelope<DeleteAllGoalsResult>(response);
}

export async function createGoal(payload: CreateGoalPayload): Promise<Goal> {
  const handler = new ApiHandler({
    path: goals.create(),
    data: payload,
  });
  const response = await handler.post();
  return parseGoalResponse(response);
}

export async function getActiveGoal(): Promise<Goal | null> {
  const handler = new ApiHandler({
    path: goals.active(),
  });
  const response = await handler.get();
  const data = unwrapApiEnvelopeNullable<unknown>(response);
  if (data === null) {
    return null;
  }
  return parseApiData(normalizeGoalFromApi(data), GoalSchema);
}

export async function getGoalById(id: string): Promise<Goal> {
  const handler = new ApiHandler({
    path: goals.byId(id),
  });
  const response = await handler.get();
  return parseGoalResponse(response);
}

export async function confirmGoal(id: string): Promise<Goal> {
  const handler = new ApiHandler({
    path: goals.confirm(id),
  });
  const response = await handler.patch();
  return parseGoalResponse(response);
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
  return parseGoalResponse(response);
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
  return parseApiData(
    normalizeGoalFromApi(unwrapApiEnvelope<unknown>(response)),
    SkillSchema
  );
}

function parseGoalResponse(response: AxiosResponse<unknown>): Goal {
  return parseApiData(
    normalizeGoalFromApi(unwrapApiEnvelope<unknown>(response)),
    GoalSchema
  );
}
