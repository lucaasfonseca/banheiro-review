import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 12,
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  rating: {
    fontSize: 18,
    marginBottom: 4,
    color: "#ff9800",
  },
  address: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  comment: {
    fontSize: 16,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#4CAF50",
  },
  tagsBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  positiveTag: {
    backgroundColor: "#e0f7e9",
    color: "#2e7d32",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 14,
  },
  negativeTag: {
    backgroundColor: "#fdecea",
    color: "#c62828",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 14,
  },
  mapCard: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
  },
  map: {
    width: "100%",
    height: 200,
  },
  buttonsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    paddingTop: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#1976D2",
  },
  deleteButton: {
    backgroundColor: "#D32F2F",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
