import * as Crypto from "expo-crypto";
import type { GeneratedSkillsOutline, Skill, SkillCompletion } from "../types";

const emptyCompletion: SkillCompletion = {
  videoCompleted: false,
  readingCompleted: false,
  practiceCompleted: false,
};

const pendingLink = {
  title: "Pending",
  url: "https://example.com/pending",
};

const pendingArticle = {
  title: "Pending",
  content:
    "Article content will be generated after you confirm your path. This placeholder will be replaced with a full in-app lesson.",
};

const pendingPractice = {
  title: "Pending",
  description: "Lesson content will be generated after you confirm your path.",
};

export function skillsOutlineToSkills(outline: GeneratedSkillsOutline): Skill[] {
  return outline.skills.map((item, index) => ({
    id: Crypto.randomUUID(),
    title: item.title,
    order: index,
    source: "ai",
    whyItMatters: item.whyItMatters,
    videoResource: { ...pendingLink },
    readingResource: { ...pendingArticle },
    practiceTask: { ...pendingPractice },
    completion: { ...emptyCompletion },
  }));
}
