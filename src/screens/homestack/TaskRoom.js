import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TaskRoom() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Room</Text>
      <Text style={styles.subtitle}>Task room Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // vertical center
    alignItems: "center", // horizontal center
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
  },
});
