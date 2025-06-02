import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ccc",
  },
  content: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  name: {
    fontWeight: "bold",
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
    flexWrap: "wrap",
    gap: 16,
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
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
    color: "#333",
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
  repliesContainer: {
    marginTop: 12,
    marginLeft: 24,
    borderLeftWidth: 1,
    borderLeftColor: "#ddd",
    paddingLeft: 12,
  },
});
