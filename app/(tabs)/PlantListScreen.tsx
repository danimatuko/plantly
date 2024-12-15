import React from "react";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { usePlants } from "../../context/PlantContext";
import { Plant } from "../../context/PlantContext";
import PlantCard from "@/components/PlantCard";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import PlantlyButton from "@/components/PlantlyButton";

// Helper function to calculate the next watering date
const getNextWateringDate = (lastWatered: string, frequency: number) => {
  const nextDate = new Date(lastWatered);
  nextDate.setDate(nextDate.getDate() + frequency);
  return nextDate.toDateString();
};

const PlantListScreen = () => {
  const { plants } = usePlants();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌱 My Plants</Text>

      <PlantlyButton
        title="Add New Plant"
        onPress={() => router.push("/AddPlantScreen")}
      >
        <FontAwesome name="plus" size={24} color="#fff" />
      </PlantlyButton>

      <FlatList
        data={plants}
        keyExtractor={(plant) => plant.id}
        renderItem={({ item: plant }: { item: Plant }) => (
          <PlantCard
            name={plant.name}
            description={plant.description}
            lastWatered={new Date(plant.lastWatered).toDateString()}
            nextWatering={getNextWateringDate(
              plant.lastWatered,
              plant.wateringFrequency,
            )}
            onViewDetails={() => router.push(`/PlantDetailsScreen/${plant.id}`)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No plants yet. Start by adding a new plant!
          </Text>
        }
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f5fffa",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#85A98F", // Accent color for title
    marginBottom: 15,
    textAlign: "center",
    lineHeight: 40, // Extra line height for better spacing
  },
  addButton: {
    backgroundColor: "#85A98F", // Using the same accent color
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 30,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  emptyText: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
    marginTop: 20,
  },
});

export default PlantListScreen;
