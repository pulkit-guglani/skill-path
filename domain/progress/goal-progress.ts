import type { Goal } from "../types";
import { getSkillProgressPercent, isSkillComplete } from "./skill-progress";

export function getGoalProgressPercent(goal: Goal): number {
  if (goal.skills.length === 0) return 0;

  const total = goal.skills.reduce(
    (sum, skill) => sum + getSkillProgressPercent(skill),
    0
  );

  return Math.round(total / goal.skills.length);
}

export function getCompletedSkillCount(goal: Goal): number {
  return goal.skills.filter(isSkillComplete).length;
}

export function isGoalComplete(goal: Goal): boolean {
  return goal.skills.length > 0 && goal.skills.every(isSkillComplete);
}
