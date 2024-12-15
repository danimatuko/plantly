// app/_layout.tsx
import { PlantProvider } from "../context/PlantContext";
import { Stack } from "expo-router";
import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";

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

  return (
    <PlantProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#f5fffa" },
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="PlantDetailsScreen/[id]" // Using a dynamic route for the plant ID
          options={{ title: "Plant Details", headerShown: true }} // Customize the header if needed
        />
      </Stack>
    </PlantProvider>
  );
}
