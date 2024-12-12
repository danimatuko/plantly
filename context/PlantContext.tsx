// context/PlantContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface Plant {
  id: string;
  name: string;
  description: string;
}

interface PlantContextType {
  plants: Plant[];
  addPlant: (plant: Plant) => void;
}

const PlantContext = createContext<PlantContextType | undefined>(undefined);

export const PlantProvider = ({ children }: { children: ReactNode }) => {
  const [plants, setPlants] = useState<Plant[]>([
    { id: '1', name: 'Aloe Vera', description: 'A succulent plant with medicinal properties' },
    { id: '2', name: 'Cactus', description: 'A plant with spines that thrive in dry conditions' },
    { id: '3', name: 'Ficus', description: 'A popular indoor plant' },
  ]);

  const addPlant = (plant: Plant) => {
    setPlants((prevPlants) => [...prevPlants, plant]);
  };

  return (
    <PlantContext.Provider value={{ plants, addPlant }}>
      {children}
    </PlantContext.Provider>
  );
};

export const usePlants = () => {
  const context = React.useContext(PlantContext);
  if (!context) {
    throw new Error('usePlants must be used within a PlantProvider');
  }
  return context;
};

