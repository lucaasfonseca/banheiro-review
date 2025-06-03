import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  doorContainer: {
    width: 180,
    height: 180,
    marginBottom: -20,
    justifyContent: "center",
    alignItems: "center",
    // perspective: 1200,
  },
  doorImage: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 24,
    color: "#222",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
    fontSize: 16,
    color: "#333",
  },
  button: {
    width: "100%",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerButton: {
    marginTop: 20,
  },
  registerText: {
    color: "#555",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
