import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: "#000000ff",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    shadowColor: "#ffffffff",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    elevation: 25,
  },
  text: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
  },
  animation: {
    width: 100,
    height: 100,
    margin: 16,
  },
});

export default styles;