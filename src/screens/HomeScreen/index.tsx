import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import haversine from "haversine";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CommentBox from "../../components/CommentBox";
import ReviewCard from "../../components/ReviewCard";
import { useAuth } from "../../context/AuthContext";
import { toggleLike, useReviews } from "../../context/ReviewContext";
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
  const [latestComments, setLatestComments] = useState<Record<string, any[]>>(
    {}
  );
  const [openComments, setOpenComments] = useState<string | null>(null);

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

  useEffect(() => {
    const unsubscribes: (() => void)[] = [];

    reviews.forEach((review) => {
      const q = query(
        collection(db, "reviews", review.id, "comments"),
        orderBy("createdAt", "asc")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const comments = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLatestComments((prev) => ({ ...prev, [review.id]: comments }));
      });

      unsubscribes.push(unsubscribe);
    });

    return () => unsubscribes.forEach((fn) => fn());
  }, [reviews]);

  const getDistanceText = (
    reviewLocation?: { latitude: number; longitude: number } | null
  ): string | undefined => {
    if (!reviewLocation || !currentLocation) return undefined;
    const distance = haversine(currentLocation, reviewLocation, {
      unit: "meter",
    });

    return distance < 1000
      ? `${distance.toFixed(0)} m`
      : `${(distance / 1000).toFixed(2)} km`;
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
              const comments = latestComments[item.id] || [];

              return (
                <View style={styles.reviewBox}>
                  <ReviewCard
                    review={item}
                    distance={distanceText}
                    liked={alreadyLiked}
                    showLike
                    commentsCount={comments.length}
                    onLikeToggle={() =>
                      toggleLike(item.id, user.uid, alreadyLiked)
                    }
                    onPress={() =>
                      navigation.navigate("ReviewDetail", { review: item })
                    }
                    onCommentPress={() =>
                      setOpenComments((prev) =>
                        prev === item.id ? null : item.id
                      )
                    }
                  />

                  {openComments === item.id && (
                    <CommentBox reviewId={item.id} comments={comments} />
                  )}
                </View>
              );
            }}
            ListEmptyComponent={
              <Text style={styles.empty}>Nenhuma avaliação encontrada.</Text>
            }
          />

          <View style={{ flexDirection: "row", gap: 16, marginTop: 12 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Map")}>
              <Text style={{ color: "#4CAF50" }}>Mapa 🗺️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Favorites")}>
              <Text style={{ color: "#4CAF50" }}>Favoritos ❤️</Text>
            </TouchableOpacity>
          </View>

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
