import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  reviewBox: {
    marginTop: 16,
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
  },
  title: { fontWeight: "bold", fontSize: 16, marginTop: 8 },
  address: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
    marginBottom: 2,
  },
  distance: {
    fontSize: 12,
    color: "#333",
    marginBottom: 4,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 8,
  },
  tagsBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  positiveTag: {
    backgroundColor: "#d4edda",
    color: "#155724",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
  },
  negativeTag: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
  },
  empty: { marginTop: 20, textAlign: "center", color: "#666" },
});
