import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllGoals } from "@/api/goals";
import { goalQueryKeys } from "./query-keys";

export function useDeleteAllGoals() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAllGoals,
    onSuccess: () => {
      queryClient.setQueryData(goalQueryKeys.active(), null);
      queryClient.removeQueries({ queryKey: goalQueryKeys.all });
    },
  });
}
