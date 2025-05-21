import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  availableTags: string[];
  selectedTags: string[];
  onChange: (tags: string[]) => void;
};

export default function TagSelector({
  title,
  availableTags,
  selectedTags,
  onChange,
}: Props) {
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter((t) => t !== tag));
    } else {
      onChange([...selectedTags, tag]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.tagsContainer}>
        {availableTags.map((tag) => (
          <Pressable
            key={tag}
            onPress={() => toggleTag(tag)}
            style={[
              styles.tag,
              selectedTags.includes(tag) && styles.selectedTag,
            ]}
          >
            <Text>{tag}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 12 },
  title: { fontWeight: "bold", marginBottom: 8 },
  tagsContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: {
    backgroundColor: "#eee",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  selectedTag: {
    backgroundColor: "#cce5ff",
  },
});
