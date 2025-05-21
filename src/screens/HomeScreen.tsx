import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import haversine from "haversine";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useReviews } from "../context/ReviewContext";
import { RootStackParamList } from "../types/navigation";

type NavigationProps = NavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProps>();
  const { reviews } = useReviews();
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObjectCoords | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const loc = await Location.getCurrentPositionAsync({});
      setCurrentLocation(loc.coords);
    })();
  }, []);

  const getDistanceText = (
    reviewLocation?: { latitude: number; longitude: number } | null
  ) => {
    if (!reviewLocation || !currentLocation) return null;

    const distance = haversine(currentLocation, reviewLocation, {
      unit: "meter",
    });

    if (distance < 1000) {
      return `${distance.toFixed(0)} m`;
    }

    return `${(distance / 1000).toFixed(2)} km`;
  };

  return (
    <View style={styles.container}>
      <Button
        title="Adicionar Avaliação"
        onPress={() => navigation.navigate("AddReview", {})}
      />
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ReviewDetail", { review: item })
            }
          >
            <View style={styles.reviewBox}>
              {item.imageUri && (
                <Image source={{ uri: item.imageUri }} style={styles.image} />
              )}

              <Text style={styles.title}>
                {item.placeName} — {item.rating}⭐
              </Text>

              {item.address && (
                <Text style={styles.address}>{item.address}</Text>
              )}

              {getDistanceText(item.location) && (
                <Text style={styles.distance}>
                  Distância: {getDistanceText(item.location)}
                </Text>
              )}

              <Text>{item.comment}</Text>

              <View style={styles.tagsBox}>
                {item.positives.map((tag) => (
                  <Text key={tag} style={styles.positiveTag}>
                    + {tag}
                  </Text>
                ))}
                {item.negatives.map((tag) => (
                  <Text key={tag} style={styles.negativeTag}>
                    − {tag}
                  </Text>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma avaliação ainda.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  reviewBox: {
    marginTop: 16,
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
  },
  title: { fontWeight: "bold", fontSize: 16, marginTop: 8 },
  address: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
    marginBottom: 2,
  },
  distance: {
    fontSize: 12,
    color: "#333",
    marginBottom: 4,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 8,
  },
  tagsBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  positiveTag: {
    backgroundColor: "#d4edda",
    color: "#155724",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
  },
  negativeTag: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
  },
  empty: { marginTop: 20, textAlign: "center", color: "#666" },
});
