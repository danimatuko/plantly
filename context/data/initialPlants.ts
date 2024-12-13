import { Plant } from "../PlantContext";

/**
 * Initial data for the plants.
 */
const initialPlants: Plant[] = [
  {
    id: "1",
    name: "Aloe Vera",
    description: "A succulent plant with medicinal properties",
    lastWatered: new Date().toISOString(), // Today's date
    wateringFrequency: 7, // Water every 7 days
  },
  {
    id: "2",
    name: "Cactus",
    description: "A plant with spines that thrive in dry conditions",
    lastWatered: new Date().toISOString(), // Today's date
    wateringFrequency: 14, // Water every 14 days
  },
  {
    id: "3",
    name: "Ficus",
    description: "A popular indoor plant",
    lastWatered: new Date().toISOString(), // Today's date
    wateringFrequency: 5, // Water every 5 days
  },
  {
    id: "4",
    name: "Snake Plant",
    description: "A hardy plant that requires minimal care",
    lastWatered: new Date().toISOString(),
    wateringFrequency: 10,
  },
  {
    id: "5",
    name: "Peace Lily",
    description: "A plant that thrives in indirect light and purifies air",
    lastWatered: new Date().toISOString(),
    wateringFrequency: 3,
  },
];

export default initialPlants;
