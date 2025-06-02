import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  reviewBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    color: "#333",
  },
  address: {
    fontSize: 13,
    color: "#777",
    marginBottom: 4,
  },
  distance: {
    fontSize: 12,
    color: "#999",
    marginBottom: 8,
  },
  commentText: {
    fontSize: 14,
    color: "#444",
    marginBottom: 12,
  },
  tagsBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  positiveTag: {
    backgroundColor: "#E0F2F1",
    color: "#00796B",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    fontSize: 12,
  },
  negativeTag: {
    backgroundColor: "#FFEBEE",
    color: "#C62828",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    fontSize: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 16,
    alignItems: "center",
    marginTop: 8,
  },
  like: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "500",
  },
  liked: {
    color: "red",
  },
  comment: {
    color: "#2196F3",
    fontSize: 14,
    fontWeight: "500",
  },
});
