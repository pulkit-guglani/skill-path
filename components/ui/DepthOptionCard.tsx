import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import type { LearningDepth } from "@/context/onboarding-context";

interface DepthOption {
  id: LearningDepth;
  title: string;
  description: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  iconBg: string;
  iconColor: string;
}

const OPTIONS: DepthOption[] = [
  {
    id: "casual",
    title: "Casual",
    description: "Just enough to achieve my goal",
    icon: "rocket-launch",
    iconBg: "bg-secondary-container",
    iconColor: "#00714d",
  },
  {
    id: "intermediate",
    title: "Intermediate",
    description: "I want solid proficiency",
    icon: "school",
    iconBg: "bg-primary-fixed-dim",
    iconColor: "#001849",
  },
  {
    id: "dedicated",
    title: "Dedicated",
    description: "I want to go deeper",
    icon: "local-fire-department",
    iconBg: "bg-tertiary-fixed",
    iconColor: "#2a1700",
  },
];

interface DepthOptionCardProps {
  selected: LearningDepth;
  onSelect: (depth: LearningDepth) => void;
}

export function DepthOptionList({ selected, onSelect }: DepthOptionCardProps) {
  return (
    <View className="w-full gap-gutter">
      {OPTIONS.map((option) => {
        const isSelected = selected === option.id;
        return (
          <Pressable
            key={option.id}
            onPress={() => onSelect(option.id)}
            className={`w-full flex-row items-center gap-stack-md p-stack-md rounded-lg bg-surface-container-lowest shadow-bloom border-2 ${
              isSelected ? "border-primary-container" : "border-transparent"
            } active:opacity-90`}
          >
            <View
              className={`w-14 h-14 rounded-full items-center justify-center ${option.iconBg}`}
            >
              <MaterialIcons
                name={option.icon}
                size={28}
                color={option.iconColor}
              />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-on-surface">
                {option.title}
              </Text>
              <Text className="text-base text-on-surface-variant">
                {option.description}
              </Text>
            </View>
            {isSelected ? (
              <MaterialIcons name="check-circle" size={24} color="#0050cb" />
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}
