import React, { forwardRef ,useState} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,Platform, Alert
} from "react-native";
import { Modalize } from "react-native-modalize";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../../../constants/Colors";
import { RectButton } from "react-native-gesture-handler";
import D, { fontScale, Spacing, Radius, verticalScale } from "../../../constants/Dimmence";
import api from "../../../config/api";
import { useSelector } from "react-redux";
import RNFS from "react-native-fs";
import AnimatedSpinner from "../../all/AnimatedSpinner";
import Toast from "react-native-toast-message";

const ExportOptionsModal = forwardRef(
  ({ onExportNotes, onExportDocs, onExportPdf }, ref) => {

     const token = useSelector(state => state.auth.token);
    const { project, loading, error } = useSelector(
        (state) => state.projectDetails
      );




const [exporting, setExporting] = useState(null);
// exporting = "notes" | "docs" | "pdf" | null
// const handleExportNotes = async () => {
//   try {
//     setExporting("notes"); // 🔄 spinner ON

//     const proposalId =
//       project?.proposalDetails?._id || project?.inquiryProposalId;

//     if (!proposalId) {
//       Toast.show({
//         type: "error",
//         text1: "Error",
//         text2: "Proposal ID not found",
//       });
//       return;
//     }

//     const fileName = `proposal_notes_${proposalId}.csv`;

//     const filePath =
//       Platform.OS === "android"
//         ? `${RNFS.DownloadDirectoryPath}/${fileName}`
//         : `${RNFS.DocumentDirectoryPath}/${fileName}`;

//     const response = await api.post(
//       "/get_notes_in_csv",
//       { proposalId },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         responseType: "text",
//       }
//     );

//     await RNFS.writeFile(filePath, response.data, "utf8");

//     Toast.show({
//       type: "success",
//       text1: "Download Complete",
//       text2: "CSV downloaded successfully",
//     });
//   } catch (err) {
//     console.log(
//       "Export Notes Error:",
//       err?.response?.data || err
//     );

//     Toast.show({
//       type: "error",
//       text1: "Export Failed",
//       text2:
//         err?.response?.data?.message ||
//         "Failed to export notes",
//     });
//   } finally {
//     setExporting(null);
//   }
// };


const handleExportNotes = async () => {
  try {
    // ❌ Payment terms not created
    if (!project?.proposalDetails?.paymentTermsCreated) {
      Toast.show({
        type: "info",
        text1: "Payment Terms Required",
        text2: "Please create payment terms before downloading documents",
      });
      return;
    }

    setExporting("notes"); // 🔄 spinner ON

    const proposalId =
      project?.proposalDetails?._id || project?.inquiryProposalId;

    if (!proposalId) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Proposal ID not found",
      });
      return;
    }

    const fileName = `proposal_notes_${proposalId}.csv`;

    const filePath =
      Platform.OS === "android"
        ? `${RNFS.DownloadDirectoryPath}/${fileName}`
        : `${RNFS.DocumentDirectoryPath}/${fileName}`;

    const response = await api.post(
      "/get_notes_in_csv",
      { proposalId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "text",
      }
    );

    await RNFS.writeFile(filePath, response.data, "utf8");

    Toast.show({
      type: "success",
      text1: "Download Complete",
      text2: "CSV downloaded successfully",
    });
  } catch (err) {
    console.log("Export Notes Error:", err?.response?.data || err);

    Toast.show({
      type: "error",
      text1: "Export Failed",
      text2:
        err?.response?.data?.message ||
        "Failed to export notes",
    });
  } finally {
    setExporting(null);
  }
};



    return (
      <Modalize
        ref={ref}
        adjustToContentHeight
        handleStyle={{ opacity: 0 }}
        modalStyle={styles.modal}
        overlayStyle={styles.overlay}
      >
        <View style={styles.content}>
          {/* TITLE */}
          <Text style={styles.title}>Export Proposal</Text>
          <Text style={styles.subTitle}>
            Choose a format to download the proposal data.
          </Text>

          {/* OPTIONS */}
          <RectButton
            style={styles.optionRow}
            
            onPress={handleExportNotes}
            activeOpacity={0.8}
          >
            <Feather name="file-text" size={20} color={Colors.primary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.optionTitle}>Export Notes</Text>
              <Text style={styles.optionSub}>
                Download internal notes summary
              </Text>
            </View>
           {exporting === "notes" ? (
  <AnimatedSpinner size={22} />
) : (
  <Feather name="download" size={18} color="#999" />
)}

          </RectButton>

          <RectButton
            style={styles.optionRow}
            onPress={onExportDocs}
            activeOpacity={0.8}
          >
            <Feather name="file" size={20} color={Colors.primary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.optionTitle}>Export Proposal Docs</Text>
              <Text style={styles.optionSub}>
                Download proposal in DOC format
              </Text>
            </View>
            <Feather name="download" size={18} color="#999" />
          </RectButton>

          <RectButton
            style={styles.optionRow}
            onPress={onExportPdf}
            activeOpacity={0.8}
          >
            <Feather name="file-text" size={20} color={Colors.primary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.optionTitle}>Export Proposal PDF</Text>
              <Text style={styles.optionSub}>
                Download finalized proposal PDF
              </Text>
            </View>
            <Feather name="download" size={18} color="#999" />
          </RectButton>
        </View>
      </Modalize>
    );
  }
);

export default ExportOptionsModal;
const styles = StyleSheet.create({
  modal: {
    borderTopLeftRadius: Radius.lg,
    borderTopRightRadius: Radius.lg,
  },

  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  content: {
    padding: Spacing.md,
  },

  title: {
   //  padding: Spacing.md,
    fontSize: fontScale(16),
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: verticalScale(6),
  },

  subTitle: {
    fontSize: fontScale(13),
    color: Colors.textMedium || "#777",
    marginBottom: verticalScale(16),
  },

  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(14),
    gap: 12,
    borderBottomWidth: 1,
    borderColor: "#EEE",
    paddingHorizontal:10,
    paddingVertical:10,
    marginBottom:20,
  },

  optionTitle: {
    fontSize: fontScale(14),
    fontWeight: "600",
    color: Colors.textPrimary,
  },

  optionSub: {
    fontSize: fontScale(12),
    color: Colors.textMedium,
    marginTop: 2,
  },
});
