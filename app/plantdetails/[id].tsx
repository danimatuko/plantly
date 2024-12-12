import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { usePlants } from '../../context/PlantContext'; // Import the correct hook
import { router, useLocalSearchParams } from 'expo-router'; // Import useLocalSearchParams hook

// Define a type for Plant to avoid implicit any errors (if not already defined in context)
interface Plant {
  id: string;
  name: string;
  description: string;
}

export default function PlantDetailsScreen() {
  const { id } = useLocalSearchParams(); // Access the plant id using useLocalSearchParams
  const { plants } = usePlants(); // Access the plant data from context

  // Ensure that the 'id' is a string and check for the plant data
  if (!id || typeof id !== 'string') {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Invalid plant ID</Text>
      </View>
    );
  }

  // Find the selected plant by id
  const plant = plants.find((p: Plant) => p.id === id);

  if (!plant) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Plant not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{plant.name}</Text>
      <Text style={styles.details}>{plant.description}</Text>
      <Button title="Go Back" onPress={() => router.back()} color="#2e8b57" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fffa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2e8b57',
  },
  details: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

