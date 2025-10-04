import 'react-native-url-polyfill/auto'; // For Supabase
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Orientation from "react-native-orientation-locker";
import AppNavigator from "./src/navigation/AppNavigator";
import { enableScreens } from "react-native-screens";
import NetworkGuard from './src/utils/NetworkGuard';
import GradientBackground from './src/components/GradientBackground';

enableScreens();

const App: React.FC = () => {
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  return (
    <NavigationContainer>
      <NetworkGuard>
        <GradientBackground>
          <AppNavigator />
        </GradientBackground>
      </NetworkGuard>
    </NavigationContainer>
  );
};

export default App;
