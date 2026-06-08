import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { ScreenScrollView } from "@/components/ui/ScreenScrollView";
import { SkillPathHeader } from "@/components/ui/SkillPathHeader";
import { getGoalProgressPercent } from "@/domain/progress";
import { useActiveGoal, useDeleteAllGoals } from "@/hooks/goals";
import { getSkillPathStatus } from "@/lib/learning-state";

export default function DashboardScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const { data: goal, isLoading, isFetching, refetch } = useActiveGoal({
    enabled: isFocused,
  });
  const deleteAllGoals = useDeleteAllGoals();

  useFocusEffect(
    useCallback(() => {
      void refetch();
    }, [refetch])
  );

  useFocusEffect(
    useCallback(() => {
      if (!isFocused || isLoading || isFetching || goal) {
        return;
      }

      router.replace("/onboarding/goal");
    }, [goal, isFetching, isFocused, isLoading, router])
  );

  const handleDeleteGoal = () => {
    if (deleteAllGoals.isPending) {
      return;
    }

    Alert.alert(
      "Delete learning path?",
      "This removes your goal and all progress from your account. You cannot undo this.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteAllGoals.mutate(undefined, {
              onError: (error) => {
                Alert.alert(
                  "Could not delete",
                  error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again."
                );
              },
            });
          },
        },
      ]
    );
  };

  if (!isFocused) {
    return <View className="flex-1 bg-background" />;
  }

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#0050cb" />
      </View>
    );
  }

  if (!goal) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#0050cb" />
      </View>
    );
  }

  const progress = getGoalProgressPercent(goal);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <SkillPathHeader
        rightIcon="delete-outline"
        onRightPress={handleDeleteGoal}
      />
      <ScreenScrollView className="flex-1 px-margin-mobile">
        <View className="mt-stack-md bg-surface-container-lowest rounded-lg p-stack-md shadow-bloom border border-outline-variant/30">
          <View className="flex-col items-center gap-stack-md">
            <ProgressRing percent={progress} />
            <View className="items-center">
              <Text className="text-2xl font-semibold text-on-surface mb-2 text-center">
                Goal: {goal.goal}
              </Text>
              <Text className="text-base text-on-surface-variant text-center">
                You&apos;re making steady progress through your {goal.hobby}{" "}
                path. Focus on your current skill to level up.
              </Text>
              <View className="flex-row flex-wrap justify-center gap-2 mt-3">
                <View className="bg-secondary-container px-3 py-1 rounded-full">
                  <Text className="text-xs font-medium text-on-secondary-container">
                    {goal.skills.length} skills
                  </Text>
                </View>
                <View className="bg-tertiary-fixed px-3 py-1 rounded-full">
                  <Text className="text-xs font-medium text-on-tertiary-fixed">
                    {goal.hobby}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-stack-lg">
          <Text className="text-2xl font-semibold text-on-surface mb-stack-md px-1">
            Learning Path
          </Text>
          <View className="gap-6">
            {goal.skills.map((skill, index) => {
              const status = getSkillPathStatus(goal, index);
              const isActive = status === "active";
              const isCompleted = status === "completed";
              const isLocked = status === "locked";

              return (
                <View key={skill.id} className="flex-row items-start gap-stack-md">
                  <View
                    className={`mt-1 w-12 h-12 rounded-full items-center justify-center ${
                      isCompleted
                        ? "bg-secondary"
                        : isActive
                          ? "bg-primary"
                          : "bg-surface-container-highest border border-outline-variant"
                    }`}
                  >
                    <MaterialIcons
                      name={
                        isCompleted
                          ? "check-circle"
                          : isActive
                            ? "play-arrow"
                            : "lock"
                      }
                      size={24}
                      color={isLocked ? "#424656" : "#ffffff"}
                    />
                  </View>

                  <View
                    className={`flex-1 rounded-lg p-stack-md border ${
                      isActive
                        ? "bg-surface-container-lowest border-primary/30 shadow-bloom"
                        : "bg-surface-container-low border-outline-variant/20"
                    } ${isLocked ? "opacity-50" : isCompleted ? "opacity-80" : ""}`}
                  >
                    <View className="flex-row items-start gap-2 mb-1">
                      <Text className="flex-1 shrink text-xl font-semibold text-on-surface">
                        {skill.title}
                      </Text>
                      {isActive ? (
                        <View className="shrink-0 bg-primary-container px-2 py-0.5 rounded">
                          <Text className="text-[10px] uppercase font-bold text-on-primary-container tracking-wider">
                            Active
                          </Text>
                        </View>
                      ) : null}
                    </View>
                    <Text className="text-base text-on-surface-variant mb-3">
                      {skill.whyItMatters}
                    </Text>

                    {isActive ? (
                      <Pressable
                        className="bg-primary px-6 py-3 rounded-full self-start"
                        onPress={() =>
                          router.push(`/learn/skill/${skill.id}`)
                        }
                      >
                        <Text className="text-on-primary font-semibold">
                          Resume Unit
                        </Text>
                      </Pressable>
                    ) : isCompleted ? (
                      <Pressable
                        className="bg-secondary-container px-6 py-3 rounded-full self-start"
                        onPress={() =>
                          router.push(`/learn/skill/${skill.id}`)
                        }
                      >
                        <Text className="text-on-secondary-container font-semibold">
                          Review Unit
                        </Text>
                      </Pressable>
                    ) : (
                      <Text className="text-on-surface-variant font-semibold">
                        Locked
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScreenScrollView>
    </SafeAreaView>
  );
}
