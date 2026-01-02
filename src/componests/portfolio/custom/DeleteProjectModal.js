import React, { useRef, useEffect ,useState} from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Toast from "react-native-toast-message";
import api from "../../../config/api";
const DeleteProjectModal = ({
  visible,
  onClose,
  onDelete,
  projectId,
  token,
  navigation
}) => {

      const [loading, setLoading] = useState(false);

console.log(projectId)
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      opacityAnim.setValue(0);
      scaleAnim.setValue(0.9);
    }
  }, [visible]);


  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await api.post(
        "/delete_project",
        { project_id: projectId }, // 🔥 REQUIRED PAYLOAD
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res?.data?.success) {
        Toast.show({
          type: "success",
          text1: "Project Deleted",
          text2: "Project permanently removed",
        });

        onClose();

  setTimeout(() => {
  navigation.replace("Portfolio");
}, 400);


      } else {
        throw new Error("Delete failed");
      }
    }  catch (err) {
  console.error("❌ DELETE PROJECT ERROR");

  if (err?.response) {
    // 🔴 Backend responded with error
    console.error("Status:", err.response.status);
    console.error("Data:", err.response.data);
    console.error("Headers:", err.response.headers);
  } else if (err?.request) {
    // 🟠 Request gaya but response nahi aaya
    console.error("No response received:", err.request);
  } else {
    // 🟡 JS / config error
    console.error("Error message:", err.message);
  }

  Toast.show({
    type: "error",
    text1: "Delete Failed",
    text2:
      err?.response?.data?.message ||
      err?.message ||
      "Unable to delete project",
  });
}
 finally {
      setLoading(false);
    }
  };

const handleGoToPortfolio = () => {
  onClose();

  setTimeout(() => {
  navigation.replace("Portfolio");
}, 400);


};

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"   // ❌ default animation band
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.modal,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>Delete Project</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* BODY */}
          <Text style={styles.desc}>
            Are you sure you want to delete this project?
          </Text>
          <Text style={styles.warn}>
            This action cannot be undone and will permanently
            remove the project.
          </Text>

          {/* ACTION */}
          <TouchableOpacity
            style={[
              styles.deleteBtn,
              loading && { opacity: 0.7 },
            ]}
            disabled={loading}
            //onPress={handleGoToPortfolio}
            onPress={handleDelete}
            activeOpacity={0.8}
          >
            <Text style={styles.deleteText}>
              {loading ? "Deleting..." : "Delete Project"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default DeleteProjectModal;
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "86%",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },
  desc: {
    marginTop: 14,
    fontSize: 14,
    color: "#333",
  },
  warn: {
    marginTop: 8,
    fontSize: 13,
    color: "#777",
    lineHeight: 18,
  },
  deleteBtn: {
    marginTop: 22,
    backgroundColor: "#E53935",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  deleteText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
