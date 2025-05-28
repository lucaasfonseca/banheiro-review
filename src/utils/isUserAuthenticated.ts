import { User } from "firebase/auth";

export const isUserAuthenticated = (user: User | null | undefined): boolean =>
  !!user?.uid;
