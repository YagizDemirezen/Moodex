import { Text, TouchableOpacity } from "react-native";
import styles from "../styles/ContinueStyle";
import handleFacebook from "../services/HandleFacebook";

const ContinueWithFacebook = () => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: "#1877F2" }]}
      onPress={handleFacebook}
    >
      <Text style={styles.buttonText}>📘 Facebook ile Giriş</Text>
    </TouchableOpacity>
  );
};

export default ContinueWithFacebook;
