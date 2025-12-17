import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
  ScrollView,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { Modalize } from "react-native-modalize";
import Colors from "../../constants/Colors";
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
import { Platform } from "react-native";

const DownloadDocuments = React.forwardRef(({ docs = [] }, ref) => {

  const downloadAndOpen = async (url, index) => {
  try {
    const fileName = `document_${index + 1}.pdf`; // or detect from URL
    const path =
      Platform.OS === "android"
        ? `${RNFS.DownloadDirectoryPath}/${fileName}`
        : `${RNFS.DocumentDirectoryPath}/${fileName}`;

    const result = await RNFS.downloadFile({
      fromUrl: url,
      toFile: path,
    }).promise;

    if (result.statusCode === 200) {
      Alert.alert("Downloaded", "File downloaded successfully");
      FileViewer.open(path);
    } else {
      Alert.alert("Failed", "Download failed");
    }
  } catch (err) {
    console.log("DOWNLOAD ERROR:", err);
    Alert.alert("Error", "Unable to download file");
  }
};

  return (
<Modalize
  ref={ref}
  modalHeight={400}
  adjustToContentHeight={false}
  withOverlay
  handlePosition="inside"
  handleStyle={{ opacity: 0, height: 8 }}

  onOpened={() => {
    // 🔥 force touch system refresh
    requestAnimationFrame(() => {});
  }}

  modalStyle={styles.modal}
  overlayStyle={styles.overlay}
>

      {/* ================= HEADER (FIXED) ================= */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Documents</Text>

        {/* <TouchableOpacity onPress={() => ref.current?.close()}>
          <Feather name="x" size={26} color="#000" />
        </TouchableOpacity> */}
      </View>

      {/* ================= SCROLLABLE CONTENT ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      >
        {docs.length === 0 ? (
          <Text style={styles.emptyText}>
            No documents uploaded.
          </Text>
        ) : (
          docs.map((doc, index) => (
           <TouchableOpacity
  key={index}
  style={styles.itemRow}
  onPress={() => {
    if (doc.doc_url?.startsWith("http")) {
      downloadAndOpen(doc.doc_url, index);
    } else {
      Alert.alert(
        "Not Available",
        "This document is not uploaded to server yet."
      );
    }
  }}
>

              <Text style={styles.itemText}>
                Document {index + 1}
              </Text>
              <Feather
                name="download"
                size={22}
                color={Colors.primary}
              />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </Modalize>
  );
});

export default DownloadDocuments;


const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
  },

  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 30,
    color: "#666",
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },

  itemText: {
    fontSize: 16,
    color: "#000",
  },
});
