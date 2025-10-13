import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const resetLandingFromStorage = async () => {
  useEffect(() => {
  const resetLanding = async () => {
    await AsyncStorage.removeItem("hasSeenLanding");
    console.log("✅ Landing sıfırlandı — yeniden gösterilecek.");
  };

  resetLanding();
}, []);
}

export default resetLandingFromStorage;