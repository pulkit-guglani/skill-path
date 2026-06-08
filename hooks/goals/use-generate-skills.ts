import { useMutation } from "@tanstack/react-query";
import { generateSkills } from "@/api/goals";

export function useGenerateSkills() {
  return useMutation({
    mutationFn: generateSkills,
  });
}
