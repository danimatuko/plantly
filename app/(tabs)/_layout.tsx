import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#85A98F", // Primary color for active tab
        headerStyle: { backgroundColor: "#f5fffa" },
        tabBarStyle: {
          backgroundColor: "#f5fffa",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="PlantListScreen"
        options={{
          title: "My Plants",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="leaf" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="AddPlantScreen"
        options={{
          title: "Add Plant",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="plus-circle" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="SettingsScreen"
        options={{
          title: "settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="gear" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
