import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, SafeAreaView, Text } from "react-native";
import ReviewCard from "../../components/ReviewCard";
import { useAuth } from "../../context/AuthContext";
import { toggleLike, useReviews } from "../../context/ReviewContext";
import { RootStackParamList } from "../../types/navigation";
import { styles } from "./styles";

type NavigationProps = NavigationProp<RootStackParamList>;

export default function FavoritesScreen() {
  const navigation = useNavigation<NavigationProps>();
  const { reviews } = useReviews();
  const { user } = useAuth();

  if (!user?.uid) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.empty}>
          Você precisa estar logado para ver os favoritos.
        </Text>
      </SafeAreaView>
    );
  }

  const favoriteReviews = reviews.filter((r) => r.likedBy?.includes(user.uid));

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favoriteReviews}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma avaliação favoritada.</Text>
        }
        renderItem={({ item }) => {
          const alreadyLiked = !!item.likedBy?.includes(user.uid);

          return (
            <ReviewCard
              review={item}
              liked={alreadyLiked}
              showLike
              onLikeToggle={() => toggleLike(item.id, user.uid, alreadyLiked)}
              onPress={() =>
                navigation.navigate("ReviewDetail", { review: item })
              }
            />
          );
        }}
      />
    </SafeAreaView>
  );
}
