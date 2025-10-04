import { StyleSheet, Platform } from "react-native";
import Colors from "../utils/colors";

const styles = StyleSheet.create({
  // Genel container
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start", // başlık ve logo yukarıdan başlasın
    padding: 20,
    paddingTop: Platform.OS === "android" ? 40 : 60, // üst boşluk
    backgroundColor: "transparent", // 🔑 burası

  },

  // Başlık
  title: {
    fontSize: 50,
    color: "black",
    marginBottom: 30,
    marginTop: 30,
    textAlign: "center",
    fontFamily: "Fira Sans Black",
    letterSpacing: 3,
  },

  // Logo
  logo: {
    width: 175,
    height: 175,
    resizeMode: "contain",
    marginBottom: 50,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 100,
    ...(Platform.OS === "android" ? {} : { marginTop: 20 }),
  },

  // Tüm butonlar
  button: {
    padding: 15,
    borderRadius: 10,
    width: 250,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },

  // Apple buton içeriği (logo + text)
  appleButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  // Button Text
  buttonText: {
    color: "white",
    fontWeight: "600",
  },

  // Linkler (Hesabın yok mu?)
  link: {
    marginTop: 20,
    color: "#007bffff",
    fontSize: 16,
    textDecorationLine: "underline",
  },

  // Kullanıcı sözleşmesi ve gizlilik
  terms: {
    marginTop: 25,
    fontSize: 16,
    color: "black",
    textAlign: "center",
    lineHeight: 20,
    width: 300,
  },
  linkText: {
    color: "#007bffff",
    textDecorationLine: "underline",
  },

  // Buton container (vertical spacing + ortalama)
  buttonContainer: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    ...(Platform.OS === "android" ? {} : { gap: 0 }),
  },
});


export default styles;
