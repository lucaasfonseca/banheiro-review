import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Review } from "../../context/ReviewContext";
import { styles } from "./styles";

type Props = {
  review: Review;
  onPress: () => void;
  onLikeToggle?: () => void;
  liked?: boolean;
  showLike?: boolean;
  distance?: string | null;
};

export default function ReviewCard({
  review,
  onPress,
  onLikeToggle,
  liked,
  showLike = false,
  distance,
}: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.reviewBox}>
        {review.imageUri && (
          <Image source={{ uri: review.imageUri }} style={styles.image} />
        )}
        <Text style={styles.title}>
          {review.placeName} — {review.rating}⭐
        </Text>
        {review.address && <Text style={styles.address}>{review.address}</Text>}
        {distance && <Text style={styles.distance}>Distância: {distance}</Text>}
        <Text>{review.comment}</Text>

        <View style={styles.tagsBox}>
          {review.positives.map((tag) => (
            <Text key={tag} style={styles.positiveTag}>
              + {tag}
            </Text>
          ))}
          {review.negatives.map((tag) => (
            <Text key={tag} style={styles.negativeTag}>
              − {tag}
            </Text>
          ))}
        </View>

        {showLike && onLikeToggle && (
          <TouchableOpacity onPress={onLikeToggle} style={{ marginTop: 8 }}>
            <Text style={{ color: liked ? "red" : "gray", fontSize: 14 }}>
              {liked ? "❤️ Curtido" : "🤍 Curtir"} (
              {review.likedBy?.length || 0})
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}
