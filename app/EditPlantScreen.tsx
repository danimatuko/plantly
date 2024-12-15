import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { usePlants } from "../context/PlantContext"; // Correct import path

export default function EditPlantScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { plants, editPlant } = usePlants();

  // Find the plant by ID
  const plant = plants.find((p) => p.id === id);

  // If the plant is not found, show an error
  if (!plant) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Plant not found</Text>
        <Button title="Go Back" onPress={() => router.back()} color="#2e8b57" />
      </View>
    );
  }

  // Local state for updated values
  const [name, setName] = useState(plant.name);
  const [description, setDescription] = useState(plant.description);
  const [wateringFrequency, setWateringFrequency] = useState(
    plant.wateringFrequency.toString(),
  );
  const [lastWatered, setLastWatered] = useState(
    new Date(plant.lastWatered).toISOString().split("T")[0],
  ); // Format date as YYYY-MM-DD

  // Handler for saving changes
  const handleSave = () => {
    if (!name.trim() || !description.trim() || !wateringFrequency.trim()) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (isNaN(Number(wateringFrequency)) || Number(wateringFrequency) <= 0) {
      Alert.alert("Error", "Watering frequency must be a positive number");
      return;
    }

    // Call editPlant from context with updated values
    editPlant({
      id: plant.id,
      name,
      description,
      wateringFrequency: Number(wateringFrequency),
      lastWatered: new Date(lastWatered).toISOString(),
    });

    Alert.alert("Success", "Plant updated successfully!", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Plant</Text>

      {/* Input for Name */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      {/* Input for Description */}
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Input for Watering Frequency */}
      <Text style={styles.label}>Watering Frequency (days):</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 7"
        value={wateringFrequency}
        onChangeText={setWateringFrequency}
        keyboardType="numeric"
      />

      {/* Input for Last Watered Date */}
      <Text style={styles.label}>Last Watered Date:</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={lastWatered}
        onChangeText={setLastWatered}
      />

      {/* Save Button */}
      <Button title="Save Changes" onPress={handleSave} color="#2e8b57" />

      {/* Cancel Button */}
      <Button title="Cancel" onPress={() => router.back()} color="grey" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f5fffa",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2e8b57",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#555",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginBottom: 20,
  },
});
