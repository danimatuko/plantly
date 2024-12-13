import { Link } from "expo-router";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Plantly! 🌱</Text>
      {/* Correct route to PlantListScreen */}
      <Link href="/PlantListScreen" asChild>
        <Button title="View My Plants" color="limegreen" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fffa",
    padding: 20, // Add padding for better spacing
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#2e8b57",
    textAlign: "center", // Center the title
  },
});
