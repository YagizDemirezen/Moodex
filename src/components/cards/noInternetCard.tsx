import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Colors from "../../utils/MainStyles";
import styles from "../../styles/noInternetCardStyle";
import LottieView from "lottie-react-native";
import translate from "../../translations/translate";

const NoInternetCard: React.FC = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <Text style={styles.text}>{translate("InternetConnectionFalse")}</Text>
        <LottieView
            source={require("../../res/NoInternet.json")}
            autoPlay
            loop
            style={styles.animation}
        />
        <Text style={styles.text}>{translate("InternetConnectionWaiting")}</Text>
      </LinearGradient>   
    </View>
  );
};

export default NoInternetCard;
