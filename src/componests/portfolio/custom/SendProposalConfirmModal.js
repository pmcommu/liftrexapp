import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../../../constants/Colors";
import { moderateScale } from "../../../constants/Dimmence";
import { useSelector } from "react-redux";

export default function SendProposalConfirmModal({
  visible,
  onClose,
  onConfirm,
}) {


     const { project, loading, error } = useSelector(
            (state) => state.projectDetails
          );
const emailsArray = project?.proposalDetails?.clientEmail;

const clientEmails =
  Array.isArray(emailsArray) && emailsArray.length > 0
    ? emailsArray.join(", ")
    : null;


console.log('project',project)

  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

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
          friction: 6,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      opacityAnim.setValue(0);
      scaleAnim.setValue(0.8);
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="none" statusBarTranslucent>
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.card,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Send Proposal?</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={22} color="#444" />
            </TouchableOpacity>
          </View>

          {/* Content */}
<Text style={styles.desc}>
  Are you sure you have checked the proposal and want to share it
  {clientEmails ? (
    <>
      {" "}with the client{" "}
      <Text style={{ fontWeight: "600" }}>({clientEmails})</Text>
    </>
  ) : (
    " with the client?"
  )}
</Text>



          {/* Action */}
          <TouchableOpacity
            style={styles.primaryBtn}
            activeOpacity={0.8}
            onPress={onConfirm}
          >
            <Feather name="send" size={18} color="#fff" />
            <Text style={styles.primaryText}>Send Proposal</Text>
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
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  desc: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 18,
    color: "#666",
  },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    backgroundColor: Colors.primary || "#F15A29",
    paddingVertical: 12,
    borderRadius: 25,
  },
  primaryText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
});
