import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import SplashScreen from "../screens/SplashScreen";
import LandingScreen from "../screens/LandingScreen";
import { supabase } from "../services/SupabaseClient";
import checkUserInfo from "../services/CheckUserData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import resetLanding from "../utils/resetLandingFromStorage";
const SplashNavigatorWrapper: React.FC = () => {
  resetLanding(); //RESET Landing storage for testing purposes
  const navigation = useNavigation<any>();
  const [currentStep, setCurrentStep] = useState<"splash" | "landing" | "done">("splash");

  const handleSplashFinish = async () => {
    try {
      const hasSeenLanding = await AsyncStorage.getItem("hasSeenLanding");
      if (hasSeenLanding === "true") {
        handleAppFlow();
      } else {
        setCurrentStep("landing");
      }
    } catch (error) {
      console.error("Landing kontrol hatası:", error);
      handleAppFlow();
    }
  };

  const handleLandingFinish = async () => {
    await AsyncStorage.setItem("hasSeenLanding", "true");
    handleAppFlow();
  };

  const handleAppFlow = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const loggedIn = !!session;

      if (loggedIn) {
        const userId = session.user.id;

        const isUserGiveInformation = await checkUserInfo(
          userId,
          "profiles",
          "isUserGiveInformation"
        );

        navigation.reset({
          index: 0,
          routes: [
            { name: isUserGiveInformation ? "Home" : "BasicInformationScreen" },
          ],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "Welcome" }],
        });
      }

      setCurrentStep("done");
    } catch (error) {
      console.error("❌ Error checking session:", error);
      navigation.reset({
        index: 0,
        routes: [{ name: "Welcome" }],
      });
      setCurrentStep("done");
    }
  };

  // 🖼️ Ekran seçimi
  if (currentStep === "splash") {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (currentStep === "landing") {
    return <LandingScreen onFinish={handleLandingFinish} />;
  }

  return null; // işlem bittiğinde navigasyon reset olduğu için boş döner
};

export default SplashNavigatorWrapper;
