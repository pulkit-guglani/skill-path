import { ScrollView, type ScrollViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CONTENT_PADDING = 24;

interface ScreenScrollViewProps extends ScrollViewProps {
  /** When a fixed footer sits below the scroll area (ScreenFooter / BottomCtaBar). */
  hasFixedFooter?: boolean;
}

export function ScreenScrollView({
  hasFixedFooter = false,
  contentContainerStyle,
  ...props
}: ScreenScrollViewProps) {
  const insets = useSafeAreaInsets();
  const paddingBottom = hasFixedFooter
    ? CONTENT_PADDING
    : Math.max(insets.bottom, CONTENT_PADDING);

  return (
    <ScrollView
      {...props}
      contentContainerStyle={[contentContainerStyle, { paddingBottom }]}
    />
  );
}
