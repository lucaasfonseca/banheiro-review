import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  searchInput: {
    marginTop: 16,
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  empty: {
    marginTop: 40,
    fontSize: 16,
    textAlign: "center",
    color: "#999",
  },
  reviewBox: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 1,
  },
  floatingButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 999,
    elevation: 4,
  },
  floatingButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
