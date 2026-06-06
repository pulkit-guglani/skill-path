import { useMutation } from "@tanstack/react-query";
import { generateRoadmap } from "@/api/goals";

export function useGenerateRoadmap() {
  return useMutation({
    mutationFn: generateRoadmap,
  });
}
