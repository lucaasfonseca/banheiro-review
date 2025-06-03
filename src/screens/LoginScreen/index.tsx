import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { signInWithEmailAndPassword } from "firebase/auth";
import { MotiView } from "moti";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { auth } from "../../services/firebase";
import { RootStackParamList } from "../../types/navigation";
import { styles } from "./styles";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProps>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doorOpen, setDoorOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDoorOpen(true);
    }, 800); // atraso antes de abrir

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      Alert.alert("Erro", err.message || "Falha ao fazer login.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <MotiView
        from={{
          rotateY: "0deg",
          opacity: 1,
        }}
        animate={{
          rotateY: doorOpen ? "90deg" : "0deg",
          opacity: doorOpen ? 0 : 1,
        }}
        transition={{
          type: "timing",
          duration: 1200,
        }}
        style={styles.doorContainer}
      >
        <Image
          source={require("../../../assets/door.png")}
          style={styles.doorImage}
          resizeMode="contain"
        />
      </MotiView>

      <Text style={styles.title}>Bem-vindo ao Banheiro Review 🚽</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        style={styles.input}
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={styles.registerButton}
      >
        <Text style={styles.registerText}>Ainda não tem conta? Registrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
