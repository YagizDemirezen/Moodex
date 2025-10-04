import { RouteProp, ParamListBase } from "@react-navigation/native";
import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import ContinueWithGoogle from "../components/ContinueWithGoogle";
import ContinueWithApple from "../components/ContinueWithApple";
import ContinueWithFacebook from "../components/ContinueWithFacebook";
import ContinueWithEmail from "../components/ContinueWithEmail";
import AlreadyHaveAnAccount from "../components/AlreadyHaveAnAccount";
import Terms from "../components/Terms";
import styles from "../styles/ContinueStyle";
import GradientBackground from "../components/GradientBackground";

const WelcomeScreen: React.FC<{ route: RouteProp<ParamListBase, "Welcome">; navigation: any }> = ({ navigation }) => {
  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Moodex</Text>
        <Image
          source={require("../res/logo/MoodexLogo.png")}
          style={styles.logo}
        />

        <View style={styles.buttonContainer}>
          <ContinueWithGoogle />
          <ContinueWithApple />
          <ContinueWithFacebook />
          <ContinueWithEmail />
          <AlreadyHaveAnAccount navigation={null} />
          <Terms />
        </View>
      </View>
    </GradientBackground>
  );
};

export default WelcomeScreen;
