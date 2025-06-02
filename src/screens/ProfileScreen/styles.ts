import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 12 },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginTop: 12,
  },
  logoutButton: {
    backgroundColor: "#f44336",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginTop: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: {
    color: "#555",
  },
});
