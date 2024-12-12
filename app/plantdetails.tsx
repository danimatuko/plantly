import { View, Text, StyleSheet, Button, Image } from "react-native";
import { useRouter } from "expo-router";  // Used to navigate between screens

// Dummy data for plant details (you will later replace this with dynamic data)
const plant = {
  name: "Aloe Vera",
  description:
    "Aloe Vera is a succulent plant known for its medicinal properties. It requires minimal care and thrives in bright, indirect light.",
  careInstructions:
    "Water every 2-3 weeks. Avoid overwatering and ensure the pot has proper drainage.",
  image: "https://example.com/aloe-vera.jpg",  // Placeholder image link
};

export default function PlantDetails() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={{ uri: plant.image }} style={styles.image} />
      <Text style={styles.plantName}>{plant.name}</Text>
      <Text style={styles.description}>{plant.description}</Text>
      <Text style={styles.careTitle}>Care Instructions</Text>
      <Text style={styles.careInstructions}>{plant.careInstructions}</Text>
      <Button
        title="Back to My Plants"
        color="#2e8b57"
        onPress={() => router.push("/plantlist")}
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
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  plantName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2e8b57",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
    marginHorizontal: 30,
  },
  careTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2e8b57",
    marginBottom: 10,
  },
  careInstructions: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
    marginHorizontal: 30,
  },
});

