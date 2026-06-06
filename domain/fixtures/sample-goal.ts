import type { Goal } from "../types";

const emptyCompletion = {
  videoCompleted: false,
  readingCompleted: false,
  practiceCompleted: false,
};

export const sampleDraftGoal: Goal = {
  id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  hobby: "Chess",
  goal: "Beat my friends at chess",
  status: "draft",
  createdAt: "2026-06-07T10:00:00.000Z",
  updatedAt: "2026-06-07T10:00:00.000Z",
  skills: [
    {
      id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      title: "Learn basic piece movement",
      order: 0,
      source: "ai",
      whyItMatters:
        "You cannot play a real game until every piece's movement is automatic.",
      videoResource: {
        title: "Chess basics for beginners",
        url: "https://www.youtube.com/watch?v=example1",
      },
      readingResource: {
        title: "How each chess piece moves",
        url: "https://example.com/chess/piece-movement",
      },
      practiceTask: {
        title: "Movement drills",
        description:
          "Set up an empty board and move each piece type to legal squares for 10 minutes.",
      },
      completion: emptyCompletion,
    },
    {
      id: "c3d4e5f6-a7b8-9012-cdef-123456789012",
      title: "Avoid blunders in the opening",
      order: 1,
      source: "ai",
      whyItMatters:
        "Most casual games are decided by one early mistake, not deep strategy.",
      videoResource: {
        title: "Opening principles explained",
        url: "https://www.youtube.com/watch?v=example2",
      },
      readingResource: {
        title: "Three opening rules every beginner needs",
        url: "https://example.com/chess/opening-principles",
      },
      practiceTask: {
        title: "Blunder check habit",
        description:
          "Play 3 rapid games and pause before every move to ask: what does my opponent threaten?",
      },
      completion: emptyCompletion,
    },
    {
      id: "d4e5f6a7-b8c9-0123-def0-234567890123",
      title: "Basic checkmate patterns",
      order: 2,
      source: "ai",
      whyItMatters:
        "Winning requires converting an advantage into checkmate, not just staying ahead.",
      videoResource: {
        title: "Queen and rook checkmates",
        url: "https://www.youtube.com/watch?v=example3",
      },
      readingResource: {
        title: "Essential mating patterns",
        url: "https://example.com/chess/checkmate-patterns",
      },
      practiceTask: {
        title: "Mate drills",
        description:
          "Complete 10 mate-in-1 puzzles, then 5 mate-in-2 puzzles on a training site.",
      },
      completion: emptyCompletion,
    },
  ],
};

export const sampleConfirmedGoal: Goal = {
  ...sampleDraftGoal,
  id: "e5f6a7b8-c9d0-1234-ef01-345678901234",
  status: "confirmed",
  updatedAt: "2026-06-07T11:00:00.000Z",
  skills: sampleDraftGoal.skills.map((skill, index) =>
    index === 0
      ? {
          ...skill,
          completion: {
            videoCompleted: true,
            readingCompleted: true,
            practiceCompleted: false,
          },
        }
      : skill
  ),
};

export const sampleGeneratedRoadmap = {
  skills: sampleDraftGoal.skills.map(
    ({
      title,
      whyItMatters,
      videoResource,
      readingResource,
      practiceTask,
    }) => ({
      title,
      whyItMatters,
      videoResource,
      readingResource,
      practiceTask,
    })
  ),
};
