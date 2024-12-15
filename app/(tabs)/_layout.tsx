import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#85A98F", // Primary color for active tab
        //tabBarInactiveTintColor: "#8C9B7A", // Secondary color for inactive tabs
        tabBarStyle: {
          backgroundColor: "#f5fffa",
        },
      }}
    >
      {/* Home Screen */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />

      {/* Plant List Screen */}
      <Tabs.Screen
        name="PlantListScreen"
        options={{
          title: "My Plants",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="leaf" color={color} />
          ),
        }}
      />

      {/* Add Plant Screen */}
      <Tabs.Screen
        name="AddPlantScreen"
        options={{
          title: "Add Plant",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="plus-circle" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
