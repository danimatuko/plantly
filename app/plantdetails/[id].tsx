import { View, Text, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function PlantDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  if (!id) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Plant ID is missing</Text>
      </View>
    );
  }

  const plant = {
    id: id,
    name: 'Aloe Vera',
    description: 'Aloe Vera is a succulent plant species of the genus Aloe.',
  };

  const handleBack = () => {
    router.push('/plantlist');  // Use the `router.push` to navigate back
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{plant.name}</Text>
      <Text style={styles.description}>{plant.description}</Text>

      {/* Use button to navigate back */}
      <Button title="Back to Plant List" color="limegreen" onPress={handleBack} />
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
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#4b7c57',
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});

