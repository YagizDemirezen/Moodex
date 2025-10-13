import 'react-native-url-polyfill/auto'; // Supabase için
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Orientation from "react-native-orientation-locker";
import AppNavigator from "./src/navigation/AppNavigator";
import { enableScreens } from "react-native-screens";
import NetworkGuard from './src/utils/NetworkGuard';
import GradientBackground from './src/components/GradientBackground';
import { RootSiblingParent } from 'react-native-root-siblings';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { WEB_CLIENT_ID_FROM_GOOGLE } from '@env';

enableScreens();

const App: React.FC = () => {
  useEffect(() => {
    // Portrait moduna kilitle
    Orientation.lockToPortrait();

    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID_FROM_GOOGLE,
      offlineAccess: true,
    });
  }, []);

  return (
    <NavigationContainer>
      <RootSiblingParent>
        <NetworkGuard>
          <GradientBackground>
            <AppNavigator />
          </GradientBackground>
        </NetworkGuard>
      </RootSiblingParent>
    </NavigationContainer>
  );
};

export default App;