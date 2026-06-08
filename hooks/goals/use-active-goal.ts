import { useQuery } from "@tanstack/react-query";
import { getActiveGoal } from "@/api/goals";
import { goalQueryKeys } from "./query-keys";

interface UseActiveGoalOptions {
  enabled?: boolean;
}

export function useActiveGoal(options?: UseActiveGoalOptions) {
  return useQuery({
    queryKey: goalQueryKeys.active(),
    queryFn: getActiveGoal,
    enabled: options?.enabled ?? true,
  });
}
