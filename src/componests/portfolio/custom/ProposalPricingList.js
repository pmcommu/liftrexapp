import React,{useRef,useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,Alert, Platform
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../../../constants/Colors";
import D, {
  Spacing,
  Radius,
  fontScale,
  verticalScale,SCREEN_HEIGHT,SCREEN_WIDTH
} from "../../../constants/Dimmence";
import { useSelector } from "react-redux";
import RNFS from "react-native-fs";
import api from "../../../config/api";
import Share from "react-native-share";
import * as IMAGE from "../../../assets/svg/index"
import AnimatedSpinner from "../../all/AnimatedSpinner"
import Toast from "react-native-toast-message";
export default function ProposalPricingList({
 
  
  onViewFinalPricing,
  onEdit,
  onDelete,
  onExport,
  onChangePriceType,
  onViewBreakdown,
  //onDownloadCSV,
  onCreatePaymentTerms,navigation
}) {

 const token = useSelector(state => state.auth.token);
    const { project, loading, error } = useSelector(
  (state) => state.projectDetails
);

const priceType =
  project?.projectData?.price_type || "Select Price";

const [downloadingLabel, setDownloadingLabel] = useState(null);

const parsedCostHistory = React.useMemo(() => {
  try {
    return project?.proposalDetails?.costHistoryJson
      ? JSON.parse(project.proposalDetails.costHistoryJson)
      : null;
  } catch (e) {
    console.log("JSON parse error", e);
    return null;
  }
}, [project]);

const elevatorEntries = React.useMemo(() => {
  return Object.entries(
    parsedCostHistory?.input_details || {}
  );
}, [parsedCostHistory]);


console.log('project',project)


const normalizeToString = (obj = {}) => {
  const result = {};

  Object.keys(obj).forEach(key => {
    const value = obj[key];

    if (value === null || value === undefined) {
      result[key] = "";
    } else if (typeof value === "number") {
      result[key] = value.toString(); // 🔥 number → string
    } else {
      result[key] = value;
    }
  });

  return result;
};


const onDownloadCSV = async (label, elevatorData) => {
  try {
    // 🔥 START loading (sirf isi card ke liye)
    setDownloadingLabel(label);

    const rawFormData = {
      ...elevatorData?.req_body,
      price_type: elevatorData?.req_body?.price_type || "Starter Price",
      elevator_label: label,
    };

    const formData = normalizeToString(rawFormData);

    if (!formData || Object.keys(formData).length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Form data not found",
      });
      return;
    }

    const fileName = `elevator_${label}_data.csv`;

    const filePath =
      Platform.OS === "android"
        ? `${RNFS.DownloadDirectoryPath}/${fileName}`
        : `${RNFS.DocumentDirectoryPath}/${fileName}`;

    // 🔥 API CALL
    const response = await api.post(
      "/generate_csv_file",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "text",
      }
    );

    // 🔥 Save CSV
    await RNFS.writeFile(filePath, response.data, "utf8");

    // 🔥 Share / Open dialog
    await Share.open({
      url: `file://${filePath}`,
      type: "text/csv",
      title: "Open CSV with",
      failOnCancel: false,
    });

    Toast.show({
      type: "success",
      text1: "Download Complete",
      text2: "CSV downloaded successfully",
    });
  } catch (error) {
    console.log(
      "Download CSV Error:",
      error?.response?.data || error
    );

    Toast.show({
      type: "error",
      text1: "Download Failed",
      text2:
        error?.response?.data?.message ||
        "Failed to download CSV",
    });
  } finally {
    // 🔥 STOP loading (spinner hide)
    setDownloadingLabel(null);
  }
};


const formatAmount = (value) => {
  if (value === null || value === undefined || isNaN(value)) {
    return "0.00";
  }

  return Number(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};


const getProposalRoute = (label) => {
  if (label?.startsWith("H")) {
    return "H_ProposalForm";   // Hydraulic
  }
  return "ProposalForm";      // M & T
};


  return (
    <View style={styles.container}>
      
        {/* TOP ACTIONS */}
       <View style={styles.topBar}>
  {/* LEFT : TITLE */}
  <Text style={styles.pageTitle}>Proposal</Text>

  {/* RIGHT : ACTIONS */}
  <View style={styles.actionGroup}>
    {/* PRIMARY CTA */}
    <TouchableOpacity
      style={styles.primaryChip}
      activeOpacity={0.85}
    //  onPress={() => pricingRef.current?.open()}
     onPress={ () => navigation.navigate('ViewFinalPricing')}
    >
      <Text style={styles.primaryChipText}>View Final Pricing</Text>
    </TouchableOpacity>

    {/* EDIT */}
    <TouchableOpacity
      style={styles.iconBtn}
      activeOpacity={0.7}
      onPress={onEdit}
    >
      <Feather name="edit-3" size={22} color="#333" />
    </TouchableOpacity>

    {/* DELETE */}
    <TouchableOpacity
      style={styles.iconBtn}
      activeOpacity={0.7}
    //  onPress={() => navigation.navigate("FinalPricing")}
      onPress={onDelete}
    >
      <Feather name="trash-2" size={22} color="#333" />
    </TouchableOpacity>
  </View>
</View>


        {/* FILTER ROW */}
       <View style={styles.filterRow}>
  <TouchableOpacity
    style={styles.filterBtn}
    onPress={onExport}
    activeOpacity={0.8}
  >
    <Text style={styles.filterText}>Export</Text>
    <Feather name="chevron-down" size={22} />
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.filterBtn}
    onPress={onChangePriceType}
    activeOpacity={0.8}
  >
    <Text style={styles.filterText}>{priceType}</Text>
    <Feather name="chevron-down" size={22} />
  </TouchableOpacity>
</View>


        {/* PROPOSAL CARDS */}
{/* PROPOSAL CARDS */}
{elevatorEntries.map(([label, elevatorData]) => (
  <View key={label} style={styles.card}>

    {/* HEADER */}
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>{label}</Text>

     <TouchableOpacity
  style={styles.cardIcon}
  activeOpacity={0.7}
  onPress={() =>
    navigation.navigate(
      getProposalRoute(label),
      {
        elevatorLabel: label,   // "M1", "T1", "H1"
        elevatorData,
      }
    )
  }
>
  <Feather name="file-text" size={22} color="#FF8A00" />
</TouchableOpacity>

    </View>

    {/* PRICE */}
    <View style={styles.priceRow}>
      <Text style={styles.priceLabel}>Final Pricing:</Text>

  <Text style={styles.priceValue}>
  $ {formatAmount(elevatorData?.dataArray?.[1]?.["Final Price"])}

</Text>


      <TouchableOpacity
        onPress={() => onViewFinalPricing(elevatorData)}
      >
        <Text style={styles.link}>View Breakdown</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.dashedDivider} />

    {/* DOWNLOAD */}
<View style={styles.downloadRow}>
  <TouchableOpacity
    disabled={downloadingLabel === label}
    onPress={() => onDownloadCSV(label, elevatorData)}
  >
    <Text style={styles.downloadText}>
      {downloadingLabel === label ? "Downloading..." : "Download CSV"}
    </Text>
  </TouchableOpacity>

  {downloadingLabel === label ? (
    <AnimatedSpinner />   // 🔄 spinner ghoomta rahe
  ) : (
    <Feather name="download" size={22} color="#FF5A1F" />
  )}
</View>



  </View>
))}

       
   
    </View>
  );
}
const styles = StyleSheet.create({
  // ================= CONTAINER =================
  container: {
    flex: 1,
    backgroundColor: "#fff",
   
  },

  // ================= TOP BAR =================
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(8),
  },

  pageTitle: {
    fontSize: fontScale(20),
    fontWeight: "700",
    color: "#111",
  },

  actionGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },

  primaryChip: {
    backgroundColor: "#FF5A1F",
    paddingVertical: verticalScale(10),
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.pill,
    minHeight: verticalScale(34),
    justifyContent: "center",
  },

  primaryChipText: {
    color: "#fff",
    fontSize: fontScale(14),
    fontWeight: "600",
  },

  iconBtn: {
    width: verticalScale(36),
    height: verticalScale(36),
    borderRadius: verticalScale(18),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  // ================= FILTER ROW =================
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: verticalScale(12),
  },

  filterBtn: {
    width: SCREEN_WIDTH * 0.45, // 🔥 equal width always
    height: verticalScale(45),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.xs,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: Radius.pill,
    backgroundColor: "#fff",
  },

  filterText: {
    fontSize: fontScale(13),
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },

  // ================= CARD =================
  card: {
    backgroundColor: "#fff",
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: verticalScale(14),
    borderWidth: 1,
    borderColor: "#EEE",
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(6),
  },

  cardTitle: {
    fontSize: fontScale(16),
    fontWeight: "700",
    color: "#111",
  },

  cardIcon: {
    backgroundColor: "#FFF1E5",
    padding: Spacing.sm,
    borderRadius: Radius.pill,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: Spacing.xs,
  },

  priceLabel: {
    fontSize: fontScale(13),
    color: "#666",
  },

  priceValue: {
    fontSize: fontScale(13),
    fontWeight: "700",
    color: "#111",
  },

  link: {
    fontSize: fontScale(13),
    color: "#5A5DFF",
    fontWeight: "600",
    textDecorationLine: "underline",
    textDecorationColor: "#5A5DFF",
  },

  dashedDivider: {
    borderWidth: 0.6,
    borderColor: "#E0E0E0",
    marginVertical: verticalScale(12),
  },

  downloadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  downloadText: {
    fontSize: fontScale(14),
    color: "#FF5A1F",
    fontWeight: "600",
  },

  // ================= BOTTOM BAR =================
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.md,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },

  ctaBtn: {
    backgroundColor: "#FF5A1F",
    height: verticalScale(54),
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },

  ctaText: {
    color: "#fff",
    fontSize: fontScale(14),
    fontWeight: "700",
  },
});

