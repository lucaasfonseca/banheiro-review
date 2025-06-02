import { Review } from "../models/Review";

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Register: undefined;
  Home: undefined;
  AddReview: { review?: Review };
  ReviewDetail: { review: Review };
  Favorites: undefined;
  Map: undefined;
  Profile: undefined;
};
