import { Text, TouchableOpacity } from "react-native";
import styles from "../styles/ContinueStyle";

const ContinueWithEmail = ({navigation}: any) => {
    return(
        <TouchableOpacity
        style={[styles.button, { backgroundColor: "#555" }]}
        onPress={() => navigation.navigate("EmailLogin")}
        >
            <Text style={styles.buttonText}>📧 E-posta ile Giriş Yap</Text>
        </TouchableOpacity>
    )};

export default ContinueWithEmail;