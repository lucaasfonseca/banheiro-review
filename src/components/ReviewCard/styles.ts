import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  reviewBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  address: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  distance: {
    fontSize: 12,
    color: "#4CAF50",
    marginBottom: 6,
  },
  tagsBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 8,
  },
  positiveTag: {
    backgroundColor: "#E0F7FA",
    color: "#00796B",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
  },
  negativeTag: {
    backgroundColor: "#FFEBEE",
    color: "#C62828",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
  },
});
