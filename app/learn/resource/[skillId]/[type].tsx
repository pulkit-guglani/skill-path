import { MaterialIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { InteractionManager, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArticleContent } from "@/components/ui/ArticleContent";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ScreenFooter } from "@/components/ui/ScreenFooter";
import { ScreenScrollView } from "@/components/ui/ScreenScrollView";
import { SkillPathHeader } from "@/components/ui/SkillPathHeader";
import { YoutubePlayerEmbed } from "@/components/ui/YoutubePlayerEmbed";
import { useActiveGoal, useUpdateCompletion } from "@/hooks/goals";
import { extractYoutubeVideoId } from "@/lib/youtube";

type ResourceType = "video" | "reading" | "practice";

export default function ResourceScreen() {
  const router = useRouter();
  const { skillId, type } = useLocalSearchParams<{
    skillId: string;
    type: ResourceType;
  }>();
  const { data: goal } = useActiveGoal();
  const updateCompletion = useUpdateCompletion();
  const [error, setError] = useState<string | null>(null);

  const skill = useMemo(
    () => goal?.skills.find((entry) => entry.id === skillId),
    [goal, skillId]
  );

  if (!goal || !skill || !type) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <Text className="text-on-surface-variant">Resource not found.</Text>
      </SafeAreaView>
    );
  }

  const youtubeVideoId =
    type === "video" ? extractYoutubeVideoId(skill.videoResource.url) : null;

  const config = {
    video: {
      title: "Video Lesson",
      headline: skill.videoResource.title,
      body: "Watch this lesson to build intuition before you practice.",
      url: skill.videoResource.url,
      completed: skill.completion.videoCompleted,
      patch: { videoCompleted: true } as const,
      icon: "play-circle-filled" as const,
      cta: "Mark as Complete",
    },
    reading: {
      title: "Reading",
      headline: skill.readingResource.title,
      body: "Read this article to deepen your understanding of the skill.",
      completed: skill.completion.readingCompleted,
      patch: { readingCompleted: true } as const,
      icon: "menu-book" as const,
      cta: "Mark as Complete",
    },
    practice: {
      title: "Practice Task",
      headline: skill.practiceTask.title,
      body: skill.practiceTask.description,
      completed: skill.completion.practiceCompleted,
      patch: { practiceCompleted: true } as const,
      icon: "track-changes" as const,
      cta: "Mark Practice Done",
    },
  }[type];

  async function handleOpenYoutube() {
    if (type !== "video" || !skill) return;
    const supported = await Linking.canOpenURL(skill.videoResource.url);
    if (!supported) {
      setError("Cannot open this link on your device.");
      return;
    }
    await Linking.openURL(skill.videoResource.url);
  }

  function navigateBack() {
    InteractionManager.runAfterInteractions(() => {
      router.replace(`/learn/skill/${skillId}`);
    });
  }

  async function handleMarkComplete() {
    if (!goal || !skill) return;

    if (config.completed) {
      navigateBack();
      return;
    }

    setError(null);
    try {
      await updateCompletion.mutateAsync({
        goalId: goal.id,
        skillId: skill.id,
        patch: config.patch,
      });
      navigateBack();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update completion"
      );
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <SkillPathHeader
        title={config.title}
        showBack
        onBack={() => router.replace(`/learn/skill/${skillId}`)}
      />

      <ScreenScrollView
        className="flex-1 px-margin-mobile"
        contentContainerClassName="pt-stack-lg"
        hasFixedFooter
      >
        <View className="w-14 h-14 rounded-full bg-primary-container items-center justify-center mb-stack-md">
          <MaterialIcons name={config.icon} size={28} color="#f8f7ff" />
        </View>

        <Text className="text-[28px] font-bold text-on-surface mb-3">
          {config.headline}
        </Text>

        {type !== "reading" ? (
          <Text className="text-lg text-on-surface-variant leading-relaxed mb-stack-lg">
            {config.body}
          </Text>
        ) : null}

        {type === "video" && youtubeVideoId ? (
          <>
            <YoutubePlayerEmbed videoId={youtubeVideoId} />
            <Pressable
              onPress={handleOpenYoutube}
              className="flex-row items-center gap-2 mb-stack-md active:opacity-80"
            >
              <MaterialIcons name="open-in-new" size={18} color="#0050cb" />
              <Text className="text-primary font-semibold">
                Open in YouTube
              </Text>
            </Pressable>
          </>
        ) : null}

        {type === "reading" ? (
          <ArticleContent content={skill.readingResource.content} />
        ) : null}

        {type === "practice" ? (
          <View className="p-stack-md bg-surface-container-low rounded-xl border border-outline-variant/30 mb-stack-md">
            <Text className="text-base font-semibold text-on-surface mb-2">
              Your task
            </Text>
            <Text className="text-base text-on-surface-variant">
              {skill.practiceTask.description}
            </Text>
          </View>
        ) : null}

        {config.completed ? (
          <View className="flex-row items-center gap-2 bg-secondary-container/30 p-4 rounded-xl">
            <MaterialIcons name="check-circle" size={22} color="#006c49" />
            <Text className="text-secondary font-semibold">Completed</Text>
          </View>
        ) : null}

        {error ? <Text className="text-error mt-4">{error}</Text> : null}
      </ScreenScrollView>

      <ScreenFooter>
        <PrimaryButton
          label={config.completed ? "Done" : config.cta}
          variant="rounded"
          loading={updateCompletion.isPending}
          onPress={handleMarkComplete}
        />
      </ScreenFooter>
    </SafeAreaView>
  );
}
