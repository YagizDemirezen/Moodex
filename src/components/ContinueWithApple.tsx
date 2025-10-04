import { Platform } from "react-native"
import { View, Text, TouchableOpacity, Image } from "react-native"
import styles from "../styles/ContinueStyle"
import handleAppleLogin from "../services/HandleApple"

const ContinueWithApple = () => {
  return (
    <View>
      {Platform.OS === "ios" && (
        <TouchableOpacity style={[styles.button, { backgroundColor: "#000" }]} onPress={handleAppleLogin}>
          <View style={styles.appleButtonContent}>
            <Image
              source={require("../res/logo/AppleLogo.png")}
              style={{ width: 20, height: 20, marginRight: 10 }}
            />
            <Text style={styles.buttonText}>🍏 Apple ile Giriş Yap</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};


export default ContinueWithApple


      