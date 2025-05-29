import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type Comment = {
  id: string;
  text: string;
  createdBy: string;
  createdAt: any; // Pode ser Timestamp ou Date
  likedBy: string[];
  avatarUrl?: string;
};

type Props = {
  reviewId: string;
  showReplies: boolean;
  comment: Comment;
  currentUserId?: string;
  onLikeToggle?: () => void;
  onDelete?: () => void;
  onEdit?: (text: string) => void;
  onReply?: () => void;
};

export default function CommentCard({
  comment,
  reviewId,
  showReplies,
  currentUserId,
  onLikeToggle,
  onDelete,
  onEdit,
  onReply,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);

  const isOwner = comment.createdBy === currentUserId;
  const alreadyLiked = currentUserId
    ? comment.likedBy?.includes(currentUserId)
    : false;

  const formattedTime = formatDistanceToNow(
    comment.createdAt instanceof Date
      ? comment.createdAt
      : comment.createdAt.toDate(),
    {
      locale: ptBR,
      addSuffix: true,
    }
  );

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
              <TouchableOpacity
                onPress={() => {
                  onEdit?.(editedText);
                  setEditing(false);
                }}
              >
                <Text style={styles.save}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.text}>{comment.text}</Text>

            <View style={styles.actions}>
              <TouchableOpacity onPress={onLikeToggle}>
                <Text style={styles.like}>
                  {alreadyLiked ? "❤️ Curtido" : "🤍 Curtir"} (
                  {comment.likedBy?.length || 0})
                </Text>
              </TouchableOpacity>

              {showReplies && (
                <TouchableOpacity onPress={onReply}>
                  <Text style={styles.reply}>Responder</Text>
                </TouchableOpacity>
              )}

              {isOwner && (
                <>
                  <TouchableOpacity onPress={() => setEditing(true)}>
                    <Text style={styles.reply}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onDelete}>
                    <Text style={[styles.reply, { color: "red" }]}>
                      Excluir
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </>
        )}
      </View>
    </View>
  );
}
