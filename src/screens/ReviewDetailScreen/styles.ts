import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { padding: 16, alignItems: "center" },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 8,
  },
  rating: {
    fontSize: 18,
    marginVertical: 4,
  },
  comment: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: "center",
  },
  tagsBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  positiveTag: {
    backgroundColor: "#d4edda",
    color: "#155724",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    fontSize: 13,
  },
  negativeTag: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    fontSize: 13,
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 16,
  },
  buttonsBox: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
});
