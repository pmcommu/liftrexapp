import React, { forwardRef, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../../constants/Colors";
import D, {
  moderateScale,
  scale,
  verticalScale,
  fontScale,
  Spacing,
  Radius,SCREEN_HEIGHT,SCREEN_WIDTH
} from "../../constants/Dimmence";
const ApprovalRejectModal = forwardRef(({ onApprove, onReject }, ref) => {


  const closeModal = () => {
   
    ref.current?.close();
  };

  return (
    <Modalize
      ref={ref}
      adjustToContentHeight
      handleStyle={styles.handle}
      modalStyle={styles.modal}
      overlayStyle={styles.overlay}
    >
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Approval & Actions</Text>
          {/* <TouchableOpacity onPress={closeModal}>
            <Feather name="x" size={26} color="#333" />
          </TouchableOpacity> */}
        </View>

        {/* APPROVE BUTTON */}
        <TouchableOpacity
          style={styles.btnApprove}
          onPress={() => {
            onApprove();
            closeModal();
          }}
        >
          <Text style={styles.btnApproveText}>Approve</Text>
        </TouchableOpacity>

        {/* REJECT SECTION */}
       
        {/* REJECT BUTTON */}
        <TouchableOpacity
          style={styles.btnReject}
          onPress={() => {
            onReject();
            closeModal();
          }}
        >
          <Text style={styles.btnRejectText}>Reject</Text>
        </TouchableOpacity>

      </View>
    </Modalize>
  );
});

export default ApprovalRejectModal;
const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: Radius.lg,       // responsive
    borderTopRightRadius: Radius.lg,
    paddingBottom: verticalScale(20),
  },

  overlay: {
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  handle: {
    backgroundColor: "#ccc",
    width: scale(50),
    height: verticalScale(5),
    borderRadius: Radius.md,
    alignSelf: "center",
    marginVertical: verticalScale(10),
  },

  container: {
    padding: Spacing.lg,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: verticalScale(10),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd",
  },

  title: {
    fontSize: fontScale(18),
    fontWeight: "700",
    color: "#111",
  },

  // APPROVE BUTTON
  btnApprove: {
    backgroundColor: "#0b891526",
    borderWidth:1,
    borderColor:"#0b8915",
    paddingVertical: verticalScale(12),
    borderRadius: Radius.md,
    marginTop: verticalScale(20),
    alignItems: "center",
  },
  btnApproveText: {
    fontSize: fontScale(16),
    fontWeight: "700",
    color: "#0b8915",
  },

  label: {
    fontSize: fontScale(14),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(6),
    color: "#444",
    fontWeight: "600",
  },


  // REJECT BUTTON
  btnReject: {
    backgroundColor: "#ef44441f",
    borderWidth:1,
    borderColor: "#ef4444",
    paddingVertical: verticalScale(12),
    borderRadius: Radius.md,
    marginTop: verticalScale(15),
    alignItems: "center",
  },

  btnRejectText: {
    fontSize: fontScale(16),
    fontWeight: "700",
    color:  "#ef4444",
  },
});
