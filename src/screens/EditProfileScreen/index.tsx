import * as ImagePicker from "expo-image-picker";
import { updateProfile } from "firebase/auth";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { uploadImageAsync } from "../../utils/uploadImage";
import { styles } from "./styles";

export default function EditProfileScreen() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoURL || "");
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
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
      quality: 0.5,
    });

    if (!result.canceled && result.assets?.length) {
      const uri = result.assets[0].uri;
      setUploading(true);

      try {
        const url = await uploadImageAsync(uri, user!.uid);
        setPhotoUrl(url);
        Alert.alert("Sucesso", "Imagem atualizada!");
      } catch {
        Alert.alert("Erro", "Falha ao enviar imagem.");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSave = async () => {
    if (!user) return;
    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photoUrl,
      });
      updateUser(user); // passando o 'user' atual

      Alert.alert("Sucesso", "Perfil atualizado!");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao atualizar perfil.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      <TouchableOpacity onPress={pickImage}>
        {uploading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Image
            source={
              photoUrl
                ? { uri: photoUrl }
                : require("../../assets/avatar-placeholder.png")
            }
            style={styles.avatar}
          />
        )}
        <Text style={styles.editPhoto}>Alterar foto</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}
