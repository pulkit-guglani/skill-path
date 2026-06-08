import { useState } from "react";
import { View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

interface YoutubePlayerEmbedProps {
  videoId: string;
}

export function YoutubePlayerEmbed({ videoId }: YoutubePlayerEmbedProps) {
  const [containerWidth, setContainerWidth] = useState(0);

  const playerHeight = containerWidth > 0 ? (containerWidth * 9) / 16 : 0;

  return (
    <View
      className="w-full rounded-xl overflow-hidden bg-black mb-stack-md"
      onLayout={(event) => {
        setContainerWidth(event.nativeEvent.layout.width);
      }}
    >
      {containerWidth > 0 ? (
        <YoutubePlayer
          height={playerHeight}
          width={containerWidth}
          videoId={videoId}
          webViewProps={{
            allowsInlineMediaPlayback: true,
          }}
        />
      ) : null}
    </View>
  );
}
