import { Review } from "../context/ReviewContext";

export type RootStackParamList = {
  Home: undefined;
  AddReview: { review?: Review }; // ✅ agora aceita um review opcional
  ReviewDetail: { review: Review };
};
