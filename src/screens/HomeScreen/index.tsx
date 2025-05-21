import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import haversine from "haversine";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useReviews } from "../../context/ReviewContext";
import { RootStackParamList } from "../../types/navigation";
import { styles } from "./styles";

type NavigationProps = NavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProps>();
  const { reviews } = useReviews();
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObjectCoords | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão negada",
          "Não foi possível obter sua localização."
        );
        return;
      }

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

    return distance < 1000
      ? `${distance.toFixed(0)} m`
      : `${(distance / 1000).toFixed(2)} km`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        initialNumToRender={5}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => {
          const distanceText = getDistanceText(item.location);
          return (
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

                {distanceText && (
                  <Text style={styles.distance}>Distância: {distanceText}</Text>
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
          );
        }}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma avaliação ainda.</Text>
        }
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("AddReview", {})}
      >
        <Text style={styles.floatingButtonText}>Adicionar Avaliação</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
