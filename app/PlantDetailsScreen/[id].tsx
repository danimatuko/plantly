import { useRouter, useLocalSearchParams } from "expo-router";
import { usePlants } from "../../context/PlantContext";
import { View, Text, StyleSheet, Button } from "react-native";

export default function PlantDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { plants, deletePlant, editPlant } = usePlants();

  // Find the plant by ID
  const plant = plants.find((p) => p.id === id);

  if (!plant) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Plant not found</Text>
      </View>
    );
  }

  // Helper function to calculate the next watering date
  const getNextWateringDate = (lastWatered: string, frequency: number) => {
    const nextDate = new Date(lastWatered);
    nextDate.setDate(nextDate.getDate() + frequency);
    return nextDate.toDateString();
  };

  // Handle marking the plant as watered
  const handleWaterPlant = () => {
    const updatedPlant = { ...plant, lastWatered: new Date().toISOString() };
    editPlant(updatedPlant); // Update the plant in the context
  };

  return (
    <View style={styles.container}>
      {/* Plant Name */}
      <Text style={styles.title}>{plant.name}</Text>

      {/* Description */}
      <Text style={styles.details}>{plant.description}</Text>

      {/* Watering Information */}
      <Text style={styles.infoText}>
        Last Watered: {new Date(plant.lastWatered).toDateString()}
      </Text>
      <Text style={styles.infoText}>
        Next Watering:{" "}
        {getNextWateringDate(plant.lastWatered, plant.wateringFrequency || 7)}{" "}
        {/* Default frequency to 7 days */}
      </Text>

      {/* Mark as Watered Button */}
      <Button
        title="Mark as Watered"
        color="#4682b4"
        onPress={handleWaterPlant}
      />

      {/* Edit and Delete Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title="Edit Plant"
          color="orange"
          onPress={() =>
            router.push({
              pathname: "/EditPlantScreen", // Correct route for Edit Plant screen
              params: { id: plant.id },
            })
          }
        />
        <Button
          title="Delete Plant"
          color="red"
          onPress={() => {
            deletePlant(plant.id);
            router.replace("/PlantListScreen"); // Go back to the Plant List Screen
          }}
        />
      </View>

      {/* Back Button */}
      <Button title="Go Back" color="#2e8b57" onPress={() => router.back()} />
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2e8b57",
  },
  details: {
    fontSize: 18,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  infoText: {
    fontSize: 16,
    color: "#6b8e23",
    marginBottom: 10,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 20,
  },
});
