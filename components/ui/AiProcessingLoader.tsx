import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const PRIMARY = "#0050cb";
const GLOW_BLUE = "#6b9fff";

export function AiProcessingLoader() {
  const breath = useSharedValue(0);

  useEffect(() => {
    breath.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [breath]);

  const glowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(breath.value, [0, 1], [0.9, 1.1]) }],
    opacity: interpolate(breath.value, [0, 1], [0.3, 0.6]),
    backgroundColor: GLOW_BLUE,
  }));

  return (
    <View className="w-48 h-48 items-center justify-center mb-stack-lg">
      <Animated.View
        className="absolute w-40 h-40 rounded-full"
        style={glowStyle}
      />
      <View className="w-14 h-14 rounded-full bg-background items-center justify-center">
        <MaterialIcons name="auto-awesome" size={32} color={PRIMARY} />
      </View>
    </View>
  );
};
