import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../../../constants/Colors";
import D, { verticalScale, fontScale, Spacing, Radius } from "../../../constants/Dimmence";
import * as IMAGE from "../../../assets/svg";
import { useSelector } from "react-redux";


export default function CustomInfoModal({ visible, onClose }) {
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const inquiry = useSelector(
  (state) => state.selectedInquiry.inquiry
);



  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      {/* BACKDROP */}
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />

      {/* CENTER MODAL */}
      <Animated.View
        style={[
          styles.modalContainer,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >

      {/* MODAL HEADER */}
<View style={styles.modalHeader}>
  {/* Left spacer (for perfect center title) */}
  {/* <View style={{ width: 24 }} /> */}

  {/* TITLE */}
  <Text style={styles.modalTitle}>Project Details</Text>

  {/* CLOSE */}
  <TouchableOpacity onPress={onClose} hitSlop={10}>
    <Feather name="x" size={22} color="#444" />
  </TouchableOpacity>
</View>

        {/* HEADER */}

   <View style={styles.projectCard}>
  <View style={styles.headerRow}>
    <View style={styles.headerLeft}>
      <IMAGE.FOLDER width={28} height={28} />
      <View style={styles.headerTextBox}>
        <Text style={styles.codeText}>
          {inquiry?.projectId || "--"}
        </Text>
        <Text style={styles.address}>
          {inquiry?.projectName || "--"}
        </Text>
      </View>
    </View>
  </View>

  <View style={styles.sectionDivider} />

  <View style={styles.infoRow}>
    <View style={styles.infoBox}>
      <IMAGE.USER_CHECK width={32} height={32} />
      <View>
        <Text style={styles.infoLabel}>Client Name</Text>
        <Text style={styles.infoValue}>
          {inquiry?.client?.clientName || "-"}
        </Text>
      </View>
    </View>

    <View style={styles.infoBox}>
      <IMAGE.USER_CHECK width={32} height={32} />
      <View>
        <Text style={styles.infoLabel}>Company Rep</Text>
        <Text style={styles.infoValue}>
          {inquiry?.client?.companyRepresentative || "-"}
        </Text>
      </View>
    </View>
  </View>
</View>

      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",   // ⭐ CENTER
    alignItems: "center",
  },

  backdrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
modalHeader: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: verticalScale(8),
},


  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    paddingTop: Spacing.md,
    paddingHorizontal:Spacing.lg,
    borderRadius: Radius.lg,
    elevation: 8,               // Android shadow
    shadowColor: "#000",        // iOS shadow
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
modalTitle: {
  fontSize: fontScale(16),
  fontWeight: "700",
  color: Colors.textPrimary || "#111",

  marginBottom: verticalScale(10),
},
  projectCard: {
    backgroundColor: "#fff",
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: verticalScale(16),
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  headerLeft: {
    flexDirection: "row",
    flex: 1,
  },

  headerTextBox: {
    marginLeft: 10,
    flexShrink: 1,
  },

  codeText: {
    fontSize: fontScale(15),
    fontWeight: "600",
    color: "#858585",
  },

  address: {
    marginTop: 5,
    fontWeight: "700",
    fontSize: fontScale(14),
    color: Colors.black,
  },

  sectionDivider: {
    height: 1,
    backgroundColor: Colors.border || "#EAEAEA",
    marginVertical: verticalScale(12),
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: verticalScale(10),
  },

  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    width: "48%",
  },

  infoLabel: {
    fontSize: fontScale(12),
    color: Colors.textMedium || "#777",
  },

  infoValue: {
    fontSize: fontScale(14),
    fontWeight: "500",
    color: Colors.textPrimary || "#111",
  },
});
