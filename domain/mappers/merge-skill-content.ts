import type { GeneratedRoadmap, Skill } from "../types";

export function mergeGeneratedContentIntoSkills(
  skills: Skill[],
  content: GeneratedRoadmap
): Skill[] {
  let aiIndex = 0;

  return skills.map((skill) => {
    if (skill.source !== "ai") {
      return skill;
    }

    const generated = content.skills[aiIndex];
    aiIndex += 1;

    if (!generated) {
      return skill;
    }

    return {
      ...skill,
      whyItMatters: generated.whyItMatters,
      videoResource: generated.videoResource,
      readingResource: generated.readingResource,
      practiceTask: generated.practiceTask,
    };
  });
}
