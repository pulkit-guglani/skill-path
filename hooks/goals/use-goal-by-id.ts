import { useQuery } from "@tanstack/react-query";
import { getGoalById } from "@/api/goals";
import { goalQueryKeys } from "./query-keys";

export function useGoalById(id: string | undefined) {
  return useQuery({
    queryKey: goalQueryKeys.detail(id ?? ""),
    queryFn: () => getGoalById(id!),
    enabled: Boolean(id),
  });
}
