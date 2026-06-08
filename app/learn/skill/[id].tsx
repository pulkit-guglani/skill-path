import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ScreenFooter } from "@/components/ui/ScreenFooter";
import { ScreenScrollView } from "@/components/ui/ScreenScrollView";
import { SkillPathHeader } from "@/components/ui/SkillPathHeader";
import { getSkillProgressPercent, isSkillComplete } from "@/domain/progress";
import { useActiveGoal } from "@/hooks/goals";

type ResourceType = "video" | "reading" | "practice";

export default function SkillDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: goal } = useActiveGoal();

  const skill = useMemo(
    () => goal?.skills.find((entry) => entry.id === id),
    [goal, id]
  );

  if (!goal || !skill) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <Text className="text-on-surface-variant">Skill not found.</Text>
      </SafeAreaView>
    );
  }

  const progress = getSkillProgressPercent(skill);
  const skillComplete = isSkillComplete(skill);
  const skillIndex = goal.skills.findIndex((entry) => entry.id === skill.id);
  const nextSkill =
    skillIndex >= 0 ? goal.skills[skillIndex + 1] : undefined;

  const resources: Array<{
    type: ResourceType;
    title: string;
    description: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    iconBg: string;
    iconColor: string;
    completed: boolean;
  }> = [
    {
      type: "video",
      title: skill.videoResource.title,
      description: "Watch and learn the core concepts for this skill.",
      icon: "play-circle-filled",
      iconBg: "bg-secondary-container",
      iconColor: "#00714d",
      completed: skill.completion.videoCompleted,
    },
    {
      type: "reading",
      title: skill.readingResource.title,
      description: "Read the in-app article to reinforce what you learned.",
      icon: "menu-book",
      iconBg: "bg-tertiary-fixed",
      iconColor: "#2a1700",
      completed: skill.completion.readingCompleted,
    },
    {
      type: "practice",
      title: skill.practiceTask.title,
      description: skill.practiceTask.description,
      icon: "track-changes",
      iconBg: "bg-primary-fixed",
      iconColor: "#001849",
      completed: skill.completion.practiceCompleted,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <SkillPathHeader
        title={skill.title}
        showBack
        onBack={() => router.back()}
      />

      <View className="w-full bg-surface-container-low h-1.5">
        <View
          className="bg-primary h-full"
          style={{ width: `${progress}%` }}
        />
      </View>

      <ScreenScrollView
        className="flex-1 px-margin-mobile"
        hasFixedFooter={skillComplete}
      >
        <View className="mt-stack-lg mb-stack-lg bg-surface-container-low p-stack-md rounded-xl border border-outline-variant/30">
          <Text className="text-2xl font-semibold text-on-surface mb-2">
            Why This Matters
          </Text>
          <Text className="text-lg text-on-surface-variant leading-relaxed">
            {skill.whyItMatters}
          </Text>
        </View>

        <View className="flex-row items-center justify-between mb-stack-md">
          <Text className="text-2xl font-semibold text-on-surface">
            Resources
          </Text>
          <View className="bg-primary/10 px-3 py-1 rounded-full">
            <Text className="text-sm font-semibold text-primary">
              3 Lessons
            </Text>
          </View>
        </View>

        <View className="gap-gutter">
          {resources.map((resource) => (
            <Pressable
              key={resource.type}
              onPress={() =>
                router.push(`/learn/resource/${skill.id}/${resource.type}`)
              }
              className="bg-surface-container-lowest p-stack-md rounded-lg border border-outline-variant/20 shadow-bloom active:opacity-90"
            >
              <View className="flex-row justify-between items-start mb-3">
                <View
                  className={`w-12 h-12 rounded-full items-center justify-center ${resource.iconBg}`}
                >
                  <MaterialIcons
                    name={resource.icon}
                    size={24}
                    color={resource.iconColor}
                  />
                </View>
                <View
                  className={`w-6 h-6 rounded-md border-2 items-center justify-center ${
                    resource.completed
                      ? "bg-primary border-primary"
                      : "border-outline-variant"
                  }`}
                >
                  {resource.completed ? (
                    <MaterialIcons name="check" size={16} color="#ffffff" />
                  ) : null}
                </View>
              </View>
              <Text className="text-xl font-semibold text-on-surface mb-2">
                {resource.title}
              </Text>
              <Text className="text-base text-on-surface-variant">
                {resource.description}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScreenScrollView>

      {skillComplete ? (
        <ScreenFooter>
          <PrimaryButton
            label={
              nextSkill
                ? `Continue to ${nextSkill.title}`
                : "Back to Learning Path"
            }
            icon={nextSkill ? "arrow-forward" : undefined}
            variant="rounded"
            onPress={() => {
              if (nextSkill) {
                router.replace(`/learn/skill/${nextSkill.id}`);
                return;
              }
              router.replace("/learn");
            }}
          />
        </ScreenFooter>
      ) : null}
    </SafeAreaView>
  );
}
