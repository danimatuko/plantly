import { Link } from "expo-router";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Plantly! 🌱</Text>
      <Link href="/plantlist" asChild>
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
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2e8b57",
  },
});

