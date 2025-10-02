import React, { useState, useEffect } from "react";
import LottieView from "lottie-react-native";
import LinearGradient from "react-native-linear-gradient";
import Colors from "../utils/colors";
import { getUserToken } from "../utils/SessionController";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const initSession = async () => {
      await getUserToken();
    };
    initSession();
  }, []);

  const handleFinish = () => {
    setShowAnimation(false);
    onFinish();
  };

  return (
    <LinearGradient
      colors={Colors.primaryGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {showAnimation && (
        <LottieView
          source={require("../res/splashScreen.json")}
          autoPlay
          loop={false}
          onAnimationFinish={handleFinish}
          style={{ width: 300, height: 300 }}
        />
      )}
    </LinearGradient>
  );
};

export default SplashScreen;
