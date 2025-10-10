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
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-root-toast"; // <-- Toast import edildi

type BasicInfo = {
  name: string;
  age: string;
  country: string;
  city: string;
  pronouns: string;
};

const hobbiesOptions = [
  "Music",
  "Cinema",
  "Reading",
  "Sports",
  "Gaming",
  "Travel",
  "Art",
];

const InterestScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const basicInfo: BasicInfo = route.params?.basicInfo;

  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [profession, setProfession] = useState("");

  const toggleHobby = (hobby: string) => {
    if (selectedHobbies.includes(hobby)) {
      setSelectedHobbies(selectedHobbies.filter((h) => h !== hobby));
    } else {
      setSelectedHobbies([...selectedHobbies, hobby]);
    }
  };

  const handleNext = () => {
    if (!profession) {
      // Alert yerine Toast kullanıyoruz
      Toast.show("Lütfen meslek alanını doldurun.", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
      return;
    }

    navigation.navigate("Home", {
      basicInfo,
      interests: { hobbies: selectedHobbies, profession },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Nelerden Hoşlanırsın? 🎯</Text>
          <Text style={styles.subtitle}>
            Hobilerini seç ve mesleğini yaz, seni daha iyi anlayalım.
          </Text>

          {/* Hobiler */}
          <Text style={styles.label}>Hobiler</Text>
          <View style={styles.hobbiesContainer}>
            {hobbiesOptions.map((hobby) => (
              <TouchableOpacity
                key={hobby}
                style={[
                  styles.hobbyButton,
                  selectedHobbies.includes(hobby) && styles.hobbySelected,
                ]}
                onPress={() => toggleHobby(hobby)}
              >
                <Text
                  style={[
                    styles.hobbyText,
                    selectedHobbies.includes(hobby) && styles.hobbyTextSelected,
                  ]}
                >
                  {hobby}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Meslek */}
          <Text style={styles.label}>Meslek</Text>
          <TextInput
            placeholder="Mesleğini yaz"
            value={profession}
            onChangeText={setProfession}
            style={styles.input}
          />

          {/* Devam Butonu */}
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Devam Et ➜</Text>
          </TouchableOpacity>

          {/* İlerleme Göstergesi */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressFill, { width: "66%" }]} />
          </View>
          <Text style={styles.progressText}>2 / 3</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default InterestScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 8 },
  subtitle: { fontSize: 15, color: "#666", marginBottom: 24 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 6 },
  hobbiesContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 16 },
  hobbyButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
  },
  hobbySelected: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  hobbyText: { color: "#333", fontSize: 14 },
  hobbyTextSelected: { color: "#fff" },
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
