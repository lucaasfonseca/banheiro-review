import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import * as Crypto from "expo-crypto";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";

import RatingStars from "../../components/RatingStars";
import TagSelector from "../../components/TagSelector";
import { Review, useReviews } from "../../context/ReviewContext";
import { RootStackParamList } from "../../types/navigation";
import { styles } from "./styles";

export default function AddReviewScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "AddReview">>();
  const navigation = useNavigation();
  const { addReview, updateReview } = useReviews();

  const editingReview: Review | undefined = route.params?.review;

  const [placeName, setPlaceName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(3);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [positives, setPositives] = useState<string[]>([]);
  const [negatives, setNegatives] = useState<string[]>([]);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [address, setAddress] = useState<string | undefined>(undefined);

  const positiveTags = ["Limpo", "Tem papel", "Privado", "Acessível"];
  const negativeTags = ["Cheiro ruim", "Sujo", "Barulhento", "Sem papel"];

  useEffect(() => {
    if (editingReview) {
      setPlaceName(editingReview.placeName);
      setComment(editingReview.comment);
      setRating(editingReview.rating);
      setImageUri(editingReview.imageUri || null);
      setPositives(editingReview.positives);
      setNegatives(editingReview.negatives);
      if (editingReview.location) {
        setLocation(editingReview.location);
        setAddress(editingReview.address);
      }
    }
  }, [editingReview]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão negada", "Localização não disponível.");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };
      setLocation(coords);

      try {
        const geo = await Location.reverseGeocodeAsync(coords);
        const addr = geo[0];
        if (addr) {
          const formatted = `${addr.name || addr.street || "Local"}, ${
            addr.district || addr.city || ""
          } - ${addr.region || ""}, ${addr.postalCode || ""}`;
          setAddress(formatted.trim());
        }
      } catch (error) {
        console.warn("Erro ao obter endereço:", error);
      }
    })();
  }, []);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!placeName || !comment) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    const reviewToSave: Review = {
      id: editingReview?.id || Crypto.randomUUID(),
      placeName,
      comment,
      rating,
      imageUri,
      positives,
      negatives,
      location: location
        ? {
            latitude: location.latitude,
            longitude: location.longitude,
          }
        : undefined,
      address,
    };

    if (editingReview) {
      updateReview(reviewToSave);
    } else {
      addReview(reviewToSave);
    }

    Alert.alert("Sucesso", "Avaliação salva!");
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text>Nome do lugar:</Text>
        <TextInput
          style={styles.input}
          value={placeName}
          onChangeText={setPlaceName}
        />

        <Text>Comentário:</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          value={comment}
          onChangeText={setComment}
          multiline
        />

        <Text>Nota:</Text>
        <RatingStars rating={rating} onChange={setRating} />

        <Button title="Escolher imagem" onPress={handlePickImage} />
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

        <TagSelector
          title="Pontos Positivos"
          availableTags={positiveTags}
          selectedTags={positives}
          onChange={setPositives}
        />

        <TagSelector
          title="Pontos Negativos"
          availableTags={negativeTags}
          selectedTags={negatives}
          onChange={setNegatives}
        />

        <Button title="Salvar Avaliação" onPress={handleSubmit} />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
