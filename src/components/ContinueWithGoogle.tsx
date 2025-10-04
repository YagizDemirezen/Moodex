import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import handleGoogleLogin from "../services/HandleGoogle";
import styles from "../styles/ContinueStyle";
import ensureUserProfile from "../services/EnsureUserProfile";
import checkUserdata from "../services/CheckUserData";

const ContinueWithGoogle = () => {
  const navigation = useNavigation<any>();

  const onPress = async () => {
    try {
      const data = await handleGoogleLogin();

      if (data?.user) {
        const userId = data.user.id;

        await ensureUserProfile(userId);

        const isUserGiveInformation = await checkUserdata(
          userId,
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
