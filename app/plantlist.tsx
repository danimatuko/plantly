import { View, Text, StyleSheet } from "react-native";

export default function PlantList() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Plant List 🌼</Text>
            <Text style={styles.subtitle}>Coming soon...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fffa",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#2e8b57",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#555",
    },
});

