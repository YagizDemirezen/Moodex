import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

type BasicInfo = {
  name: string;
  age: string;
  country: string;
  city: string;
  pronouns: string;
};

const BasicInformationScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const [form, setForm] = useState<BasicInfo>({
    name: "",
    age: "",
    country: "",
    city: "",
    pronouns: "",
  });

  const handleNext = () => {
    if (!form.name || !form.age || !form.country) {
      Toast.show("Lütfen zorunlu alanları doldur.", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: false,
        backgroundColor: "#f44336",
        textColor: "#fff",
        opacity: 1,
        textStyle: { fontWeight: "600", fontSize: 16 },
        containerStyle: { marginBottom: 50, padding: 15, borderRadius: 10},
      });
      return;
    }

    navigation.navigate("InterestScreen", { basicInfo: form });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Kendini Tanıyalım.</Text>
          <Text style={styles.subtitle}>
            Adını ve birkaç temel bilgini gir, seni daha iyi tanıyalım.
          </Text>

          <Text style={styles.label}>Ad *</Text>
          <TextInput
            placeholder="Adını gir"
            value={form.name}
            onChangeText={(v) => setForm({ ...form, name: v })}
            style={styles.input}
          />

          <Text style={styles.label}>Yaş *</Text>
          <TextInput
            placeholder="23"
            keyboardType="numeric"
            value={form.age}
            onChangeText={(v) => setForm({ ...form, age: v })}
            style={styles.input}
          />

          <Text style={styles.label}>Ülke *</Text>
          <TextInput
            placeholder="Türkiye"
            value={form.country}
            onChangeText={(v) => setForm({ ...form, country: v })}
            style={styles.input}
          />

          <Text style={styles.label}>Şehir</Text>
          <TextInput
            placeholder="İstanbul"
            value={form.city}
            onChangeText={(v) => setForm({ ...form, city: v })}
            style={styles.input}
          />

          <Text style={styles.label}>Zamir (isteğe bağlı)</Text>
          <TextInput
            placeholder="örn. o / she / he / they"
            value={form.pronouns}
            onChangeText={(v) => setForm({ ...form, pronouns: v })}
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Devam Et ➜</Text>
          </TouchableOpacity>

          <View style={styles.progressContainer}>
            <View style={[styles.progressFill, { width: "33%" }]} />
          </View>
          <Text style={styles.progressText}>1 / 3</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BasicInformationScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 8 },
  subtitle: { fontSize: 15, color: "#666", marginBottom: 24 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 15,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  progressContainer: {
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginTop: 24,
    overflow: "hidden",
  },
  progressFill: { height: 8, backgroundColor: "#4CAF50" },
  progressText: { textAlign: "center", marginTop: 6, color: "#777" },
});
