import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingTop: 10,
  },

  searchInput: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    fontSize: 16,
  },

  reviewBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },

  address: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },

  distance: {
    fontSize: 14,
    color: "#4CAF50",
    marginBottom: 6,
  },

  tagsBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },

  positiveTag: {
    backgroundColor: "#d4f5d4",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 6,
    fontSize: 12,
    color: "#2e7d32",
  },

  negativeTag: {
    backgroundColor: "#fcdede",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 6,
    fontSize: 12,
    color: "#c62828",
  },

  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 50,
    elevation: 5,
  },

  floatingButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  empty: {
    textAlign: "center",
    marginTop: 100,
    fontSize: 16,
    color: "#999",
  },
});
