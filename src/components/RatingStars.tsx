// src/components/RatingStars.tsx
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  rating: number;
  onChange: (value: number) => void;
};

export default function RatingStars({ rating, onChange }: Props) {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Pressable key={i} onPress={() => onChange(i)}>
          <Text style={styles.star}>{i <= rating ? "⭐" : "☆"}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", marginVertical: 8 },
  star: { fontSize: 28, marginRight: 4 },
});
