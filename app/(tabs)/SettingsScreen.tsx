import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet, Alert } from "react-native";
import { I18nManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const [isRTL, setIsRTL] = useState(I18nManager.isRTL);
  const router = useRouter();

  useEffect(() => {
    // Load RTL preference from AsyncStorage on initial render
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
      // Switch the RTL state
      I18nManager.forceRTL(!isRTL);
      setIsRTL(!isRTL);

      // Save the preference in AsyncStorage
      await AsyncStorage.setItem("isRTL", (!isRTL).toString());

      // Temporarily navigate away and back to trigger re-render
      Alert.alert(
        "Success",
        `App direction changed to ${!isRTL ? "RTL" : "LTR"}`,
      );
      router.push("/"); // Navigate to home screen or any other screen
      setTimeout(() => {
        router.push("/SettingsScreen"); // Navigate back to settings to reflect changes
      }, 100); // Delay for re-rendering
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to change language direction");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.text}>Enable RTL Layout</Text>
        <Switch value={isRTL} onValueChange={toggleRTL} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fffa",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#85A98F",
    marginBottom: 30,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    color: "#555",
    marginRight: 10,
  },
});
