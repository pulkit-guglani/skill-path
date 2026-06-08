import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

interface SkillPathHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightIcon?: keyof typeof MaterialIcons.glyphMap;
  onRightPress?: () => void;
}

export function SkillPathHeader({
  title = "SkillPath",
  showBack = false,
  onBack,
  rightIcon,
  onRightPress,
}: SkillPathHeaderProps) {
  return (
    <View className="w-full flex-row items-center justify-between px-margin-mobile py-4 bg-background">
      <View className="flex-row items-center gap-2 flex-1">
        {showBack ? (
          <Pressable onPress={onBack} className="p-2 -ml-2 active:opacity-70">
            <MaterialIcons name="arrow-back" size={24} color="#0050cb" />
          </Pressable>
        ) : null}
        <Text className="text-2xl font-bold text-primary tracking-tight">
          {title}
        </Text>
      </View>
      {rightIcon ? (
        <Pressable onPress={onRightPress} className="p-2 active:opacity-70">
          <MaterialIcons name={rightIcon} size={24} color="#424656" />
        </Pressable>
      ) : (
        <View className="w-6" />
      )}
    </View>
  );
}
