import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import { styles, labelColors } from "./styles";

type Props = {
  rating: number;
  onChange: (value: number) => void;
};

const ratingLabels = ["Péssimo", "Ruim", "Ok", "Bom", "Ótimo"];

export default function RatingStars({ rating, onChange }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Pressable key={i} onPress={() => onChange(i)}>
            <Animated.Text
              entering={ZoomIn.duration(150)}
              exiting={ZoomOut.duration(150)}
              style={[
                styles.star,
                { color: i <= rating ? "#FFD700" : "#ccc" },
              ]}
            >
              {i <= rating ? "⭐" : "☆"}
            </Animated.Text>
          </Pressable>
        ))}
      </View>
      <Text
        style={[
          styles.label,
          { color: labelColors[rating - 1] || "#888" },
        ]}
      >
        {ratingLabels[rating - 1] || "Sem nota"}
      </Text>
    </View>
  );
}
