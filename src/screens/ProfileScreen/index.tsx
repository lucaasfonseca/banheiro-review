import * as ImagePicker from "expo-image-picker";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../services/firebase";
import { uploadImageAsync } from "../../utils/uploadImage";
import { styles } from "./styles";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          if (data?.photoURL) setImageUrl(data.photoURL);
        }
      }
    };
    fetchImage();
  }, [user]);

  const pickAndUploadImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permissão negada",
        "Você precisa permitir o acesso às fotos."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.length) {
      const uri = result.assets[0].uri;
      if (user) {
        try {
          const url = await uploadImageAsync(uri, user.uid);
          setImageUrl(url);
          Alert.alert("Sucesso", "Foto atualizada com sucesso!");
        } catch (err) {
          Alert.alert("Erro", "Falha ao enviar imagem.");
        }
      }
    }
  };

  if (!user) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Meu Perfil</Text>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>Sem foto</Text>
        </View>
      )}
      <Text style={styles.label}>Email: {user.email}</Text>

      <TouchableOpacity style={styles.button} onPress={pickAndUploadImage}>
        <Text style={styles.buttonText}>Alterar Foto</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
