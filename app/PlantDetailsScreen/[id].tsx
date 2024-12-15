import { useRouter, useLocalSearchParams } from "expo-router";
import { usePlants } from "../../context/PlantContext";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

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

  const getNextWateringDate = (lastWatered: string, frequency: number) => {
    const nextDate = new Date(lastWatered);
    nextDate.setDate(nextDate.getDate() + frequency);
    return nextDate.toDateString();
  };

  const handleWaterPlant = () => {
    const updatedPlant = { ...plant, lastWatered: new Date().toISOString() };
    editPlant(updatedPlant); // Update plant in context
  };

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/icon.png")} style={styles.icon} />

      <Text style={styles.title}>{plant.name}</Text>

      <Text style={styles.details}>{plant.description}</Text>

      <View style={styles.waterInfoContainer}>
        <FontAwesome name="tint" size={22} color="#8C9B7A" />
        <Text style={styles.infoText}>
          Last Watered: {new Date(plant.lastWatered).toDateString()}
        </Text>
      </View>

      <View style={styles.waterInfoContainer}>
        <FontAwesome name="calendar" size={22} color="#8C9B7A" />
        <Text style={styles.infoText}>
          Next Watering:{" "}
          {getNextWateringDate(plant.lastWatered, plant.wateringFrequency || 7)}
        </Text>
      </View>

      <TouchableOpacity style={styles.waterButton} onPress={handleWaterPlant}>
        <FontAwesome name="tint" size={24} color="#fff" />
        <Text style={styles.waterButtonText}>Mark as Watered</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            router.push({
              pathname: "/EditPlantScreen",
              params: { id: plant.id },
            })
          }
        >
          <FontAwesome name="edit" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            deletePlant(plant.id);
            router.replace("/PlantListScreen");
          }}
        >
          <FontAwesome name="trash" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <FontAwesome name="arrow-left" size={24} color="#fff" />
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5fffa",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  title: {
    fontSize: 34,
    fontWeight: "600",
    color: "#85A98F",
    marginBottom: 15,
    textAlign: "center",
    lineHeight: 40,
  },
  details: {
    fontSize: 18,
    color: "#7D8B8C",
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  waterInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#8C9B7A",
    marginLeft: 8,
  },
  waterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#85A98F",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    width: "80%",
  },
  waterButtonText: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 8,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#A3B88C", // Softer green for edit
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
    width: "40%",
    justifyContent: "center",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5B7B1", // Soft red for delete
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
    width: "40%",
    justifyContent: "center",
  },
  actionButtonText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 8,
    lineHeight: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2e8b57", // Green for back action
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 8,
  },
  errorText: {
    fontSize: 20,
    color: "red",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
});
