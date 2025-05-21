import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";

import { auth } from "../../services/firebase";
import { RootStackParamList } from "../../types/navigation";
import { styles } from "./styles";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function RegisterScreen() {
  const navigation = useNavigation<NavigationProps>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Sucesso", "Usuário criado com sucesso!");
      navigation.goBack(); // Volta pra tela de login
    } catch (err: any) {
      Alert.alert("Erro", err.message || "Erro ao registrar.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Senha"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Registrar" onPress={handleRegister} />

      <Button
        title="Já tem conta? Entrar"
        onPress={() => navigation.goBack()}
        color="#888"
      />
    </View>
  );
}
