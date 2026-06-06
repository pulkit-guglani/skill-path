import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSkills } from "@/api/goals";
import type { Skill } from "@/domain/types";
import { goalQueryKeys } from "./query-keys";

interface UpdateSkillsVariables {
  goalId: string;
  skills: Skill[];
}

export function useUpdateSkills() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ goalId, skills }: UpdateSkillsVariables) =>
      updateSkills(goalId, skills),
    onSuccess: (goal) => {
      queryClient.setQueryData(goalQueryKeys.detail(goal.id), goal);
    },
  });
}
