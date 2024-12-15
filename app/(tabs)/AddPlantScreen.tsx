import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { usePlants } from "../../context/PlantContext";
import { useRouter } from "expo-router";

export default function AddPlantScreen() {
  const { addPlant } = usePlants();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [wateringFrequency, setWateringFrequency] = useState<number | null>(
    null,
  );
  const [lastWatered, setLastWatered] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAddPlant = () => {
    if (!name.trim() || !description.trim() || wateringFrequency === null) {
      setError("Please fill in all fields");
      return;
    }

    if (wateringFrequency <= 0) {
      setError("Watering frequency must be a positive number");
      return;
    }

    const newPlant = {
      id: Date.now().toString(),
      name,
      description,
      wateringFrequency,
      lastWatered: lastWatered.toISOString(),
    };

    addPlant(newPlant);
    Alert.alert("Success", "Plant added successfully!");
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Plant Name"
        value={name}
        onChangeText={setName}
      />

      {/* Description Input */}
      <TextInput
        style={styles.input}
        placeholder="Plant Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Watering Frequency Input */}
      <TextInput
        style={styles.input}
        placeholder="Watering Frequency (days)"
        value={wateringFrequency?.toString() || ""}
        onChangeText={(text) => setWateringFrequency(Number(text) || null)}
        keyboardType="numeric"
      />

      {/* Last Watered Field Styled as Input */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <View style={styles.input}>
          <Text style={{ color: lastWatered ? "#000" : "#aaa" }}>
            {lastWatered
              ? lastWatered.toDateString()
              : "Select Last Watered Date"}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Date Picker */}
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

      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Add Button */}
      <Button title="Add Plant" onPress={handleAddPlant} color="#2e8b57" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f5fffa",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#2e8b57",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
