import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router"; // Import useRouter hook for navigation
import { usePlants } from "../context/PlantContext"; // Import the context

export default function PlantListScreen() {
    const { plants } = usePlants(); // Access the plant data from context
    const router = useRouter(); // Initialize the useRouter hook

    // Function to navigate to the Add Plant screen
    const navigateToAddPlant = () => {
        router.push("/addplant");
    };

    // Function to navigate to the Plant Details screen
    const navigateToPlantDetails = (id: string) => {
        router.push(`/plantdetails/${id}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Plant List</Text>

            {/* Button for navigating to Add Plant screen */}
            <Button title="Add New Plant" color="limegreen" onPress={navigateToAddPlant} />

            <FlatList
                data={plants} // Use the context data
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.plantItem}>
                        <Text style={styles.plantName}>{item.name}</Text>
                        <Text style={styles.plantDescription}>{item.description}</Text>
                        <Button
                            title="View Details"
                            color="limegreen"
                            onPress={() => navigateToPlantDetails(item.id)} // Navigate to plant details using router
                        />
                    </View>
                )}
            />
        </View>
    );
}

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

