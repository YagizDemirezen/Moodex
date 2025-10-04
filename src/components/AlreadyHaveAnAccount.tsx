import { TouchableOpacity, Text } from "react-native"
import styles from "../styles/ContinueStyle"

const AlreadyHaveAnAccount = ({navigation}: any) => {
    return(
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Zaten bir hesabın var mı? Giriş Yap</Text>
        </TouchableOpacity>
    )};

export default AlreadyHaveAnAccount;