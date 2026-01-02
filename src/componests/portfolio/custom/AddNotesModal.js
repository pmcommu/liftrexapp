import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Animated,
  ScrollView,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import {
  Spacing,
  Radius,
  fontScale,
  verticalScale,
} from "../../../constants/Dimmence";
import api from "../../../config/api";
import { useSelector } from "react-redux";

export default function AddNotesModal({
  visible,
  onClose,
  onSave,
}) {
  const [notes, setNotes] = useState([""]);

  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const token = useSelector(state => state.auth.token);
   const inquiry = useSelector(
      (state) => state.selectedInquiry.inquiry
    );
  
     const { project, loading, error } = useSelector(
      (state) => state.projectDetails
    );

    console.log('proaor',project)
    const projectId = inquiry?._id ;

useEffect(() => {
  if (!visible) return;

  // Project-level notes (highest priority)
  const projectNotes =
    project?.proposalDetails?.notes;

  // Inquiry-level notes (fallback)
  const inquiryNotes =
    inquiry?.notes;

  if (Array.isArray(projectNotes) && projectNotes.length > 0) {
    // ✅ Use project notes if available
    setNotes(projectNotes);
  } else if (Array.isArray(inquiryNotes) && inquiryNotes.length > 0) {
    // ✅ If project is null OR has no notes → use inquiry notes
    setNotes(inquiryNotes);
  } else {
    // ✅ Default empty state
    setNotes([""]);
  }
}, [
  visible,
  project?.proposalDetails?.notes, // 👈 important
  inquiry?.notes,                  // 👈 important
]);




  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose?.();
    });
  };

  const handleChange = (text, index) => {
    const updated = [...notes];
    updated[index] = text;
    setNotes(updated);
  };

  const addMore = () => {
    setNotes([...notes, ""]);
  };

  // ✅ REMOVE FIELD
  const removeField = (index) => {
    const updated = notes.filter((_, i) => i !== index);
    setNotes(updated);
  };
const handleSave = async () => {
  const filtered = notes
    .map(n => n.trim())
    .filter(Boolean);

  if (!filtered.length) {
    console.warn("❌ No notes to save");
    return;
  }

  if (!projectId || !token) {
    console.error("❌ Missing projectId or token");
    return;
  }

  try {
    await api.post(
      "/proposal/note",
      {
        proposalId: projectId,
        note: filtered,   // ✅ ARRAY under `note`
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("✅ Notes saved successfully");

    onSave?.();     // 🔁 Home refresh
    setNotes([""]);
    handleClose();

  } catch (error) {
    console.error(
      "❌ NOTE SAVE ERROR:",
      error?.response?.data || error.message
    );
  }
};




  return (
    <Modal transparent visible={visible} animationType="none"  statusBarTranslucent>
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>Add Notes</Text>
            <TouchableOpacity onPress={handleClose}>
              <Feather name="x" size={22} />
            </TouchableOpacity>
          </View>

          {/* INPUTS */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {notes.map((item, index) => (
              <View key={index} style={styles.inputRow}>
                <TextInput
                  value={item}
                  placeholder={`Note ${index + 1}`}
                  placeholderTextColor="#999"
                  style={[styles.input, { flex: 1 }]}
                  multiline
                  onChangeText={(t) => handleChange(t, index)}
                />

                {/* ❌ Remove button (except first field) */}
                {notes.length > 1 && (
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => removeField(index)}
                  >
                    <Feather name="trash-2" size={18} color="#FF4D4F" />
                  </TouchableOpacity>
                )}
              </View>
            ))}

            {/* ADD MORE */}
            <TouchableOpacity style={styles.addMore} onPress={addMore}>
              <Feather name="plus" size={18} color="#FF5A1F" />
              <Text style={styles.addMoreText}>Add More</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* SAVE */}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Save Notes</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: Radius.lg,
    padding: Spacing.md,
    maxHeight: "80%",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(12),
  },

  title: {
    fontSize: fontScale(18),
    fontWeight: "700",
    color: "#111",
  },

  // 🔥 NEW
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: Radius.md,
    padding: Spacing.sm,
    fontSize: fontScale(14),
    marginBottom: verticalScale(10),
    minHeight: verticalScale(44),
    textAlignVertical: "top",
  },

  // 🔥 NEW
  removeBtn: {
    marginTop: verticalScale(6),
    padding: 6,
  },

  addMore: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginVertical: verticalScale(10),
  },

  addMoreText: {
    fontSize: fontScale(14),
    fontWeight: "600",
    color: "#FF5A1F",
  },

  saveBtn: {
    backgroundColor: "#FF5A1F",
    height: verticalScale(42),
    borderRadius: Radius.pill,
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(6),
  },

  saveText: {
    color: "#fff",
    fontSize: fontScale(14),
    fontWeight: "700",
  },
});
