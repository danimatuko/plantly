import { useEffect, useState } from "react";
import { I18nManager, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const useRTL = () => {
  const [isRTL, setIsRTL] = useState(I18nManager.isRTL);
  const router = useRouter();

  useEffect(() => {
    const loadRTLPreference = async () => {
      const savedRTL = await AsyncStorage.getItem("isRTL");
      if (savedRTL !== null) {
        I18nManager.forceRTL(savedRTL === "true");
        setIsRTL(savedRTL === "true");
      }
    };

    loadRTLPreference();
  }, []);

  const toggleRTL = async () => {
    try {
      const newRTLValue = !isRTL;
      I18nManager.forceRTL(newRTLValue);
      setIsRTL(newRTLValue);
      await AsyncStorage.setItem("isRTL", newRTLValue.toString());

      Alert.alert(
        "Success",
        `App direction changed to ${newRTLValue ? "RTL" : "LTR"}`,
      );

      // Navigate to home screen or any other screen
      router.push("/");
      setTimeout(() => {
        router.push("/SettingsScreen");
      }, 100);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to change language direction");
    }
  };

  return { isRTL, toggleRTL };
};

export default useRTL;
