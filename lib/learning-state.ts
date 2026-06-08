import type { Goal, Skill } from "@/domain/types";
import { isSkillComplete } from "@/domain/progress";

export type SkillPathStatus = "completed" | "active" | "locked";

export function getActiveSkillIndex(goal: Goal): number {
  const index = goal.skills.findIndex((skill) => !isSkillComplete(skill));
  return index === -1 ? Math.max(goal.skills.length - 1, 0) : index;
}

export function getActiveSkill(goal: Goal): Skill | null {
  const index = getActiveSkillIndex(goal);
  return goal.skills[index] ?? null;
}

export function getSkillPathStatus(
  goal: Goal,
  skillIndex: number
): SkillPathStatus {
  const activeIndex = getActiveSkillIndex(goal);

  if (isSkillComplete(goal.skills[skillIndex])) {
    return "completed";
  }

  if (skillIndex === activeIndex) {
    return "active";
  }

  return skillIndex < activeIndex ? "completed" : "locked";
}
