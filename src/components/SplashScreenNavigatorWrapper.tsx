import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import SplashScreen from "../screens/SplashScreen";
import { supabase } from "../services/SupabaseClient";
import checkUserInfo from "../services/CheckUserData";

const SplashNavigatorWrapper: React.FC = () => {
  const navigation = useNavigation<any>();
  const [splashDone, setSplashDone] = useState(false);

  const handleFinish = async () => {
    setSplashDone(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const loggedIn = !!session;

      if (loggedIn) {
        const userId = session.user.id;

        const isUserGiveInformation = await checkUserInfo(userId, "profiles", "isUserGiveInformation");

        navigation.reset({
          index: 0,
          routes: [
            { name: isUserGiveInformation ? "Home" : "Welcome" },
          ],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "Welcome" }],
        });
      }
    } catch (error) {
      console.error("❌ Error checking session:", error);
      navigation.reset({
        index: 0,
        routes: [{ name: "Welcome" }],
      });
    }
  };

  if (!splashDone) return <SplashScreen onFinish={handleFinish} />;

  return null;
};

export default SplashNavigatorWrapper;
