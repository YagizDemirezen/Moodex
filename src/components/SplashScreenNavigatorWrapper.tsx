import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import SplashScreen from "../screens/SplashScreen";
import LandingScreen from "../screens/LandingScreen";
import { supabase } from "../services/SupabaseClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckUserInfo } from "../services/UserProfileManager";
import resetSessionFromSupabase from "../utils/resetSessionFromSupabase";
import resetLandingFromStorage from "../utils/resetLandingFromStorage";

const SplashNavigatorWrapper: React.FC = () => {
  useEffect(() => { 
  const init = async () => { 
    //await resetSessionFromSupabase(); 
    //await resetLandingFromStorage(); 
  }; 
  init(); 
}, []);
  const navigation = useNavigation<any>();
  const [currentStep, setCurrentStep] = useState<"splash" | "landing" | "done">("splash");

  const handleSplashFinish = async () => {
    try {
      const hasSeenLanding = await AsyncStorage.getItem("hasSeenLanding");
      console.log("HasSeenLandingReset:", hasSeenLanding);

      if (hasSeenLanding === "true") {
        await handleAppFlow();
      } else {
        setCurrentStep("landing");
      }
    } catch (error) {
      console.error("Landing kontrol hatası:", error);
      await handleAppFlow();
    }
  };

  const handleLandingFinish = async () => {
    await AsyncStorage.setItem("hasSeenLanding", "true");
    await handleAppFlow();
  };

  const handleAppFlow = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const loggedIn = !!session;
      console.log("logged control:", loggedIn);

      if (loggedIn && session?.user?.id) {
        const userId = session.user.id;

        const isUserGiveInformation = await CheckUserInfo(
          "profiles",
          userId,
          "isusergiveinformation"
        );

        console.log("isUserGiveInformation:", isUserGiveInformation);

        navigation.reset({
          index: 0,
          routes: [
            {
              name: isUserGiveInformation ? "Home" : "BasicInformationScreen",
            },
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

  if (currentStep === "splash") {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (currentStep === "landing") {
    return <LandingScreen onFinish={handleLandingFinish} />;
  }

  return null;
};

export default SplashNavigatorWrapper;
