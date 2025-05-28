export interface Review {
  id: string;
  placeName: string;
  rating: number;
  imageUri?: string;
  address?: string;
  comment: string;
  location: { latitude: number; longitude: number };
  positives: string[];
  negatives: string[];
  likedBy?: string[];
  createdBy?: string;
}
