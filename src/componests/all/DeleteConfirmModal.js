import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Modal,
} from "react-native";
import Colors from "../../constants/Colors";

export default function DeleteConfirmModal({
  visible,
  tag,
  onCancel,
  onConfirm,
}) {
  const scale = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.card,
            {
              transform: [{ scale }],
              opacity,
            },
          ]}
        >
          <Text style={styles.title}>Delete Elevator</Text>
          <Text style={styles.desc}>
            Are you sure you want to delete{" "}
            <Text style={{ fontWeight: "700" }}>{tag}</Text>?
          </Text>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={onCancel}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={onConfirm}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  desc: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  cancelText: {
    color: "#666",
    fontWeight: "600",
  },
  deleteBtn: {
    backgroundColor: Colors.error || "#FF4D4F",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "700",
  },
});
