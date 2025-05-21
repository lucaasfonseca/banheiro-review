import { Review } from "../context/ReviewContext";

export type RootStackParamList = {
  Home: undefined;
  AddReview: { review?: Review };
  ReviewDetail: { review: Review };
  Login: undefined;
};
