import * as Crypto from "expo-crypto";
import type { GeneratedRoadmap, Skill, SkillCompletion } from "../types";

const emptyCompletion: SkillCompletion = {
  videoCompleted: false,
  readingCompleted: false,
  practiceCompleted: false,
};

export function generatedRoadmapToSkills(roadmap: GeneratedRoadmap): Skill[] {
  return roadmap.skills.map((generated, index) => ({
    id: Crypto.randomUUID(),
    title: generated.title,
    order: index,
    source: "ai",
    whyItMatters: generated.whyItMatters,
    videoResource: generated.videoResource,
    readingResource: generated.readingResource,
    practiceTask: generated.practiceTask,
    completion: { ...emptyCompletion },
  }));
}
