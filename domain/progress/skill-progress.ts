import type { Skill, SkillCompletion } from "../types";

const COMPLETION_FIELDS: (keyof SkillCompletion)[] = [
  "videoCompleted",
  "readingCompleted",
  "practiceCompleted",
];

export function countCompletedResources(completion: SkillCompletion): number {
  return COMPLETION_FIELDS.filter((field) => completion[field]).length;
}

export function isSkillComplete(skill: Skill): boolean {
  return countCompletedResources(skill.completion) === COMPLETION_FIELDS.length;
}

export function getSkillProgressPercent(skill: Skill): number {
  const completed = countCompletedResources(skill.completion);
  return Math.round((completed / COMPLETION_FIELDS.length) * 100);
}
