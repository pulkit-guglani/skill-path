import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DepthOptionList } from "@/components/ui/DepthOptionCard";
import { BottomCtaBar, PrimaryButton } from "@/components/ui/PrimaryButton";
import { ScreenScrollView } from "@/components/ui/ScreenScrollView";
import { SkillPathHeader } from "@/components/ui/SkillPathHeader";
import { useOnboarding } from "@/context/onboarding-context";

export default function DepthScreen() {
  const router = useRouter();
  const { depth, setDepth } = useOnboarding();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <SkillPathHeader />
      <ScreenScrollView
        className="flex-1 px-margin-mobile"
        contentContainerClassName="pt-stack-lg"
        hasFixedFooter
      >
        <View className="items-center mb-stack-lg">
          <Text className="text-[28px] font-bold text-on-surface text-center mb-2">
            How serious are you?
          </Text>
          <Text className="text-base text-on-surface-variant text-center">
            Choose the intensity that matches your ambition.
          </Text>
        </View>

        <DepthOptionList selected={depth} onSelect={setDepth} />
      </ScreenScrollView>

      <BottomCtaBar>
        <PrimaryButton
          label="Generate My Path"
          icon="auto-awesome"
          onPress={() => router.push("/onboarding/generating")}
        />
      </BottomCtaBar>
    </SafeAreaView>
  );
}
