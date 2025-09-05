import React from "react";
import LottieView from "lottie-react-native";
import LinearGradient from "react-native-linear-gradient";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  return (
    <LinearGradient
      colors={['#a0e0ff', '#f3bbffff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <LottieView
        source={require('../assets/splashScreen.json')}
        autoPlay={true}
        loop={false}
        onAnimationFinish={onFinish}
        style={{ width: 300, height: 300 }}
      />
    </LinearGradient>
  );
};

export default SplashScreen;
