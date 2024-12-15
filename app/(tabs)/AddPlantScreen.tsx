import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { usePlants } from "../../context/PlantContext";
import { useRouter } from "expo-router";

export default function AddPlantScreen() {
  const { addPlant } = usePlants();
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [wateringFrequency, setWateringFrequency] = useState("");
  const [lastWatered, setLastWatered] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddPlant = () => {
    if (!name.trim() || !description.trim() || !wateringFrequency.trim()) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (isNaN(Number(wateringFrequency)) || Number(wateringFrequency) <= 0) {
      Alert.alert("Error", "Watering frequency must be a positive number");
    }

    const newPlant = {
      id: Date.now().toString(),
      name,
      description,
      wateringFrequency: Number(wateringFrequency),
      lastWatered: lastWatered.toISOString(),
    };

    addPlant(newPlant);

    Alert.alert("Success", "Plant added successfully!", [
      {
        text: "OK",
        onPress: () => router.push(`/PlantDetailsScreen/${newPlant.id}`),
      },
    ]);

    router.push(`/PlantDetailsScreen/${newPlant.id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Plant</Text>

      {/* Plant Name */}
      <TextInput
        style={styles.input}
        placeholder="Plant Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#9BA5A0"
      />

      {/* Description */}
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        placeholderTextColor="#9BA5A0"
      />

      {/* Watering Frequency */}
      <TextInput
        inputMode="numeric"
        style={styles.input}
        placeholder="Watering Frequency (days)"
        value={wateringFrequency}
        onChangeText={setWateringFrequency}
        keyboardType="numeric"
        placeholderTextColor="#9BA5A0"
      />

      {/* Last Watered */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <View style={styles.input}>
          <Text style={{ color: "#555" }}>
            {lastWatered
              ? lastWatered.toDateString()
              : "Select Last Watered Date"}
          </Text>
        </View>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={lastWatered}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setLastWatered(date);
          }}
        />
      )}

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddPlant}>
          <Text style={styles.buttonText}>Add Plant</Text>
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
  addButton: {
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
});
