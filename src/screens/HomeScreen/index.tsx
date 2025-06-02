import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
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
import CommentCard from "../../components/CommentCard";
import ReviewCard from "../../components/ReviewCard";
import { useAuth } from "../../context/AuthContext";
import { toggleLike, useReviews } from "../../context/ReviewContext";
import { db } from "../../services/firebase";
import { RootStackParamList } from "../../types/navigation";
import { styles } from "./styles";

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { reviews } = useReviews();
  const { user, loading } = useAuth();
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [search, setSearch] = useState("");
  const [latestComments, setLatestComments] = useState<Record<string, any[]>>(
    {}
  );
  const [newComments, setNewComments] = useState<Record<string, string>>({});

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão negada", "Localização não autorizada.");
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
        orderBy("createdAt", "desc"),
        limit(2)
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

  const handleAddComment = async (reviewId: string) => {
    const text = newComments[reviewId]?.trim();
    if (!text || !user) return;

    try {
      await addDoc(collection(db, "reviews", reviewId, "comments"), {
        text,
        createdAt: new Date(),
        createdBy: user.displayName || "Usuário",
        userId: user.uid,
        likedBy: [],
        avatarUrl: user.photoURL || null,
      });
      setNewComments((prev) => ({ ...prev, [reviewId]: "" }));
    } catch (error) {
      Alert.alert("Erro", "Não foi possível adicionar o comentário.");
    }
  };

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
        <Text style={styles.empty}>Você precisa estar logado para ver o feed.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Banheiro Review 🚽</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            source={{ uri: user.photoURL || undefined }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

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
        contentContainerStyle={styles.reviewList}
        renderItem={({ item }) => {
          const distanceText = getDistanceText(item.location);
          const alreadyLiked = !!item.likedBy?.includes(user.uid);
          const comments = latestComments[item.id] || [];

          return (
            <View style={styles.cardWrapper}>
              <ReviewCard
                review={item}
                distance={distanceText}
                liked={alreadyLiked}
                showLike
                onLikeToggle={() =>
                  toggleLike(item.id, user.uid, alreadyLiked)
                }
                onPress={() =>
                  navigation.navigate("ReviewDetail", { review: item })
                }
              />

              {comments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  reviewId={item.id}
                  showReplies={false}
                  currentUserId={user.uid}
                />
              ))}

              <View style={styles.commentInputBox}>
                <TextInput
                  placeholder="Escreva um comentário..."
                  value={newComments[item.id] || ""}
                  onChangeText={(text) =>
                    setNewComments((prev) => ({
                      ...prev,
                      [item.id]: text,
                    }))
                  }
                  style={styles.commentInput}
                />
                <TouchableOpacity onPress={() => handleAddComment(item.id)}>
                  <Text style={styles.commentSend}>Enviar</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma avaliação encontrada.</Text>}
      />

      <View style={styles.bottomLinks}>
        <TouchableOpacity onPress={() => navigation.navigate("Map")}>
          <Text style={styles.link}>Mapa 🗺️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Favorites")}>
          <Text style={styles.link}>Favoritos ❤️</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("AddReview", {})}
      >
        <Text style={styles.floatingButtonText}>＋ Avaliação</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
