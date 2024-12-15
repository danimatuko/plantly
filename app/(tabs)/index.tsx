import PlantlyButton from "@/components/PlantlyButton";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Image } from "react-native";

export default function HomeScreen() {
  const router = useRouter(); // Use router for navigation

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Image
        source={require("@/assets/images/icon.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome to Plantly</Text>
      <Text style={styles.subtitle}>
        Your personal assistant to keep your plants happy and healthy.
      </Text>

      {/* Navigation Buttons */}
      <PlantlyButton
        title="View My Plants"
        onPress={() => router.push("/PlantListScreen")}
      />
      <PlantlyButton
        title="Add a New Plant"
        color="#6b8e23"
        onPress={() => router.push("/AddPlantScreen")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fffa",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2e8b57",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b8e23",
    textAlign: "center",
    marginBottom: 30,
    paddingInline: 25,
  },
});
