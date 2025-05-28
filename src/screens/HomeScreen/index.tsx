import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import haversine from "haversine";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { useReviews } from "../../context/ReviewContext";
import { db } from "../../services/firebase";
import { RootStackParamList } from "../../types/navigation";
import { styles } from "./styles";

type NavigationProps = NavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProps>();
  const { reviews } = useReviews();
  const { user, loading } = useAuth();
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [search, setSearch] = useState("");

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

  const toggleLike = async (reviewId: string, alreadyLiked: boolean) => {
    if (!user?.uid) return;

    const reviewRef = doc(db, "reviews", reviewId);

    await updateDoc(reviewRef, {
      likedBy: alreadyLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
    });
  };

  const sortedAndFilteredReviews = () => {
    if (!currentLocation) return [];

    const filtered = reviews.filter((r) =>
      r.placeName.toLowerCase().includes(search.toLowerCase())
    );

    return filtered.sort((a, b) => {
      const distA = haversine(currentLocation, a.location, { unit: "meter" });
      const distB = haversine(currentLocation, b.location, { unit: "meter" });
      return distA - distB;
    });
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.empty}>
          Você precisa estar logado para ver o feed.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {!currentLocation ? (
        <ActivityIndicator size="large" style={{ marginTop: 100 }} />
      ) : (
        <>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nome do local..."
            value={search}
            onChangeText={setSearch}
          />

          <FlatList
            data={sortedAndFilteredReviews()}
            keyExtractor={(item) => item.id}
            initialNumToRender={5}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item }) => {
              const distanceText = getDistanceText(item.location);
              const alreadyLiked = !!item.likedBy?.includes(user.uid);

              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ReviewDetail", { review: item })
                  }
                >
                  <View style={styles.reviewBox}>
                    {item.imageUri && (
                      <Image
                        source={{ uri: item.imageUri }}
                        style={styles.image}
                      />
                    )}

                    <Text style={styles.title}>
                      {item.placeName} — {item.rating}⭐
                    </Text>

                    {item.address && (
                      <Text style={styles.address}>{item.address}</Text>
                    )}

                    {distanceText && (
                      <Text style={styles.distance}>
                        Distância: {distanceText}
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

                    <TouchableOpacity
                      style={{ marginTop: 8 }}
                      onPress={() => toggleLike(item.id, alreadyLiked)}
                    >
                      <Text
                        style={{
                          color: alreadyLiked ? "red" : "gray",
                          fontSize: 14,
                        }}
                      >
                        {alreadyLiked ? "❤️ Curtido" : "🤍 Curtir"} (
                        {item.likedBy?.length || 0})
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={
              <Text style={styles.empty}>Nenhuma avaliação encontrada.</Text>
            }
          />

          <TouchableOpacity
            style={{ marginRight: 16 }}
            onPress={() => navigation.navigate("Favorites")}
          >
            <TouchableOpacity
              style={{ marginRight: 16 }}
              onPress={() => navigation.navigate("Map")}
            >
              <Text style={{ color: "#4CAF50" }}>Mapa 🗺️</Text>
            </TouchableOpacity>

            <Text style={{ color: "#4CAF50" }}>Favoritos ❤️</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => navigation.navigate("AddReview", {})}
          >
            <Text style={styles.floatingButtonText}>Adicionar Avaliação</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}
