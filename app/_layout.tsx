import { PlantProvider } from "../context/PlantContext";
import { Stack } from "expo-router";
import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";
import useRTL from "@/hooks/useRTL";

export default function RootLayout() {
  useEffect(() => {
    // Request notification permissions
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Notification permissions not granted!");
      }
    };

    requestPermissions();
  }, []);

  const { isRTL } = useRTL();

  return (
    <PlantProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#f5fffa" },
          headerShown: false,
          headerTitleAlign: isRTL ? "right" : "left",
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="PlantDetailsScreen/[id]"
          options={{ title: "Plant Details", headerShown: true }}
        />
      </Stack>
    </PlantProvider>
  );
}
