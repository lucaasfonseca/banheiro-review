import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../services/firebase";

export type Review = {
  id: string;
  placeName: string;
  rating: number;
  comment: string;
  imageUri?: string;
  address?: string;
  location: { latitude: number; longitude: number };
  positives: string[];
  negatives: string[];
  likedBy?: string[];
  createdBy: string;
};

type ReviewContextType = {
  reviews: Review[];
  addReview: (review: Omit<Review, "id" | "createdBy">) => Promise<void>;
  updateReview: (review: Review) => void;
  deleteReview: (id: string) => void;
};

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export function ReviewProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "reviews"), (snapshot) => {
      const firebaseReviews: Review[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Review[];
      setReviews(firebaseReviews);
    });

    return () => unsubscribe();
  }, []);

  const addReview = async (review: Omit<Review, "id" | "createdBy">) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuário não autenticado.");

    await addDoc(collection(db, "reviews"), {
      ...review,
      createdBy: user.uid,
    });
  };

  const updateReview = (updated: Review) => {
    setReviews((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <ReviewContext.Provider
      value={{ reviews, addReview, updateReview, deleteReview }}
    >
      {children}
    </ReviewContext.Provider>
  );
}

// ❤️ Curtir/descurtir review
export async function toggleLike(
  reviewId: string,
  userId: string,
  alreadyLiked: boolean
) {
  const reviewRef = doc(db, "reviews", reviewId);

  await updateDoc(reviewRef, {
    likedBy: alreadyLiked ? arrayRemove(userId) : arrayUnion(userId),
  });
}

export function useReviews() {
  const context = useContext(ReviewContext);
  if (!context)
    throw new Error("useReviews must be used within ReviewProvider");
  return context;
}
