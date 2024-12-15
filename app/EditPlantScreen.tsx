import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { usePlants } from "../context/PlantContext";

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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
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
  );

  const handleSave = () => {
    if (!name.trim() || !description.trim() || !wateringFrequency.trim()) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (isNaN(Number(wateringFrequency)) || Number(wateringFrequency) <= 0) {
      Alert.alert("Error", "Watering frequency must be a positive number");
      return;
    }

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

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#9BA5A0"
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        placeholderTextColor="#9BA5A0"
      />

      <TextInput
        style={styles.input}
        placeholder="Watering Frequency (days)"
        value={wateringFrequency}
        onChangeText={setWateringFrequency}
        keyboardType="numeric"
        placeholderTextColor="#9BA5A0"
      />

      <TextInput
        style={styles.input}
        placeholder="Last Watered (YYYY-MM-DD)"
        value={lastWatered}
        onChangeText={setLastWatered}
        placeholderTextColor="#9BA5A0"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5fffa",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#85A98F",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#8C9B7A",
    marginBottom: 20,
    fontSize: 16,
    color: "#555",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#85A98F",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#7D8B8C",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  backButton: {
    marginTop: 20,
    alignSelf: "center",
  },
  backButtonText: {
    fontSize: 16,
    color: "#85A98F",
    fontWeight: "500",
  },
});
