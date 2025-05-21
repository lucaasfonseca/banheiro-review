import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

import { useReviews } from "../context/ReviewContext";
import { RootStackParamList } from "../types/navigation";

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "ReviewDetail"
>;

export default function ReviewDetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "ReviewDetail">>();
  const navigation = useNavigation<NavigationProps>();
  const { deleteReview } = useReviews();

  const { review } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {review.imageUri && (
        <Image source={{ uri: review.imageUri }} style={styles.image} />
      )}

      <Text style={styles.title}>{review.placeName}</Text>
      <Text style={styles.rating}>{review.rating} ⭐</Text>
      <Text style={styles.comment}>{review.comment}</Text>

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

      {review.location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: review.location.latitude,
            longitude: review.location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: review.location.latitude,
              longitude: review.location.longitude,
            }}
            title={review.placeName}
            description={review.comment}
          />
        </MapView>
      )}

      <View style={{ flexDirection: "row", gap: 12, marginTop: 24 }}>
        <Button
          title="Editar"
          onPress={() => navigation.navigate("AddReview", { review })}
        />
        <Button
          title="Excluir"
          color="red"
          onPress={() => {
            Alert.alert("Confirmar", "Deseja excluir esta avaliação?", [
              { text: "Cancelar", style: "cancel" },
              {
                text: "Excluir",
                style: "destructive",
                onPress: () => {
                  deleteReview(review.id);
                  navigation.goBack();
                },
              },
            ]);
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: "center" },
  image: { width: "100%", height: 220, borderRadius: 12, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: "bold", marginTop: 8 },
  rating: { fontSize: 18, marginVertical: 4 },
  comment: { fontSize: 16, marginBottom: 12, textAlign: "center" },
  tagsBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  positiveTag: {
    backgroundColor: "#d4edda",
    color: "#155724",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    fontSize: 13,
  },
  negativeTag: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    fontSize: 13,
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 16,
  },
});
