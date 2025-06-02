import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchInput: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  reviewList: {
    paddingBottom: 100,
  },
  cardWrapper: {
    marginBottom: 24,
  },
  commentInputBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  commentInput: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  commentSend: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  bottomLinks: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  link: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  floatingButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  floatingButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  empty: {
    marginTop: 100,
    textAlign: "center",
    fontSize: 16,
    color: "#777",
  },
});
