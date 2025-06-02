import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Review } from "../../context/ReviewContext";
import { styles } from "./styles";

type Props = {
  review: Review;
  distance?: string;
  liked: boolean;
  showLike?: boolean;
  onLikeToggle: () => void;
  onPress: () => void;
  commentsCount?: number;
  onCommentPress?: () => void;
};

export default function ReviewCard({
  review,
  onPress,
  onLikeToggle,
  liked,
  showLike = false,
  distance,
  commentsCount = 0,
  onCommentPress,
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

        <Text style={styles.commentText}>{review.comment}</Text>

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

        {showLike && (
          <View style={styles.actions}>
            <TouchableOpacity onPress={onLikeToggle}>
              <Text style={[styles.like, liked && styles.liked]}>
                {liked ? "❤️ Curtido" : "🤍 Curtir"} (
                {review.likedBy?.length || 0})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onCommentPress}>
              <Text style={styles.comment}>
                💬 {commentsCount} comentário{commentsCount !== 1 && "s"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
