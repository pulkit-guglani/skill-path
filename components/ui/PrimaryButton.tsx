import { MaterialIcons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  type PressableProps,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface PrimaryButtonProps extends PressableProps {
  label: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  loading?: boolean;
  variant?: "pill" | "rounded";
}

export function PrimaryButton({
  label,
  icon,
  loading = false,
  variant = "pill",
  disabled,
  className,
  ...props
}: PrimaryButtonProps & { className?: string }) {
  const isDisabled = disabled || loading;
  const radius = variant === "pill" ? "rounded-full" : "rounded-2xl";

  return (
    <Pressable
      disabled={isDisabled}
      className={`w-full h-14 bg-primary flex-row items-center justify-center gap-2 shadow-bloom active:opacity-90 ${radius} ${
        isDisabled ? "opacity-50" : ""
      } ${className ?? ""}`}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <>
          <Text className="text-on-primary font-semibold text-base">{label}</Text>
          {icon ? (
            <MaterialIcons name={icon} size={20} color="#ffffff" />
          ) : null}
        </>
      )}
    </Pressable>
  );
}

const FOOTER_BOTTOM_PADDING = 36;

export function BottomCtaBar({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="w-full px-margin-mobile pt-4 bg-background border-t border-outline-variant/10"
      style={{
        paddingBottom: Math.max(insets.bottom + 12, FOOTER_BOTTOM_PADDING),
      }}
    >
      <View className="w-full max-w-xl mx-auto">{children}</View>
    </View>
  );
}
