import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";

interface PlantCardProps {
  name: string;
  description: string;
  onViewDetails: () => void;
}

const PlantCard: React.FC<PlantCardProps> = ({
  name,
  description,
  onViewDetails,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerContainer}>
        <FontAwesome
          name="info-circle"
          size={24}
          color="#85A98F"
          style={styles.infoIcon}
          onPress={onViewDetails}
        />
        <Text style={styles.plantName}>{name}</Text>
      </View>
      <Text style={styles.plantDescription}>{description}</Text>
      <TouchableOpacity onPress={onViewDetails} style={styles.detailsLink}>
        <Text style={styles.detailsText}>View Details</Text>
        <FontAwesome name="chevron-right" size={18} color="#85A98F" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    flexShrink: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoIcon: {
    marginRight: 10,
  },
  plantName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4F5D75",
    textTransform: "capitalize",
  },
  plantDescription: {
    fontSize: 16,
    color: "#7D8B8C",
    marginBottom: 20,
    lineHeight: 22,
    flexShrink: 1,
  },
  detailsLink: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsText: {
    fontSize: 16,
    color: "#85A98F",
    marginRight: 8,
  },
});

export default PlantCard;
