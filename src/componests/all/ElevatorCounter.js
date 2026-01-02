import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { Spacing, Radius, fontScale } from "../../constants/Dimmence";
import Colors from "../../constants/Colors";

export default function ElevatorCounter({
  label,
  value,
  onChange,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.counterBox}>
        {/* MINUS */}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => onChange(Math.max(0, value - 1))}
        >
          <Feather name="minus" size={16} color="#fff" />
        </TouchableOpacity>

        {/* VALUE */}
        <Text style={styles.value}>{value}</Text>

        {/* PLUS */}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => onChange(value + 1)}
        >
          <Feather name="plus" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "30%",
  },

  label: {
    fontSize: fontScale(13),
    color: "#555",
    marginBottom: Spacing.xs,
    fontWeight: "600",
    textAlign: "center",
  },

  counterBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal:Spacing.sm,
    backgroundColor: "#fff",
  },

  btn: {
    backgroundColor: Colors.primary || "#FF6A00",
    borderRadius: Radius.sm,
    padding: Spacing.xs,
  },

  value: {
    fontSize: fontScale(16),
    fontWeight: "700",
    color: "#111",
    minWidth: 20,
    textAlign: "center",
  },
});
