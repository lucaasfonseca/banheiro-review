import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";

export type Comment = {
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
  comment: Comment;
  currentUserId?: string;
  showReplies?: boolean;
  onLikeToggle?: () => void;
  onDelete?: () => void;
  onEdit?: (text: string) => void;
  onReply?: (parentId: string, replyText: string) => void;
};

export default function CommentCard({
  comment,
  reviewId,
  currentUserId,
  showReplies = false,
  onLikeToggle,
  onDelete,
  onEdit,
  onReply,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const isOwner = currentUserId === comment.createdBy;
  const alreadyLiked = currentUserId
    ? comment.likedBy.includes(currentUserId)
    : false;

  const timeAgo = formatDistanceToNow(
    comment.createdAt instanceof Date
      ? comment.createdAt
      : comment.createdAt.toDate(),
    {
      locale: ptBR,
      addSuffix: true,
    }
  );

  const handleSubmitReply = () => {
    const trimmed = replyText.trim();
    if (!trimmed || !onReply) return;
    onReply(comment.id, trimmed);
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
          <Text style={styles.time}>{timeAgo}</Text>
        </View>

        {editing ? (
          <>
            <TextInput
              style={styles.input}
              multiline
              value={editedText}
              onChangeText={setEditedText}
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
                  {comment.likedBy.length})
                </Text>
              </TouchableOpacity>

              {showReplies && (
                <TouchableOpacity onPress={() => setReplying(!replying)}>
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

        {replying && (
          <View style={{ marginTop: 8 }}>
            <TextInput
              style={styles.input}
              value={replyText}
              onChangeText={setReplyText}
              placeholder="Escreva sua resposta..."
              multiline
            />
            <View style={styles.editActions}>
              <TouchableOpacity onPress={() => setReplying(false)}>
                <Text style={styles.cancel}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmitReply}>
                <Text style={styles.save}>Responder</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {showReplies &&
          Array.isArray(comment.replies) &&
          comment.replies.length > 0 && (
            <View style={styles.repliesContainer}>
              {comment.replies.map((reply) => (
                <CommentCard
                  key={reply.id}
                  reviewId={reviewId}
                  comment={reply}
                  currentUserId={currentUserId}
                />
              ))}
            </View>
          )}
      </View>
    </View>
  );
}
