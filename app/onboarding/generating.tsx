import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { generateSkills } from "@/api/goals";
import { skillsOutlineToSkills } from "@/domain";
import { useOnboarding } from "@/context/onboarding-context";
import { getFriendlyApiErrorMessage } from "@/lib/api-error-message";

const STATUS_MESSAGES = [
  "Finding the most important skills...",
  "Removing unnecessary complexity...",
  "Building your skill list...",
  "Optimizing your path for flow...",
  "Almost ready for review...",
];

export default function GeneratingScreen() {
  const router = useRouter();
  const { hobby, goal, depth, setSkills } = useOnboarding();
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
    started.current = true;

    async function run() {
      try {
        const depthNote =
          depth === "casual"
            ? "Keep the path minimal."
            : depth === "dedicated"
              ? "Include a thorough learning path."
              : "Balance depth and efficiency.";

        const outline = await generateSkills({
          hobby: hobby.trim(),
          goal: `${goal.trim()} (${depthNote})`,
        });

        setSkills(skillsOutlineToSkills(outline));
        router.replace("/onboarding/roadmap");
      } catch (err) {
        setError(getFriendlyApiErrorMessage(err, "Failed to generate skills"));
      }
    }

    void run();
  }, [depth, goal, hobby, router, setSkills]);

  return (
    <SafeAreaView className="flex-1 bg-background items-center justify-center px-margin-mobile">
      <View className="items-center w-full max-w-lg">
        <View className="w-48 h-48 items-center justify-center mb-stack-lg">
          <View className="absolute w-40 h-40 rounded-full bg-primary/10" />
          <ActivityIndicator size="large" color="#0050cb" />
          <MaterialIcons
            name="auto-awesome"
            size={32}
            color="#0050cb"
            style={{ position: "absolute" }}
          />
        </View>

        <Text className="text-2xl font-semibold text-primary text-center mb-2">
          {STATUS_MESSAGES[messageIndex]}
        </Text>
        <Text className="text-lg text-on-surface-variant text-center">
          Identifying the essential skills for your goal. You&apos;ll review
          the list before we build your full lessons.
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
