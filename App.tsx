import React, { useState, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import SplashScreen from "./src/components/splashScreen";

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleSplashFinish = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setShowSplash(false);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {showSplash && (
        <Animated.View style={{ ...StyleSheet.absoluteFillObject, opacity: fadeAnim }}>
          <SplashScreen onFinish={handleSplashFinish} />
        </Animated.View>
      )}

      {!showSplash && (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>🚀 Ana Uygulama</Text>
        </View>
      )}
    </View>
  );
};

export default App;