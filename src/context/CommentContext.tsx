import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { createContext, useContext, useState } from "react";
import { auth, db } from "../services/firebase";

export type Comment = {
  id: string;
  text: string;
  createdBy: string;
  createdAt: Date;
  likedBy?: string[];
  replies?: Comment[];
};

type CommentContextType = {
  comments: Comment[];
  getComments: (reviewId: string) => void;
  addComment: (reviewId: string, text: string) => Promise<void>;
  editComment: (
    reviewId: string,
    commentId: string,
    newText: string
  ) => Promise<void>;
  deleteComment: (reviewId: string, commentId: string) => Promise<void>;
  toggleLikeComment: (
    reviewId: string,
    commentId: string,
    alreadyLiked: boolean
  ) => Promise<void>;
};

const CommentContext = createContext<CommentContextType>(
  {} as CommentContextType
);

export function CommentProvider({ children }: { children: React.ReactNode }) {
  const [comments, setComments] = useState<Comment[]>([]);

  const getComments = (reviewId: string) => {
    const commentsRef = collection(db, "reviews", reviewId, "comments");
    const q = query(commentsRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Comment, "id" | "createdAt">),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      }));
      setComments(fetched);
    });

    return unsubscribe;
  };

  const addComment = async (reviewId: string, text: string) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuário não autenticado.");

    const commentsRef = collection(db, "reviews", reviewId, "comments");

    await addDoc(commentsRef, {
      text,
      createdBy: user.uid,
      createdAt: serverTimestamp(),
      likedBy: [],
    });
  };

  const editComment = async (
    reviewId: string,
    commentId: string,
    newText: string
  ) => {
    const commentRef = doc(db, "reviews", reviewId, "comments", commentId);
    await updateDoc(commentRef, {
      text: newText,
    });
  };

  const deleteComment = async (reviewId: string, commentId: string) => {
    const commentRef = doc(db, "reviews", reviewId, "comments", commentId);
    await deleteDoc(commentRef);
  };

  const toggleLikeComment = async (
    reviewId: string,
    commentId: string,
    alreadyLiked: boolean
  ) => {
    const user = auth.currentUser;
    if (!user) return;

    const commentRef = doc(db, "reviews", reviewId, "comments", commentId);

    await updateDoc(commentRef, {
      likedBy: alreadyLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
    });
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        getComments,
        addComment,
        editComment,
        deleteComment,
        toggleLikeComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}

export const useComments = () => useContext(CommentContext);
