import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens"; // <-- burayı ekledik
import InformationScreen from "../screens/InformationScreen";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import SplashNavigatorWrapper from "../components/SplashScreenNavigatorWrapper";
import Colors from "../utils/colors";
enableScreens();

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.tertiary },
        animation: 'fade_from_bottom',
      }}
    >
      <Stack.Screen name="Splash" component={SplashNavigatorWrapper} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Information" component={InformationScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
