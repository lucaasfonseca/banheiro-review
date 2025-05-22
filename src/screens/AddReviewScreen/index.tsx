import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import * as Crypto from "expo-crypto";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Review, useReviews } from "../../context/ReviewContext";
import { RootStackParamList } from "../../types/navigation";
import { styles } from "./styles";
import RatingStars from "../../components/RatingStars";
import TagSelector from "../../components/TagSelector";

export default function AddReviewScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "AddReview">>();
  const editingReview = route.params?.review;
  const { addReview, updateReview } = useReviews();

  const [placeName, setPlaceName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(3);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [positives, setPositives] = useState<string[]>([]);
  const [negatives, setNegatives] = useState<string[]>([]);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [address, setAddress] = useState<string | undefined>(undefined);

  const positiveTags = ["Limpo", "Privado", "Acessível", "Tem papel"];
  const negativeTags = ["Cheiro ruim", "Sujo", "Sem papel", "Barulhento"];

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
      if (status !== "granted") return;

      const loc = await Location.getCurrentPositionAsync({});
      const coords = { latitude: loc.coords.latitude, longitude: loc.coords.longitude };
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
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
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
      location: location ?? undefined,
      address,
    };

    editingReview ? updateReview(reviewToSave) : addReview(reviewToSave);
    Alert.alert("Sucesso", "Avaliação salva com sucesso!");
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>🧻 Avalie o Banheiro</Text>


          <TouchableOpacity style={styles.imageContainer} onPress={handlePickImage}>
            {imageUri ? (
              <>
                <Image source={{ uri: imageUri }} style={styles.image} />
                <Icon name="edit-2" size={18} style={styles.editIcon} />
              </>
            ) : (
              <Text style={styles.imagePlaceholder}>Selecionar Imagem</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.label}>Nome do Local</Text>
          <TextInput
            placeholder="Nome do Local"
            style={styles.input}
            value={placeName}
            onChangeText={setPlaceName}
          />

          <Text style={styles.label}>Comentário</Text>
          <TextInput
            placeholder="Escreva um comentário..."
            style={[styles.input, { height: 90 }]}
            value={comment}
            onChangeText={setComment}
            multiline
          />

          <Text style={styles.label}>Nota</Text>
          <RatingStars rating={rating} onChange={setRating} />

          <TagSelector
            title="Pontos Positivos"
            availableTags={positiveTags}
            selectedTags={positives}
            onChange={setPositives}
            allowCustom={true}
            type="positive"

          />

          <TagSelector
            title="Pontos Negativos"
            availableTags={negativeTags}
            selectedTags={negatives}
            onChange={setNegatives}
            allowCustom={true}
            type="negative"

          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Enviar Avaliação</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
