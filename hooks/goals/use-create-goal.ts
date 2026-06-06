import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGoal, type CreateGoalPayload } from "@/api/goals";
import { goalQueryKeys } from "./query-keys";

export function useCreateGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateGoalPayload) => createGoal(payload),
    onSuccess: (goal) => {
      queryClient.setQueryData(goalQueryKeys.detail(goal.id), goal);
    },
  });
}
