import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import handleGoogle from "../services/HandleGoogle";
import styles from "../styles/ContinueStyle";
import checkUserdata from "../services/CheckUserData";

const ContinueWithGoogle = () => {
  const navigation = useNavigation<any>();

  const onPress = async () => {
    try {
      const data = await handleGoogle();

      if (data?.user) {
        const google_id = data.user.id;

        const isUserGiveInformation = await checkUserdata(
          google_id,
          "profiles",
          "isUserGiveInformation"
        );

        // Reset navigation to Home or Information
        navigation.reset({
          index: 0,
          routes: [
            { name: isUserGiveInformation ? "Home" : "Information" },
          ],
        });
      }
    } catch (error) {
      console.error("❌ Google login error:", error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#DB4437" }]}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>🔴 Google ile Giriş</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContinueWithGoogle;
