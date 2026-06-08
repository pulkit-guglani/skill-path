import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useActiveGoal } from "@/hooks/goals";

export default function BootstrapScreen() {
  const router = useRouter();
  const { data: activeGoal, isLoading, isError } = useActiveGoal();

  useEffect(() => {
    if (isLoading) return;

    if (activeGoal && activeGoal.status !== "completed") {
      router.replace("/learn");
      return;
    }

    router.replace("/onboarding/goal");
  }, [activeGoal, isError, isLoading, router]);

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <ActivityIndicator size="large" color="#0050cb" />
    </View>
  );
}
