import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import NetworkGuard from "./src/utils/NetworkGuard";
import SplashNavigatorWrapper from "./src/components/SplashScreenNavigatorWrapper";
import GradientBackground from "./src/components/GradientBackground";
import Colors from "./src/utils/colors";

enableScreens();

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "fade",
          contentStyle: { backgroundColor: Colors.tertiary }, //Ssssh they will don't notice. It is the Yağız's trick (Mixed primary and secondary colors)
        }}
        initialRouteName="Splash"
      >
        <Stack.Screen name="Splash" component={SplashNavigatorWrapper} />

        <Stack.Screen name="Home">
          {(props) => (
            <NetworkGuard>
              <GradientBackground>
                <HomeScreen {...props} />
              </GradientBackground>
            </NetworkGuard>
          )}
        </Stack.Screen>

        <Stack.Screen name="Login">
          {(props) => (
            <GradientBackground>
              <LoginScreen {...props} />
            </GradientBackground>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
