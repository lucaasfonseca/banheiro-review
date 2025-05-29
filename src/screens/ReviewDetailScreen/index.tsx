import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

import { useReviews } from "../../context/ReviewContext";
import { RootStackParamList } from "../../types/navigation";
import { styles } from "./styles";

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "ReviewDetail"
>;

export default function ReviewDetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "ReviewDetail">>();
  const navigation = useNavigation<NavigationProps>();
  const { deleteReview } = useReviews();
  const { height } = useWindowDimensions();

  const { review } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[styles.container, { minHeight: height }]}
      >
        {review.imageUri && (
          <Image source={{ uri: review.imageUri }} style={styles.image} />
        )}

        <View style={styles.card}>
          <Text style={styles.title}>{review.placeName}</Text>
          <Text style={styles.rating}>{review.rating} ⭐</Text>
          {review.address && (
            <Text style={styles.address}>{review.address}</Text>
          )}
          <Text style={styles.comment}>{review.comment}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Pontos Positivos</Text>
          <View style={styles.tagsBox}>
            {review.positives.map((tag) => (
              <Text key={tag} style={styles.positiveTag}>
                + {tag}
              </Text>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Pontos Negativos</Text>
          <View style={styles.tagsBox}>
            {review.negatives.map((tag) => (
              <Text key={tag} style={styles.negativeTag}>
                − {tag}
              </Text>
            ))}
          </View>
        </View>

        {review.location && (
          <View style={styles.mapCard}>
            <Text style={styles.sectionTitle}>Localização</Text>
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
          </View>
        )}

        <View style={styles.buttonsBox}>
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={() => navigation.navigate("AddReview", { review })}
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() =>
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
              ])
            }
          >
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
