import { MaterialIcons } from "@expo/vector-icons";
import * as Crypto from "expo-crypto";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQueryClient } from "@tanstack/react-query";
import { confirmGoal, createGoal, generateSkillContent } from "@/api/goals";
import { AiProcessingLoader } from "@/components/ui/AiProcessingLoader";
import { mergeGeneratedContentIntoSkills } from "@/domain";
import { useOnboarding } from "@/context/onboarding-context";
import { goalQueryKeys } from "@/hooks/goals/query-keys";
import { getFriendlyApiErrorMessage } from "@/lib/api-error-message";

const STATUS_MESSAGES = [
  "Building your lessons...",
  "Finding the best videos...",
  "Writing in-app articles...",
  "Designing practice tasks...",
  "Finalizing your learning path...",
  "Almost ready for liftoff...",
];

export default function GeneratingContentScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { hobby, goal, depth, skills } = useOnboarding();
  const [messageIndex, setMessageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((current) => (current + 1) % STATUS_MESSAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (started.current) return;
    if (skills.length === 0) {
      router.replace("/onboarding/roadmap");
      return;
    }

    started.current = true;

    async function run() {
      try {
        const depthNote =
          depth === "casual"
            ? "Keep the path minimal."
            : depth === "dedicated"
              ? "Include a thorough learning path."
              : "Balance depth and efficiency.";

        const content = await generateSkillContent({
          hobby: hobby.trim(),
          goal: `${goal.trim()} (${depthNote})`,
          skills: skills.map((skill) => ({
            title: skill.title,
            whyItMatters: skill.whyItMatters,
          })),
        });

        const skillsWithContent = mergeGeneratedContentIntoSkills(skills, content);
        const goalId = Crypto.randomUUID();
        const created = await createGoal({
          id: goalId,
          hobby: hobby.trim(),
          goal: goal.trim(),
          skills: skillsWithContent,
        });
        const confirmed = await confirmGoal(created.id);

        queryClient.setQueryData(goalQueryKeys.active(), confirmed);
        queryClient.setQueryData(goalQueryKeys.detail(confirmed.id), confirmed);

        router.replace("/learn");
      } catch (err) {
        setError(
          getFriendlyApiErrorMessage(err, "Failed to generate lessons")
        );
      }
    }

    void run();
  }, [depth, goal, hobby, queryClient, router, skills]);

  return (
    <SafeAreaView className="flex-1 bg-background items-center justify-center px-margin-mobile">
      <View className="items-center w-full max-w-lg">
        <AiProcessingLoader />

        <Text className="text-2xl font-semibold text-primary text-center mb-2">
          {STATUS_MESSAGES[messageIndex]}
        </Text>
        <Text className="text-lg text-on-surface-variant text-center">
          Creating videos, articles, and practice tasks for your approved
          skills.
        </Text>

        <View className="mt-stack-lg flex-row items-center gap-2 px-4 py-2 bg-surface-container-high rounded-full border border-outline-variant">
          <MaterialIcons name="auto-awesome" size={20} color="#0050cb" />
          <Text className="text-sm font-semibold text-on-surface uppercase tracking-widest">
            AI Processing
          </Text>
        </View>

        {error ? (
          <View className="mt-stack-lg w-full">
            <Text className="text-error text-center mb-4">{error}</Text>
            <Text
              className="text-primary text-center font-semibold"
              onPress={() => router.back()}
            >
              Go back and try again
            </Text>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
