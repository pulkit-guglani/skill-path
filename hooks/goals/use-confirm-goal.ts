import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmGoal } from "@/api/goals";
import { goalQueryKeys } from "./query-keys";

export function useConfirmGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (goalId: string) => confirmGoal(goalId),
    onSuccess: (goal) => {
      queryClient.setQueryData(goalQueryKeys.detail(goal.id), goal);
      queryClient.setQueryData(goalQueryKeys.active(), goal);
    },
  });
}
