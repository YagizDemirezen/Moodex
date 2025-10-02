import LinearGradient from "react-native-linear-gradient";
import { View, StyleSheet } from 'react-native';
import Colors from "../utils/colors";

const GradientBackground: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <View style={StyleSheet.absoluteFill}>
    <LinearGradient colors={Colors.primaryGradient} style={StyleSheet.absoluteFill} />
    {children}
  </View>
);

export default GradientBackground;
