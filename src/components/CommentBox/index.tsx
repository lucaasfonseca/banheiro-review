import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../services/firebase";
import CommentCard from "../CommentCard";
import { styles } from "./styles";

type Comment = {
  id: string;
  text: string;
  createdBy: string;
  createdAt: any;
  likedBy: string[];
  avatarUrl?: string;
  replies?: Comment[];
};

type Props = {
  reviewId: string;
  comments: Comment[];
};

export default function CommentBox({ reviewId, comments }: Props) {
  const { user } = useAuth();
  const [text, setText] = useState("");

  const handleSend = async () => {
    const content = text.trim();
    if (!content || !user) return;

    await addDoc(collection(db, "reviews", reviewId, "comments"), {
      text: content,
      createdAt: new Date(),
      createdBy: user.displayName || "Usuário",
      userId: user.uid,
      likedBy: [],
      avatarUrl: user.photoURL || null,
    });

    setText("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CommentCard
            comment={item}
            reviewId={reviewId}
            showReplies
            currentUserId={user?.uid}
          />
        )}
        scrollEnabled={false}
        contentContainerStyle={{ gap: 12 }}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Escreva um comentário..."
          value={text}
          onChangeText={setText}
          multiline
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
