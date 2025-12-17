import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  ScrollView,Dimensions
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import {
  moderateScale,
  scale,
  verticalScale,
  fontScale,
  Radius,
  SCREEN_HEIGHT,
} from "../../constants/Dimmence";
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SchedulingUpload = ({
  visible,
  onClose,
  onSchedulPress,
  onSubmit,
  image,
  onRemoveImage,
}) => {
  const schedulingdetails = useSelector(
    state => state.scheduling.schedulingdetails
  );

  const drawings = schedulingdetails?.drawings || [];

  // 🔥 Full screen preview state
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const openPreview = (uri) => {
    setPreviewImage(uri);
    setPreviewVisible(true);
  };

  const closePreview = () => {
    setPreviewVisible(false);
    setPreviewImage(null);
  };

  return (
    <>
      {/* ================= MAIN MODAL ================= */}
      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.card}>

            {/* HEADER */}
            <View style={styles.headerRow}>
              <Text style={styles.title}>Upload Drawing</Text>
              <TouchableOpacity onPress={onClose}>
                <Feather name="x" size={26} color="#000" />
              </TouchableOpacity>
            </View>

            <Text style={styles.subText}>
              Uploaded drawings are shown below. Tap any image to view.
            </Text>

<ScrollView
  horizontal
  pagingEnabled
  snapToInterval={SCREEN_WIDTH * 0.7 + moderateScale(12)}
  snapToAlignment="start"
  showsHorizontalScrollIndicator={false}
  decelerationRate="fast"
>




              {/* ================= EXISTING DRAWINGS ================= */}
             {/* ================= EXISTING DRAWINGS (HORIZONTAL SCROLL) ================= */}
{drawings.length > 0 && (
  <View style={{ marginTop: verticalScale(14) }}>
    <Text style={styles.sectionTitle}>Uploaded Drawings</Text>

    <ScrollView
      horizontal
      pagingEnabled
      snapToInterval={SCREEN_WIDTH * 0.7 + moderateScale(12)}
      snapToAlignment="start"
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      contentContainerStyle={{ paddingRight: moderateScale(12) }}
    >
      {drawings.map((item, index) => (
        <TouchableOpacity
          key={item._id || index}
          style={styles.thumbCard}
          activeOpacity={0.8}
          onPress={() => openPreview(item.doc_url)}
        >
          <Image
            source={{ uri: item.doc_url }}
            style={styles.thumbImage}
          />

          <View style={styles.thumbOverlay}>
            <Feather name="eye" size={16} color="#fff" />
            <Text style={styles.thumbText}>View</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
)}

  </ScrollView>
              {/* ================= NEW IMAGE PREVIEW ================= */}
{image && (
  <View style={{ marginTop: verticalScale(16) }}>
    <Text style={styles.sectionTitle}>New Selected Image</Text>

    <View style={styles.previewBox}>
      <Image
        source={{ uri: image.uri }}
        style={styles.previewImage}
      />

      <TouchableOpacity
        style={styles.removeBtn}
        onPress={onRemoveImage}
      >
        <Feather name="trash-2" size={18} color="#ff4444" />
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
  </View>
)}

              {/* ================= UPLOAD BUTTON ================= */}
{!image && (
  <TouchableOpacity
    style={styles.uploadBox}
    onPress={onSchedulPress}
    activeOpacity={0.8}
  >
    <Feather
      name="upload-cloud"
      size={40}
      color={Colors.primary}
    />
    <Text style={styles.uploadLabel}>
      Click to Upload New Drawing
    </Text>
  </TouchableOpacity>
)}

          

            {/* ================= SUBMIT ================= */}
            <TouchableOpacity
              style={[
                styles.submitBtn,
                { opacity: image ? 1 : 0.4 },
              ]}
              disabled={!image}
              onPress={() => onSubmit(image)}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      {/* ================= FULL SCREEN IMAGE VIEW ================= */}
      <Modal visible={previewVisible} transparent animationType="fade">
        <View style={styles.previewOverlay}>
          <TouchableOpacity
            style={styles.previewClose}
            onPress={closePreview}
          >
            <Feather name="x" size={32} color="#fff" />
          </TouchableOpacity>

          {previewImage && (
            <Image
              source={{ uri: previewImage }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </>
  );
};

export default SchedulingUpload;
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    paddingHorizontal: moderateScale(16),
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: Radius.lg,
    padding: moderateScale(16),
    maxHeight: "88%",
    elevation: 10,
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
    marginTop: verticalScale(8),
    color: "#555",
    fontSize: fontScale(14),
  },

  sectionTitle: {
    fontSize: fontScale(14),
    fontWeight: "600",
    color: "#333",
    marginBottom: verticalScale(8),
  },

  thumbCard: {
  width: SCREEN_WIDTH * 0.3,        // ⭐ screen ke andar
  marginRight: moderateScale(12),
  borderRadius: Radius.md,
  overflow: "hidden",
  borderWidth: 1,
  borderColor: Colors.border,
},


  thumbImage: {
    width: "100%",
    height: verticalScale(80),
    resizeMode: "cover",
  },

  thumbOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 6,
    backgroundColor: "rgba(0,0,0,0.55)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  thumbText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: fontScale(12),
    fontWeight: "600",
  },

  uploadBox: {
    marginTop: verticalScale(20),
    borderWidth: scale(1.5),
    borderColor: Colors.border,
    borderRadius: Radius.md,
    padding: verticalScale(26),
    alignItems: "center",
    borderStyle: "dashed",
  },

  uploadLabel: {
    marginTop: verticalScale(10),
    fontSize: fontScale(14),
    color: "#777",
  },

  previewBox: {
    borderRadius: Radius.md,
    overflow: "hidden",
    borderWidth: 1,
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
    marginTop: verticalScale(14),
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

  /* FULL SCREEN PREVIEW */
  previewOverlay: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  previewClose: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },

  fullImage: {
    width: "100%",
    height: "100%",
  },
});
