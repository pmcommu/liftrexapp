import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  StatusBar,
} from "react-native";
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
const UploadPictureModal = ({
  visible,
  onClose,
  onUploadPress,
  onSubmit,
  image,          // ⭐ parent se image
  onRemoveImage,  // ⭐ parent reset
}) => {

const handleUpload = async (type) => {
  console.log("UPLOAD TYPE:", type);
  await onUploadPress(type);
};



  return (
   <Modal
  visible={visible}
  transparent
  animationType="fade"
  presentationStyle="overFullScreen"   // 🔥 IMPORTANT
  statusBarTranslucent                 // 🔥 ANDROID FIX
  onRequestClose={onClose}             // 🔥 REQUIRED
>

      <View style={styles.overlay}>
        <View style={styles.card}>

          {/* HEADER */}
          <View style={styles.headerRow}>
            <Text style={styles.title}>Upload Picture</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={26} color="#000" />
            </TouchableOpacity>
          </View>
{!image && (
  <View style={styles.uploadActions}>

    {/* CAMERA */}
    <TouchableOpacity
      style={styles.uploadBox}
      onPress={() => handleUpload("camera")}
    >
      <Feather name="camera" size={36} color={Colors.primary} />
      <Text style={styles.uploadLabel}>Take Photo</Text>
    </TouchableOpacity>

    {/* GALLERY */}
    <TouchableOpacity
      style={styles.uploadBox}
      onPress={() => handleUpload("gallery")}
    >
      <Feather name="image" size={36} color={Colors.primary} />
      <Text style={styles.uploadLabel}>Choose from Gallery</Text>
    </TouchableOpacity>

  </View>
)}



          <Text style={styles.subText}>
            Please Upload the Required Picture before marking this task as Done.
          </Text>

        {image && (
  <View style={styles.previewBox}>
    <Image
      source={{ uri: image.uri }}
      style={styles.previewImage}
    />

    <TouchableOpacity
      style={styles.removeBtn}
      onPress={onRemoveImage}
    >
      <Feather name="trash-2" size={20} color="#ff4444" />
      <Text style={styles.removeText}>Remove</Text>
    </TouchableOpacity>
  </View>
)}


          <TouchableOpacity
            style={[styles.submitBtn, { opacity: image ? 1 : 0.4 }]}
            disabled={!image}
            onPress={() => onSubmit(image)}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};


export default UploadPictureModal;
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    paddingHorizontal: moderateScale(20),
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: Radius.lg,
    padding: moderateScale(20),
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: scale(8),
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: fontScale(18),
    fontWeight: "700",
    color: "#000",
  },

  subText: {
    marginTop: verticalScale(10),
    color: "#555",
    fontSize: fontScale(14),
  },

  uploadBox: {
    marginTop: verticalScale(20),
    borderWidth: scale(1.5),
    borderColor: Colors.border,
    borderRadius: Radius.md,
    padding: verticalScale(30),
    alignItems: "center",
    borderStyle: "dashed",
  },

  uploadLabel: {
    marginTop: verticalScale(10),
    fontSize: fontScale(14),
    color: "#777",
  },

  previewBox: {
    marginTop: verticalScale(20),
    borderRadius: Radius.md,
    overflow: "hidden",
    borderWidth: scale(1),
   borderColor: Colors.border,
  },

  previewImage: {
    width: "100%",
    height: SCREEN_HEIGHT * 0.25, 
    resizeMode: "cover",
  },

  removeBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: moderateScale(10),
    backgroundColor: "#ffecec",
    justifyContent: "center",
  },

  removeText: {
    color: "#ff4444",
    marginLeft: moderateScale(6),
    fontWeight: "600",
    fontSize: fontScale(13),
  },

  submitBtn: {
    marginTop: verticalScale(20),
    backgroundColor: Colors.primary,
    paddingVertical: verticalScale(12),
    borderRadius: Radius.pill,
    alignItems: "center",
  },

  submitText: {
    color: "#fff",
    fontSize: fontScale(15),
    fontWeight: "600",
  },

  uploadActions: {
  marginTop: verticalScale(20),
  flexDirection: "row",
  justifyContent: "space-between",
  gap: moderateScale(12),
},

uploadBox: {
  flex: 1,
  borderWidth: scale(1.5),
  borderColor: Colors.border,
 borderRadius: Radius.md,
  paddingVertical: verticalScale(22),
  alignItems: "center",
 borderStyle: "dashed",
},

});
