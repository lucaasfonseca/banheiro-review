import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
  },
  content: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  name: {
    fontWeight: "600",
    fontSize: 14,
    color: "#333",
  },
  time: {
    fontSize: 12,
    color: "#888",
  },
  text: {
    fontSize: 14,
    color: "#444",
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
    gap: 16,
    flexWrap: "wrap",
  },
  like: {
    color: "#4CAF50",
    fontWeight: "500",
    fontSize: 13,
  },
  reply: {
    color: "#2196F3",
    fontWeight: "500",
    fontSize: 13,
  },
  input: {
    fontSize: 14,
    color: "#333",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 8,
  },
  editActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  cancel: {
    color: "#999",
    fontSize: 13,
    fontWeight: "500",
  },
  save: {
    color: "#4CAF50",
    fontSize: 13,
    fontWeight: "600",
  },
});
