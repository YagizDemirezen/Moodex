import { StyleSheet, Platform } from "react-native";
import MainStyles from "../utils/MainStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MainStyles.tertiaryColor,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  title: {
    fontFamily: MainStyles.MainTitleFont,
    fontSize: 28,
    textAlign: "center",
    color: MainStyles.textPrimaryColor,
    marginBottom: 10,
    marginTop: 75,
  },
  description: {
    fontFamily: MainStyles.SubtitleFont,
    fontSize: 16,
    textAlign: "center",
    color: MainStyles.textPrimaryColor,
  },
  image: {
    width: 250,
    height: 250,
    marginVertical: 20,
    marginTop: 30,
    resizeMode: "contain",
  },
  button: {
    marginTop: 40,
    backgroundColor: "#2bb5ff",
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 25,
  },
  buttonText: {
    fontFamily: MainStyles.ButtonFont,
    color: MainStyles.textOnBackgroundColor,
    fontSize: 16,
  },
  dotsContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 75,
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#e600ffff",
    marginHorizontal: 5,
  },
  inactiveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#006affff",
    opacity: 0.3,
    marginHorizontal: 5,
  },
});

export default styles;
