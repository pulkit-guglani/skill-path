import { useMutation } from "@tanstack/react-query";
import { generateSkillContent } from "@/api/goals";

export function useGenerateSkillContent() {
  return useMutation({
    mutationFn: generateSkillContent,
  });
}
