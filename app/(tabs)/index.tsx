import PlantlyButton from "@/components/PlantlyButton";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  const router = useRouter(); // Use router for navigation

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/icon.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome to Plantly</Text>
      <Text style={styles.subtitle}>
        Your personal assistant to keep your plants happy and healthy.
      </Text>

      <PlantlyButton
        title="View My Plants"
        onPress={() => router.push("/PlantListScreen")}
      />
      <PlantlyButton
        title="Add a New Plant"
        color="#8C9B7A"
        onPress={() => router.push("/AddPlantScreen")}
      />

      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={styles.footerText}>Go to Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FFFA", // Soft background color
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#85A98F", // Natural green
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#6B8E23", // Olive green
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 30, // Ensure text does not overflow on smaller screens
  },
  footerText: {
    fontSize: 14,
    color: "#2E8B57", // Deep green
    marginTop: 20,
    textDecorationLine: "underline", // Underline text for interaction
  },
});
