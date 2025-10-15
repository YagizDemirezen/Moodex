import { RouteProp, ParamListBase } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../styles/WelcomeScreenStyle";
import GradientBackground from "../components/GradientBackground";
import handleGoogle from "../services/HandleGoogle";
import translate from "../translations/translate";

const WelcomeScreen: React.FC<{ route: RouteProp<ParamListBase, "Welcome">; navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // göz ikonu için

  return (
    <GradientBackground>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={Platform.OS === "ios" ? 20 : 0}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.title}>Moodex</Text>
            <Image
              source={require("../res/MoodexLogo.png")}
              style={styles.logo}
            />

            <View style={styles.inputContainer}>
              {/* Email */}
              <Text style={styles.inputLabel}>{translate("Email")}</Text>
              <TextInput
                style={styles.input}
                value={email}
                placeholder={translate("EmailPlaceholder") + "@gmail.com"}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {/* Şifre */}
              <Text style={styles.inputLabel}>{translate("Password")}</Text>
              <View style={{ position: "relative", width: "100%" }}>
                <TextInput
                  style={[styles.input, { paddingRight: 40 }]}
                  value={password}
                  placeholder={translate("PasswordPlaceholder")}
                  onChangeText={setPassword}
                  secureTextEntry={!passwordVisible}
                  keyboardType="default"
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={
                      passwordVisible
                        ? require("../res/passwordOpenEye.png")
                        : require("../res/passwordClosedEye.png")
                    }
                    style={{ width: 24, height: 24 }}
                  />
                </TouchableOpacity>
              </View>

              {/* Şifremi unuttum */}
              <TouchableOpacity
                style={{ alignSelf: "flex-end", marginBottom: 10 }}
                onPress={() => console.log("Şifremi unuttum tıklandı")}
              >
                <Text style={styles.forgotPassword}>{translate("ForgetPassword")}</Text>
              </TouchableOpacity>

              {/* Giriş Yap */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => console.log("Giriş yap tıklandı")}
              >
                <Text style={styles.loginButtonText}>{translate("SignUp")}</Text>
              </TouchableOpacity>

              {/* Kayıt Ol */}
              <View style={styles.registerContainer}>
                <Text style={styles.noAccountText}>{translate("NoAccount")} </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                  <Text style={styles.registerText}>{translate("SignUp")}</Text>
                </TouchableOpacity>
              </View>

              {/* Veya çizgisi */}
              <View style={styles.orDivider}>
                <View style={styles.orDividerLine} />
                <Text style={styles.orDividerText}>{translate("Or")}</Text>
                <View style={styles.orDividerLine} />
              </View>

              {/* Google ile giriş */}
              <TouchableOpacity
                style={styles.googleButton}
                onPress={async () => await handleGoogle(navigation)}
              >
                <Image
                  source={require("../res/GoogleIcon.png")}
                  style={styles.googleIcon}
                />
              </TouchableOpacity>

            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </GradientBackground>
  );
};

export default WelcomeScreen;
