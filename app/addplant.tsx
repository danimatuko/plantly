import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { usePlants } from "../context/PlantContext"; // Import the context

import { useRouter } from 'expo-router'; // Import useRouter

export default function AddPlantScreen() {
  const { addPlant } = usePlants(); // Access the addPlant function from context
  const [name, setName] = useState('');
  const [description, setDescription] = useState(''); // Renamed 'details' to 'description'
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAddPlant = () => {
    if (name && description) { // Validate against 'description' instead of 'details'
      const newPlant = {
        id: Date.now().toString(),
        name,
        description, // Now assigning 'description' properly
      };
      addPlant(newPlant);
      router.back(); // Go back to the previous screen (plant list)
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Plant Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Plant Description" // Updated the placeholder
        value={description} // Updated value to 'description'
        onChangeText={setDescription} // Updated onChangeText to 'setDescription'
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Button title="Add Plant" onPress={handleAddPlant} color="#2e8b57" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fffa',
    padding: 20,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#2e8b57',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 4,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

