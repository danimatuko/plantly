import { usePlants } from '@/context/PlantContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { styles } from './addplant';


export default function AddPlantScreen() {
  const { addPlant } = usePlants(); // Access the addPlant function from context
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const router = useRouter();

  const handleAddPlant = () => {
    if (name && details) {
      addPlant({ id: Date.now().toString(), name, details });
      router.back(); // Go back to the previous screen (plant list)
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Plant Name"
        value={name}
        onChangeText={setName} />
      <TextInput
        style={styles.input}
        placeholder="Plant Details"
        value={details}
        onChangeText={setDetails} />
      <Button title="Add Plant" onPress={handleAddPlant} color="#2e8b57" />
    </View>
  );
}

