import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { db } from "../../services/firebase";
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
  showReplies: boolean;
  comment: Comment;
  currentUserId?: string;
};

export default function CommentCard({
  comment,
  reviewId,
  showReplies,
  currentUserId,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [replying, setReplying] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState<Comment[]>([]);

  const isOwner = comment.createdBy === currentUserId;
  const alreadyLiked = currentUserId
    ? comment.likedBy?.includes(currentUserId)
    : false;

  const formattedTime = formatDistanceToNow(
    comment.createdAt instanceof Date
      ? comment.createdAt
      : comment.createdAt.toDate(),
    { locale: ptBR, addSuffix: true }
  );

  useEffect(() => {
    if (!showReplies) return;

    const fetchReplies = async () => {
      const snapshot = await getDocs(
        collection(db, "reviews", reviewId, "comments", comment.id, "replies")
      );
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Comment[];
      setReplies(data);
    };

    fetchReplies();
  }, [showReplies]);

  const handleReply = async () => {
    if (!replyText.trim() || !currentUserId) return;

    await addDoc(
      collection(db, "reviews", reviewId, "comments", comment.id, "replies"),
      {
        text: replyText.trim(),
        createdAt: new Date(),
        createdBy: "Você",
        userId: currentUserId,
        likedBy: [],
        avatarUrl: null,
      }
    );

    setReplyText("");
    setReplying(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            comment.avatarUrl ||
            "https://ui-avatars.com/api/?name=User&background=random",
        }}
        style={styles.avatar}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{comment.createdBy}</Text>
          <Text style={styles.time}>{formattedTime}</Text>
        </View>

        {editing ? (
          <>
            <TextInput
              value={editedText}
              onChangeText={setEditedText}
              style={styles.input}
              multiline
            />
            <View style={styles.editActions}>
              <TouchableOpacity onPress={() => setEditing(false)}>
                <Text style={styles.cancel}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEditing(false)}>
                <Text style={styles.save}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.text}>{comment.text}</Text>

            <View style={styles.actions}>
              <Text style={styles.like}>
                {alreadyLiked ? "❤️ Curtido" : "🤍 Curtir"} (
                {comment.likedBy?.length || 0})
              </Text>

              {showReplies && (
                <TouchableOpacity onPress={() => setReplying(true)}>
                  <Text style={styles.reply}>Responder</Text>
                </TouchableOpacity>
              )}

              {isOwner && (
                <>
                  <TouchableOpacity onPress={() => setEditing(true)}>
                    <Text style={styles.reply}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={[styles.reply, { color: "red" }]}>
                      Excluir
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            {replying && (
              <View style={{ marginTop: 8 }}>
                <TextInput
                  value={replyText}
                  onChangeText={setReplyText}
                  placeholder="Escreva uma resposta..."
                  style={styles.input}
                  multiline
                />
                <View style={styles.editActions}>
                  <TouchableOpacity onPress={() => setReplying(false)}>
                    <Text style={styles.cancel}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleReply}>
                    <Text style={styles.save}>Responder</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {Array.isArray(replies) && replies.length > 0 && (
              <View style={{ marginTop: 12, marginLeft: 24 }}>
                {replies.map((reply) => (
                  <CommentCard
                    key={reply.id}
                    reviewId={reviewId}
                    comment={reply}
                    showReplies={false}
                    currentUserId={currentUserId}
                  />
                ))}
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
}
