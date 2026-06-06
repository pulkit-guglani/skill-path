import { useQuery } from "@tanstack/react-query";
import { getActiveGoal } from "@/api/goals";
import { goalQueryKeys } from "./query-keys";

export function useActiveGoal() {
  return useQuery({
    queryKey: goalQueryKeys.active(),
    queryFn: getActiveGoal,
  });
}
