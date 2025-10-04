import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Colors from "../../utils/colors";
import '../../translations/i18n';
import { useTranslation } from 'react-i18next';
import styles from "../../styles/noInternetCardStyle";
import LottieView from "lottie-react-native";

const NoInternetCard: React.FC = () => {
    const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <Text style={styles.text}>{t("InternetConnectionFalse")}</Text>
        <LottieView
            source={require("../../res/NoInternet.json")}
            autoPlay
            loop
            style={styles.animation}
        />
        <Text style={styles.text}>{t("InternetConnectionWaiting")}</Text>
      </LinearGradient>   
    </View>
  );
};

export default NoInternetCard;
