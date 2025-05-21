import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export type Review = {
  id: string;
  placeName: string;
  comment: string;
  rating: number;
  imageUri?: string | null;
  positives: string[];
  negatives: string[];
  location?: {
    latitude: number;
    longitude: number;
  };
  address?: string; // <-- ADICIONE AQUI
};

type ReviewContextType = {
  reviews: Review[];
  addReview: (review: Review) => void;
  updateReview: (review: Review) => void;
  deleteReview: (id: string) => void;
};

const STORAGE_KEY = "@banheiro_reviews";

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export function ReviewProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    loadReviews();
  }, []);

  useEffect(() => {
    saveReviews();
  }, [reviews]);

  const loadReviews = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        setReviews(JSON.parse(data));
      }
    } catch (error) {
      console.error("Erro ao carregar avaliações:", error);
    }
  };

  const saveReviews = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch (error) {
      console.error("Erro ao salvar avaliações:", error);
    }
  };

  const addReview = (review: Review) => {
    setReviews((prev) => [...prev, review]);
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

export function useReviews() {
  const context = useContext(ReviewContext);
  if (!context)
    throw new Error("useReviews must be used within ReviewProvider");
  return context;
}
