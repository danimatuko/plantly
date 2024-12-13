import React from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { usePlants } from "../context/PlantContext";
import { Plant } from "../context/PlantContext"; // Import the Plant type

const PlantListScreen = () => {
  const { plants } = usePlants();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Plant List</Text>
      <Button
        title="Add New Plant"
        color="limegreen"
        onPress={() => router.push("/addplant")}
      />
      <FlatList
        data={plants}
        keyExtractor={(plant) => plant.id}
        renderItem={({ item: plant }: { item: Plant }) => (
          <View style={styles.plantItem}>
            <Text style={styles.plantName}>{plant.name}</Text>
            <Text style={styles.plantDescription}>{plant.description}</Text>
            <Button
              title="View Details"
              color="limegreen"
              onPress={() => router.push(`/plantdetails/${plant.id}`)} // Navigate directly
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5fffa",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2e8b57",
  },
  plantItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#e0f7e0",
    borderRadius: 8,
  },
  plantName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2e8b57",
  },
  plantDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
});

export default PlantListScreen;
