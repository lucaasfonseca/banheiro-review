import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { useReviews } from "../../context/ReviewContext";
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
              <Text>{item.comment}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
