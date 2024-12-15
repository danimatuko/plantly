import React, { createContext, useState, ReactNode, useContext } from "react";
import plantsData from "./data/initialPlants";
import * as Notifications from "expo-notifications";

/**
 * Represents a plant with an ID, name, and description.
 */
export interface Plant {
  id: string;
  name: string;
  description: string;
  lastWatered: string; // Date in ISO string format
  wateringFrequency: number; // Number of days
  notificationId?: string; // Optional field to store the notification ID
}

/**
 * Context type for the PlantContext, including the plants array and the addPlant function.
 */
interface PlantContextType {
  plants: Plant[];
  addPlant: (plant: Plant) => void;
  deletePlant: (id: Plant["id"]) => void;
  editPlant: (updatedPlant: Plant) => void;
  scheduleWateringNotification: (plant: Plant) => Promise<void>;
  cancelWateringNotification: (notificationId: string) => Promise<void>;
}

/**
 * Creates the PlantContext with an initial value of undefined.
 */
const PlantContext = createContext<PlantContextType | undefined>(undefined);

/**
 * Initial data for the plants.
 */
const initialPlants = plantsData;

/**
 * Provider component for the PlantContext.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components to be rendered within the provider.
 * @returns {JSX.Element} The PlantContext provider with the current plants and addPlant function.
 */
export const PlantProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [plants, setPlants] = useState<Plant[]>(initialPlants);

  const addPlant = (plant: Plant) => {
    setPlants((prevPlants) => [...prevPlants, plant]);
    scheduleWateringNotification(plant); // Ensure notifications are scheduled when a plant is added
  };

  const editPlant = (updatedPlant: Plant) => {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === updatedPlant.id ? updatedPlant : plant,
      ),
    );
    scheduleWateringNotification(updatedPlant); // Ensure notifications are updated on edit
  };

  const deletePlant = async (id: string) => {
    // Find the plant to get the notificationId
    const plantToDelete = plants.find((plant) => plant.id === id);

    if (plantToDelete && plantToDelete.notificationId) {
      // Cancel the notification for the plant
      await cancelWateringNotification(plantToDelete.notificationId);
    }

    // Delete the plant from the list
    setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
  };

  const scheduleWateringNotification = async (plant: Plant) => {
    const nextWateringDate = new Date(plant.lastWatered);
    nextWateringDate.setDate(
      nextWateringDate.getDate() + plant.wateringFrequency,
    );

    // Schedule a local notification
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: `Time to Water ${plant.name}!`,
        body: `Don't forget to water your ${plant.name} today.`,
      },
      trigger: {
        year: nextWateringDate.getFullYear(),
        month: nextWateringDate.getMonth(),
        day: nextWateringDate.getDate(),
        hour: 9, // Set a specific hour for the notification (e.g., 9 AM)
        minute: 0,
      },
    });

    // Save the notification ID in the plant object
    const updatedPlant = { ...plant, notificationId };
    setPlants((prevPlants) =>
      prevPlants.map((p) => (p.id === plant.id ? updatedPlant : p)),
    );
  };

  const cancelWateringNotification = async (notificationId: string) => {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  };

  return (
    <PlantContext.Provider
      value={{
        plants,
        addPlant,
        deletePlant,
        editPlant,
        scheduleWateringNotification,
        cancelWateringNotification,
      }}
    >
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
    throw new Error("usePlants must be used within a PlantProvider");
  }
  return context;
};
