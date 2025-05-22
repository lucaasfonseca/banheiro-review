import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { styles, tagThemes } from "./styles";

type Props = {
  title: string;
  availableTags: string[];
  selectedTags: string[];
  onChange: (tags: string[]) => void;
  allowCustom?: boolean;
  type?: "positive" | "negative";
};

export default function TagSelector({
  title,
  availableTags,
  selectedTags,
  onChange,
  allowCustom = false,
  type = "positive",
}: Props) {
  const [customTag, setCustomTag] = useState("");
  const [adding, setAdding] = useState(false);
  const theme = tagThemes[type];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter((t) => t !== tag));
    } else {
      onChange([...selectedTags, tag]);
    }
  };

  const handleAddCustomTag = () => {
    const trimmed = customTag.trim();
    if (trimmed && !selectedTags.includes(trimmed)) {
      onChange([...selectedTags, trimmed]);
    }
    setCustomTag("");
    setAdding(false);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {allowCustom && !adding && (
          <TouchableOpacity onPress={() => setAdding(true)}>
            <Icon name="plus-circle" size={20} color={theme.icon} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.tagsContainer}>
        {availableTags.map((tag) => (
          <TouchableOpacity
            key={tag}
            style={[
              styles.tag,
              theme.tag,
              selectedTags.includes(tag) && theme.tagSelected,
            ]}
            onPress={() => toggleTag(tag)}
          >
            <Text
              style={[
                styles.tagText,
                theme.tagText,
                selectedTags.includes(tag) && theme.tagTextSelected,
              ]}
            >
              {tag}
            </Text>
          </TouchableOpacity>
        ))}

        {selectedTags
          .filter((tag) => !availableTags.includes(tag))
          .map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[
                styles.tag,
                theme.tagCustom,
                selectedTags.includes(tag) && theme.tagSelected,
              ]}
              onPress={() => toggleTag(tag)}
            >
              <Text
                style={[
                  styles.tagText,
                  theme.tagText,
                  selectedTags.includes(tag) && theme.tagTextSelected,
                ]}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
      </View>

      {allowCustom && adding && (
        <View style={styles.customInputContainer}>
          <TextInput
            value={customTag}
            onChangeText={setCustomTag}
            placeholder="Nova tag"
            style={styles.input}
            placeholderTextColor="#888"
          />
          <TouchableOpacity onPress={handleAddCustomTag}>
            <Icon name="check-circle" size={22} color={theme.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAdding(false)} style={{ marginLeft: 8 }}>
            <Icon name="x-circle" size={22} color="#d32f2f" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}