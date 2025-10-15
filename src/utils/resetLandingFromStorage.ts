import AsyncStorage from "@react-native-async-storage/async-storage";

const resetLandingFromStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem("hasSeenLanding");
    console.log("✅ Landing sıfırlandı — yeniden gösterilecek.");
  } catch (error) {
    console.error("❌ Landing sıfırlama hatası:", error);
  }
};

export default resetLandingFromStorage;
