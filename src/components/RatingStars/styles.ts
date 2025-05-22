import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 12,
  },
  starsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 6,
  },
  star: {
    fontSize: 32,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export const labelColors = ["#E74C3C", "#E67E22", "#F1C40F", "#2ECC71", "#3498DB"];
