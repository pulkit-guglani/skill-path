import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Skill } from "@/domain/types";

export type LearningDepth = "casual" | "intermediate" | "dedicated";

interface OnboardingContextValue {
  hobby: string;
  goal: string;
  depth: LearningDepth;
  skills: Skill[];
  setHobby: (value: string) => void;
  setGoal: (value: string) => void;
  setDepth: (value: LearningDepth) => void;
  setSkills: (skills: Skill[]) => void;
  removeSkill: (skillId: string) => void;
  reset: () => void;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

const initialState = {
  hobby: "",
  goal: "",
  depth: "intermediate" as LearningDepth,
  skills: [] as Skill[],
};

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [hobby, setHobby] = useState(initialState.hobby);
  const [goal, setGoal] = useState(initialState.goal);
  const [depth, setDepth] = useState<LearningDepth>(initialState.depth);
  const [skills, setSkills] = useState<Skill[]>(initialState.skills);

  const removeSkill = useCallback((skillId: string) => {
    setSkills((current) =>
      current
        .filter((skill) => skill.id !== skillId)
        .map((skill, index) => ({ ...skill, order: index }))
    );
  }, []);

  const reset = useCallback(() => {
    setHobby(initialState.hobby);
    setGoal(initialState.goal);
    setDepth(initialState.depth);
    setSkills(initialState.skills);
  }, []);

  const value = useMemo(
    () => ({
      hobby,
      goal,
      depth,
      skills,
      setHobby,
      setGoal,
      setDepth,
      setSkills,
      removeSkill,
      reset,
    }),
    [hobby, goal, depth, skills, removeSkill, reset]
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
}
