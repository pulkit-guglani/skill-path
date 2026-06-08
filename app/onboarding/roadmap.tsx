import { MaterialIcons } from "@expo/vector-icons";
import * as Crypto from "expo-crypto";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ScreenFooter } from "@/components/ui/ScreenFooter";
import { ScreenScrollView } from "@/components/ui/ScreenScrollView";
import { SkillPathHeader } from "@/components/ui/SkillPathHeader";
import { useOnboarding } from "@/context/onboarding-context";
import type { Skill } from "@/domain/types";

export default function RoadmapScreen() {
  const router = useRouter();
  const { goal, skills, removeSkill, setSkills } = useOnboarding();
  const [error, setError] = useState<string | null>(null);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [customTitle, setCustomTitle] = useState("");

  function handleAddCustomSkill() {
    const trimmed = customTitle.trim();
    if (!trimmed) return;

    const newSkill: Skill = {
      id: Crypto.randomUUID(),
      title: trimmed,
      order: skills.length,
      source: "custom",
      whyItMatters: "You added this to personalize your learning path.",
      videoResource: {
        title: "Find a tutorial",
        url: "https://www.youtube.com/watch?v=example",
      },
      readingResource: {
        title: `${trimmed} guide`,
        content: `## ${trimmed}\n\nYou added this skill to personalize your path.\n\n## What to focus on\n\n- Break the skill into one small concept.\n- Practice for 15-20 minutes.\n- Note what feels difficult and repeat tomorrow.\n\n## Keep it simple\n\nProgress comes from consistent short sessions, not long study marathons.`,
      },
      practiceTask: {
        title: "Practice",
        description: `Spend 20 minutes practicing ${trimmed.toLowerCase()}.`,
      },
      completion: {
        videoCompleted: false,
        readingCompleted: false,
        practiceCompleted: false,
      },
    };

    setSkills([...skills, newSkill]);
    setCustomTitle("");
    setShowAddSkill(false);
  }

  function handleCreatePath() {
    if (skills.length === 0) {
      setError("Add at least one skill to continue.");
      return;
    }

    setError(null);
    router.push("/onboarding/generating-content");
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <SkillPathHeader rightIcon="settings" />
      <ScreenScrollView
        className="flex-1 px-margin-mobile"
        hasFixedFooter
      >
        <View className="mt-4 mb-stack-lg">
          <Text className="text-[28px] font-bold text-on-surface mb-2">
            Review your skills
          </Text>
          <Text className="text-base text-on-surface-variant mb-2">
            Remove anything you don&apos;t need. We&apos;ll build full lessons
            after you confirm.
          </Text>
          <View className="flex-row items-center gap-2 px-3 py-1 bg-secondary-container rounded-full self-start">
            <MaterialIcons name="emoji-events" size={16} color="#00714d" />
            <Text className="text-sm font-semibold text-on-secondary-container">
              Goal: {goal.trim()}
            </Text>
          </View>
        </View>

        <View className="gap-gutter">
          {skills.map((skill) => (
            <View
              key={skill.id}
              className="flex-row items-center justify-between p-stack-md bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-bloom"
            >
              <View className="flex-row items-center gap-3 flex-1">
                <View className="w-10 h-10 rounded-full bg-primary-container items-center justify-center">
                  <MaterialIcons name="check-circle" size={22} color="#f8f7ff" />
                </View>
                <View className="flex-1">
                  <Text className="text-lg text-on-surface">{skill.title}</Text>
                  <Text className="text-sm text-on-surface-variant mt-0.5">
                    {skill.whyItMatters}
                  </Text>
                </View>
              </View>
              <Pressable
                onPress={() => removeSkill(skill.id)}
                className="p-2 active:opacity-70"
              >
                <MaterialIcons name="close" size={22} color="#727687" />
              </Pressable>
            </View>
          ))}

          <Pressable
            onPress={() => setShowAddSkill(true)}
            className="w-full flex-row items-center justify-center gap-2 p-stack-md border-2 border-dashed border-outline-variant/50 rounded-2xl active:opacity-80"
          >
            <MaterialIcons name="add" size={22} color="#0050cb" />
            <Text className="text-sm font-semibold text-primary">
              Add Custom Skill
            </Text>
          </Pressable>
        </View>

        <View className="mt-stack-lg p-stack-md bg-surface-container-low rounded-lg flex-row items-center gap-stack-md">
          <View className="w-16 h-16 rounded-full bg-primary/10 items-center justify-center">
            <Text className="text-sm font-semibold text-on-surface">
              {skills.length}
            </Text>
          </View>
          <View>
            <Text className="text-sm text-on-surface-variant">
              Skills in your path
            </Text>
            <Text className="text-2xl font-semibold text-on-surface">
              {skills.length} essential skills
            </Text>
          </View>
        </View>

        {error ? <Text className="text-error mt-4">{error}</Text> : null}
      </ScreenScrollView>

      <ScreenFooter>
        <PrimaryButton
          label="Build My Lessons"
          icon="arrow-forward"
          onPress={handleCreatePath}
        />
      </ScreenFooter>

      <Modal visible={showAddSkill} transparent animationType="fade">
        <View className="flex-1 bg-black/40 justify-center px-margin-mobile">
          <View className="bg-surface-container-lowest rounded-2xl p-stack-md">
            <Text className="text-xl font-semibold text-on-surface mb-2">
              Add custom skill
            </Text>
            <TextInput
              value={customTitle}
              onChangeText={setCustomTitle}
              placeholder="Skill title"
              placeholderTextColor="rgba(66, 70, 86, 0.4)"
              className="bg-surface-container-low rounded-lg px-4 py-3 text-base text-on-surface mb-4"
            />
            <View className="flex-row gap-3">
              <Pressable
                onPress={() => setShowAddSkill(false)}
                className="flex-1 py-3 items-center rounded-full bg-surface-container-low"
              >
                <Text className="font-semibold text-on-surface-variant">
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                onPress={handleAddCustomSkill}
                className="flex-1 py-3 items-center rounded-full bg-primary"
              >
                <Text className="font-semibold text-on-primary">Add</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
