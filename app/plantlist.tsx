import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const plants = [
    { id: '1', name: 'Aloe Vera' },
    { id: '2', name: 'Cactus' },
    { id: '3', name: 'Snake Plant' },
];

export default function PlantList() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Plants</Text>

            <FlatList
                data={plants}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.plantItem}>
                        <Text style={styles.plantName}>{item.name}</Text>
                        <Link href={`/plantdetails/${item.id}`} asChild>
                            <Button title="View Details" color="green" />
                        </Link>
                    </View>
                )}
            />
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
    plantItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#ffffff',
        padding: 10,
        width: '90%',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    plantName: {
        fontSize: 18,
        color: '#2e8b57',
    },
});

