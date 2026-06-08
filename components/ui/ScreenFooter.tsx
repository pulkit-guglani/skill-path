import { View, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenFooterProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

const FOOTER_BOTTOM_PADDING = 36;

/** Fixed bottom bar that sits above the Android/iOS system navigation area. */
export function ScreenFooter({
  children,
  className = "",
  ...props
}: ScreenFooterProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={`border-t border-outline-variant/10 bg-background/90 px-margin-mobile pt-4 ${className}`}
      style={{
        paddingBottom: Math.max(insets.bottom + 12, FOOTER_BOTTOM_PADDING),
      }}
      {...props}
    >
      {children}
    </View>
  );
}
