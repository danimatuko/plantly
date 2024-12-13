import { useRouter, useLocalSearchParams } from 'expo-router';
import { usePlants } from '../../context/PlantContext';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function PlantDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { plants, deletePlant, editPlant } = usePlants();

  const plant = plants.find((p) => p.id === id);

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

      {/* Delete Button */}
      <Button
        title="Delete Plant"
        color="red"
        onPress={() => {
          deletePlant(plant.id); // Call delete function
          router.replace('/');   // Navigate back to the Plant List Screen
        }}
      />


      <Button
        title="Edit Plant"
        onPress={() => router.push({ pathname: '/edit-plant', params: { id: plant.id } })}
      />


      {/* Back Button */}
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

