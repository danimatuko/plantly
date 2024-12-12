// app/_layout.tsx
import { PlantProvider } from '../context/PlantContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <PlantProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#2e8b57' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
      </Stack>
    </PlantProvider>
  );
}

