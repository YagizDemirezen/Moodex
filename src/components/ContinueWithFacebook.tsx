import { Text, TouchableOpacity } from "react-native";
import styles from "../styles/ContinueStyle";
import handleFacebookLogin from "../services/HandleFacebook";

const ContinueWithFacebook = () => {
    return(
        <TouchableOpacity style={[styles.button, { backgroundColor: "#1877F2" }]} onPress={handleFacebookLogin}>
            <Text style={styles.buttonText}>📘 Facebook ile Giriş</Text>
        </TouchableOpacity>
    )};

export default ContinueWithFacebook;