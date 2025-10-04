import { View, Text } from "react-native"
import styles from "../styles/ContinueStyle"

const Terms = () => {
    return(
        <View>
            <Text style={styles.terms}>
                Moodex'e kayıt olarak{"\n"}
                <Text style={styles.linkText}>Kullanıcı Sözleşmesi</Text> ve{" "}
                <Text style={styles.linkText}>Gizlilik Politikası</Text>’nı kabul etmiş olursunuz.
            </Text>
        </View>
    )};

export default Terms;