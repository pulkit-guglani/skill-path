import type { Goal } from "../types";

const emptyCompletion = {
  videoCompleted: false,
  readingCompleted: false,
  practiceCompleted: false,
};

const pieceMovementArticle = `## How each piece moves

Chess pieces move in fixed patterns. Learning these patterns is the first step toward playing confidently.

- Pawns move forward one square, or two on their first move, and capture diagonally.
- Rooks move in straight lines across ranks and files.
- Bishops move diagonally any number of squares.
- Knights jump in an L-shape: two squares in one direction, then one square perpendicular.
- Queens combine rook and bishop movement.
- Kings move one square in any direction.

## Why movement matters

If you hesitate on legal moves, you will miss tactics and blunder pieces. Drill each piece type until the patterns feel automatic.`;

const openingArticle = `## Three opening rules

Strong openings do not require memorizing long lines. Follow three principles:

- Control the center with pawns and pieces.
- Develop knights and bishops toward active squares early.
- Castle to keep your king safe.

## Avoid early mistakes

Before every move, ask what your opponent threatens. Most beginner losses come from leaving pieces undefended or ignoring checks.`;

const checkmateArticle = `## Basic mating ideas

Checkmate ends the game. Beginners should recognize a few reliable patterns:

- Back-rank mate when the king is trapped by its own pawns.
- Queen and king cooperating to drive the enemy king to the edge.
- Rook and king coordinating to cut off escape squares.

## Converting an advantage

Winning material is not enough. Practice converting extra pieces into checkmate by restricting the enemy king step by step.`;

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
        content: pieceMovementArticle,
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
        content: openingArticle,
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
        content: checkmateArticle,
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
