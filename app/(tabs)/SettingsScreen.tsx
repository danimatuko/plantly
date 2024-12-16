import useRTL from "@/hooks/useRTL";
import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

export default function SettingsScreen() {
  const { isRTL, toggleRTL } = useRTL();

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
