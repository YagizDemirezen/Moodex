import { StyleSheet, Platform } from "react-native";
import MainStyles from "../utils/MainStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: Platform.OS === "android" ? 30 : 50, // üst boşluğu biraz azalttık
    backgroundColor: "transparent",
  },

  title: {
    fontFamily: MainStyles.MainTitleFont,
    fontSize: 50,
    color: MainStyles.textPrimaryColor,
    marginBottom: 25, // üst ve alt boşlukları biraz azalttık
    marginTop: 20,
    textAlign: "center",
    letterSpacing: 5,
  },

  logo: {
    width: 175,
    height: 175,
    resizeMode: "contain",
    marginBottom: 20, // biraz yukarı çekildi
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 100,
    ...(Platform.OS === "android" ? {} : { marginTop: 10 }),
  },

  inputContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },

  inputLabel: {
    fontFamily: MainStyles.SubtitleFont,
    fontSize: 16,
    marginBottom: 5,
    color: MainStyles.textPrimaryColor,
  },

  input: {
    backgroundColor: "#ffffffff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 5,
    color: MainStyles.textPrimaryColor,
    fontFamily: MainStyles.TextFont,
  },

  forgotPassword: {
    color: "#007bff",
    textDecorationLine: "underline",
    marginBottom: 12, // biraz yukarı çektik
    marginTop: 5,
    fontFamily: MainStyles.SubtitleFont
  },

  loginButton: {
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 8, // biraz yukarı
    width: "100%",
    marginBottom: 20, // Google butonuna yaklaşması için azaltıldı
  },
  loginButtonText: {
    color: MainStyles.textOnBackgroundColor,
    fontSize: 16,
    fontFamily: MainStyles.ButtonFont
  },

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8, // yukarı çekildi
  },
  registerText: {
    color: "#007bff",
    textDecorationLine: "underline",
    fontFamily: MainStyles.SubtitleFont,
  },

  noAccountText: {
    color: MainStyles.textPrimaryColor,
    fontFamily: MainStyles.SubtitleFont,
  },

  orText: {
    textAlign: "center",
    color: MainStyles.textPrimaryColor,
    fontFamily: MainStyles.SubtitleFont,
  },

  googleButton: {
    width: 50,
    height: 50,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingTop: 15
  },
  
  googleIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginBottom: 15,
  },

  orDivider: {
  flexDirection: "row",
  alignItems: "center",
  marginVertical: 10,
},

orDividerLine: {
  flex: 1,
  height: 1,
  backgroundColor: MainStyles.textPrimaryColor, // mevcut tema rengi ile uyumlu
},

orDividerText: {
  marginHorizontal: 10,
  color: MainStyles.textPrimaryColor,
  fontFamily: MainStyles.SubtitleFont,
},
});

export default styles;
