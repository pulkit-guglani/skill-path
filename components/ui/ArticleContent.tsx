import { Text, View } from "react-native";

interface ArticleContentProps {
  content: string;
}

function renderBlock(block: string, index: number) {
  const trimmed = block.trim();
  if (!trimmed) {
    return null;
  }

  if (trimmed.startsWith("## ")) {
    return (
      <Text
        key={`heading-${index}`}
        className="text-xl font-semibold text-on-surface mt-4 mb-2"
      >
        {trimmed.slice(3).trim()}
      </Text>
    );
  }

  const lines = trimmed.split("\n");
  const isList = lines.every((line) => line.trim().startsWith("- "));

  if (isList) {
    return (
      <View key={`list-${index}`} className="gap-2 my-2">
        {lines.map((line, lineIndex) => (
          <View
            key={`list-item-${index}-${lineIndex}`}
            className="flex-row items-start gap-2"
          >
            <Text className="text-base text-on-surface-variant leading-relaxed">
              •
            </Text>
            <Text className="flex-1 text-base text-on-surface-variant leading-relaxed">
              {line.trim().slice(2).trim()}
            </Text>
          </View>
        ))}
      </View>
    );
  }

  return (
    <Text
      key={`paragraph-${index}`}
      className="text-base text-on-surface-variant leading-relaxed my-2"
    >
      {trimmed}
    </Text>
  );
}

export function ArticleContent({ content }: ArticleContentProps) {
  const blocks = content.split(/\n\n+/);

  return (
    <View className="p-stack-md bg-surface-container-low rounded-xl border border-outline-variant/30 mb-stack-md">
      {blocks.map((block, index) => renderBlock(block, index))}
    </View>
  );
}
