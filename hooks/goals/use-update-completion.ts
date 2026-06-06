import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateCompletion,
  type UpdateCompletionPayload,
} from "@/api/goals";
import { goalQueryKeys } from "./query-keys";
import type { Goal, Skill } from "@/domain/types";

interface UpdateCompletionVariables {
  goalId: string;
  skillId: string;
  patch: UpdateCompletionPayload;
}

function patchSkillInGoal(goal: Goal, updatedSkill: Skill): Goal {
  return {
    ...goal,
    skills: goal.skills.map((skill) =>
      skill.id === updatedSkill.id ? updatedSkill : skill
    ),
    updatedAt: new Date().toISOString(),
  };
}

export function useUpdateCompletion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ goalId, skillId, patch }: UpdateCompletionVariables) =>
      updateCompletion(goalId, skillId, patch),
    onSuccess: (updatedSkill, { goalId }) => {
      const detailKey = goalQueryKeys.detail(goalId);
      const cachedGoal = queryClient.getQueryData<Goal>(detailKey);
      if (cachedGoal) {
        queryClient.setQueryData(
          detailKey,
          patchSkillInGoal(cachedGoal, updatedSkill)
        );
      }

      const activeKey = goalQueryKeys.active();
      const cachedActive = queryClient.getQueryData<Goal | null>(activeKey);
      if (cachedActive?.id === goalId) {
        queryClient.setQueryData(
          activeKey,
          patchSkillInGoal(cachedActive, updatedSkill)
        );
      }

      // Refetch so goal status stays correct when the backend auto-completes.
      void queryClient.invalidateQueries({ queryKey: detailKey });
      void queryClient.invalidateQueries({ queryKey: activeKey });
    },
  });
}
