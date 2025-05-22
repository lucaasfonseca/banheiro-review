import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 13,
  },
  customInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});

export const tagThemes = {
  positive: {
    tag: {
      backgroundColor: "#e6f4ea",
    },
    tagSelected: {
      backgroundColor: "#4caf50",
    },
    tagText: {
      color: "#2e7d32",
    },
    tagTextSelected: {
      color: "#fff",
      fontWeight: "bold" as const,
    },
    tagCustom: {
      borderWidth: 1,
      borderColor: "#4caf50",
    },
    icon: "#4caf50",
  },
  negative: {
    tag: {
      backgroundColor: "#fce8e6",
    },
    tagSelected: {
      backgroundColor: "#f44336",
    },
    tagText: {
      color: "#c62828",
    },
    tagTextSelected: {
      color: "#fff",
      fontWeight: "bold" as const,
    },
    tagCustom: {
      borderWidth: 1,
      borderColor: "#f44336",
    },
    icon: "#f44336",
  },
};