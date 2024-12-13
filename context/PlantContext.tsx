import React, { createContext, useState, ReactNode, useContext } from 'react';

/**
 * Represents a plant with an ID, name, and description.
 */
interface Plant {
  id: string;
  name: string;
  description: string;
}

/**
 * Context type for the PlantContext, including the plants array and the addPlant function.
 */
interface PlantContextType {
  plants: Plant[];
  addPlant: (plant: Plant) => void;
}

/**
 * Creates the PlantContext with an initial value of undefined.
 */
const PlantContext = createContext<PlantContextType | undefined>(undefined);

/**
 * Initial data for the plants.
 */
const initialPlants: Plant[] = [
  { id: '1', name: 'Aloe Vera', description: 'A succulent plant with medicinal properties' },
  { id: '2', name: 'Cactus', description: 'A plant with spines that thrive in dry conditions' },
  { id: '3', name: 'Ficus', description: 'A popular indoor plant' },
];

/**
 * Provider component for the PlantContext.
 * 
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components to be rendered within the provider.
 * @returns {JSX.Element} The PlantContext provider with the current plants and addPlant function.
 */
export const PlantProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [plants, setPlants] = useState<Plant[]>(initialPlants);

  const addPlant = (plant: Plant) => {
    setPlants((prevPlants) => [...prevPlants, plant]);
  };

  return (
    <PlantContext.Provider value={{ plants, addPlant }}>
      {children}
    </PlantContext.Provider>
  );
};

/**
 * Custom hook to use the PlantContext.
 * 
 * @throws {Error} If used outside of a PlantProvider.
 * @returns {PlantContextType} The current context value.
 */
export const usePlants = (): PlantContextType => {
  const context = useContext(PlantContext);
  if (!context) {
    throw new Error('usePlants must be used within a PlantProvider');
  }
  return context;
};

