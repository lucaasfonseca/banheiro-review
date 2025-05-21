import { Review } from "../context/ReviewContext";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  AddReview: { review?: Review };
  ReviewDetail: { review: Review };
};
