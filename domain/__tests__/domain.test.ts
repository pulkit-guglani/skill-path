import {
  GeneratedRoadmapSchema,
  GeneratedSkillsOutlineSchema,
  GoalSchema,
  MAX_GENERATED_SKILLS,
} from "@/domain/schemas";
import {
  sampleConfirmedGoal,
  sampleDraftGoal,
  sampleGeneratedRoadmap,
} from "@/domain/fixtures";
import {
  getCompletedSkillCount,
  getGoalProgressPercent,
  getSkillProgressPercent,
  isSkillComplete,
} from "@/domain/progress";

describe("domain schemas", () => {
  it("parses a valid goal fixture", () => {
    expect(GoalSchema.parse(sampleDraftGoal)).toEqual(sampleDraftGoal);
  });

  it("parses a confirmed goal with partial completion", () => {
    expect(GoalSchema.parse(sampleConfirmedGoal)).toEqual(sampleConfirmedGoal);
  });

  it("parses a generated roadmap fixture", () => {
    expect(GeneratedRoadmapSchema.parse(sampleGeneratedRoadmap)).toEqual(
      sampleGeneratedRoadmap
    );
  });

  it("parses a generated skills outline fixture", () => {
    const outline = {
      skills: sampleGeneratedRoadmap.skills.map(({ title, whyItMatters }) => ({
        title,
        whyItMatters,
      })),
    };

    expect(GeneratedSkillsOutlineSchema.parse(outline)).toEqual(outline);
  });

  it("rejects roadmaps with too many skills", () => {
    const tooManySkills = Array.from({ length: MAX_GENERATED_SKILLS + 1 }, () =>
      sampleGeneratedRoadmap.skills[0]
    );

    expect(() =>
      GeneratedRoadmapSchema.parse({ skills: tooManySkills })
    ).toThrow();
  });

  it("rejects goals with invalid hobby length", () => {
    expect(() =>
      GoalSchema.parse({
        ...sampleDraftGoal,
        hobby: "X",
      })
    ).toThrow();
  });
});

describe("progress helpers", () => {
  it("calculates skill progress from resource completion", () => {
    const skill = sampleConfirmedGoal.skills[0];
    expect(getSkillProgressPercent(skill)).toBe(67);
    expect(isSkillComplete(skill)).toBe(false);
  });

  it("calculates goal progress as average skill progress", () => {
    expect(getGoalProgressPercent(sampleConfirmedGoal)).toBe(22);
    expect(getCompletedSkillCount(sampleConfirmedGoal)).toBe(0);
  });
});
