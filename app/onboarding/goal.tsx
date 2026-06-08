import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomCtaBar, PrimaryButton } from "@/components/ui/PrimaryButton";
import { ScreenScrollView } from "@/components/ui/ScreenScrollView";
import { SkillPathHeader } from "@/components/ui/SkillPathHeader";
import { useOnboarding } from "@/context/onboarding-context";

const GOAL_EXAMPLES = [
  { hobby: "Chess", goal: "Beat friends consistently" },
  { hobby: "Chess", goal: "Reach 1200 Elo" },
  { hobby: "Guitar", goal: "Play Bollywood songs" },
];

const MAX_GOAL_LENGTH = 200;

export default function GoalScreen() {
  const router = useRouter();
  const { hobby, goal, setHobby, setGoal } = useOnboarding();
  const [error, setError] = useState<string | null>(null);

  const goalLength = goal.length;
  const canContinue = useMemo(
    () => hobby.trim().length >= 2 && goal.trim().length >= 5,
    [goal, hobby]
  );

  function handleContinue() {
    const trimmedHobby = hobby.trim();
    const trimmedGoal = goal.trim();

    if (trimmedHobby.length < 2) {
      setError("Enter a hobby (at least 2 characters).");
      return;
    }

    if (trimmedGoal.length < 5) {
      setError("Describe your goal in at least 5 characters.");
      return;
    }

    setError(null);
    router.push("/onboarding/depth");
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <SkillPathHeader />
        <ScreenScrollView
          className="flex-1 px-margin-mobile"
          keyboardShouldPersistTaps="handled"
          hasFixedFooter
        >
          <View className="mb-stack-lg">
            <Text className="text-[28px] font-bold text-on-surface leading-[34px] mb-2">
              What do you want to achieve?
            </Text>
            <Text className="text-base text-on-surface-variant">
              Describe your specific goal. The more specific, the better your
              path.
            </Text>
          </View>

          <View className="mb-gutter">
            <Text className="text-sm font-semibold text-on-surface-variant mb-2 px-1">
              Your hobby
            </Text>
            <View className="bg-surface-container-low rounded-lg px-stack-md py-4 border-2 border-transparent">
              <TextInput
                value={hobby}
                onChangeText={setHobby}
                placeholder="e.g. Chess, Guitar, French"
                placeholderTextColor="rgba(66, 70, 86, 0.4)"
                className="text-lg text-on-surface"
                maxLength={50}
              />
            </View>
          </View>

          <View className="relative">
            <View className="bg-surface-container-low rounded-lg p-stack-md">
              <TextInput
                value={goal}
                onChangeText={(text) => setGoal(text.slice(0, MAX_GOAL_LENGTH))}
                placeholder="e.g. I want to learn enough French to order comfortably at a bistro in Paris by next summer."
                placeholderTextColor="rgba(66, 70, 86, 0.4)"
                multiline
                textAlignVertical="top"
                className="min-h-[160px] text-lg text-on-surface"
              />
            </View>
            <Text className="absolute bottom-4 right-4 text-xs text-on-surface-variant/60">
              {goalLength} / {MAX_GOAL_LENGTH}
            </Text>
          </View>

          <View className="mt-stack-lg gap-stack-sm">
            <Text className="text-sm font-semibold text-on-surface-variant px-1">
              Helpful examples
            </Text>
            <View className="flex-row flex-wrap gap-gutter">
              {GOAL_EXAMPLES.map((example) => (
                <Pressable
                  key={example.goal}
                  onPress={() => {
                    setHobby(example.hobby);
                    setGoal(example.goal);
                    setError(null);
                  }}
                  className="bg-surface-container-lowest border border-outline-variant/30 px-gutter py-3 rounded-2xl shadow-bloom active:opacity-80"
                >
                  <Text className="text-base text-on-surface">{example.goal}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {error ? (
            <Text className="text-error text-sm mt-4">{error}</Text>
          ) : null}
        </ScreenScrollView>

        <BottomCtaBar>
          <PrimaryButton
            label="Continue"
            icon="arrow-forward"
            onPress={handleContinue}
            disabled={!canContinue}
          />
        </BottomCtaBar>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
