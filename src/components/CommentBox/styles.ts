import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  inputRow: {
    flexDirection: "row",
    marginTop: 12,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 14,
    color: "#333",
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sendText: {
    color: "#fff",
    fontWeight: "600",
  },
});
