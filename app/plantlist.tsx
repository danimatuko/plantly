import { View, Text, Button, StyleSheet } from "react-native";
import { Link } from "expo-router";  // Navigation from plant list to details

export default function PlantList() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Plant List 🌱</Text>

            {/* Hardcoded plant names for now */}
            <View style={styles.plantCard}>
                <Text style={styles.plantName}>Aloe Vera</Text>
                <Link href="/plantdetails" asChild>
                    <Button title="View Details" color="#2e8b57" />
                </Link>
            </View>

            <View style={styles.plantCard}>
                <Text style={styles.plantName}>Snake Plant</Text>
                <Link href="/plantdetails" asChild>
                    <Button title="View Details" color="#2e8b57" />
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fffa",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#2e8b57",
    },
    plantCard: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        width: "80%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    plantName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2e8b57",
    },
});

