import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import SplashScreen from "./splashScreen";
import { isUserLoggedIn } from "../utils/SessionController";

const SplashNavigatorWrapper: React.FC = () => {
  const navigation = useNavigation<any>();
  const [splashDone, setSplashDone] = useState(false);

  const handleFinish = async () => {
    setSplashDone(true);

    const loggedIn = await isUserLoggedIn();

    navigation.reset({
      index: 0,
      routes: [{ name: loggedIn ? "Home" : "Login" }],
    });
  };

  if (!splashDone) return <SplashScreen onFinish={handleFinish} />;

  return null;
};

export default SplashNavigatorWrapper;
