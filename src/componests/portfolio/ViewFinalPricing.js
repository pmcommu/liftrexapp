import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../../constants/Colors";
import D, {
  Spacing,
  Radius,
  fontScale,
  verticalScale,
} from "../../constants/Dimmence";
import CustomHeader from "../all/CustomHeader";
import { useSelector } from "react-redux";
export default function ViewFinalPricing({ navigation }) {


      const { project, loading, error } = useSelector(
    (state) => state.projectDetails
  );
const formatINR = (value = 0) =>
  `₹ ${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;


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

const totals = React.useMemo(() => {
  let subtotal = 0;

  elevatorEntries.forEach(([_, elevatorData]) => {
    const finalPrice =
      elevatorData?.dataArray?.[1]?.["Final Price"] || 0;
    subtotal += Number(finalPrice);
  });

  return {
    subtotal,
    finalPrice: subtotal, // future me discount / upcharge add ho sakta
  };
}, [elevatorEntries]);


  return (
    <View style={styles.container}>
        <CustomHeader title="Final Pricing"
           onBackPress={() => navigation.goBack()}
        />
    

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ELEVATOR CARDS */}
        {elevatorEntries.map(([label, elevatorData]) => {
  const finalPrice =
    elevatorData?.dataArray?.[1]?.["Final Price"] || 0;




const handleGenerateProposal = async () => {
  if (!token) {
    Alert.alert("Auth Error", "Token missing");
    return;
  }

  if (!inquiry?._id || !inquiry?.costHistory?._id) {
    Alert.alert("Error", "Inquiry / Project ID missing");
    return;
  }

  try {
    setSubmitting(true);

    // 🔹 CLEAN elevator data (backend-safe)
    const cleanedResults = Object.fromEntries(
      Object.entries(resultsByForm || {}).map(([key, val]) => [
        key,
        {
          req_body: val.req_body,
          dataArray: val.dataArray,
        },
      ])
    );

    // 🔹 FINAL PAYLOAD
    const payload = {
      elevator_cost_details: cleanedResults,
     // inquiryProposalId: inquiry._id,
      project_id: inquiry.costHistory._id,
      project_name: inquiry.projectName || "",
      project_created_for:
        inquiry?.client?.companyRepresentative || "",
      price_type: priceType,
    //  updated_final_amount: Number(totals.finalPrice) || 0,
      is_edit_case: true,
      is_update_note: false,
    };

    console.log(
      "FINAL PAYLOAD >>>",
      JSON.stringify(payload, null, 2)
    );

    // 🔹 1️⃣ Calculate & Save Final Pricing
    await api.post(
      "/calculate_additional_cost_of_elevators",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // 🔹 2️⃣ Update Proposal Status
    await api.post(
      "/proposal/tab-status",
      {
        proposalId: inquiry._id,
        newStatus: "GENERATED",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    Alert.alert("Success", "Proposal generated successfully");
    navigation.goBack();

  } catch (err) {
    console.log("API ERROR >>>", err?.response?.data || err);
    Alert.alert(
      "Error",
      err?.response?.data?.message ||
        "Failed to generate proposal"
    );
  } finally {
    setSubmitting(false);
  }
};



  return (
    <View key={label} style={styles.card}>
      {/* HEADER */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{label}</Text>
        {/* <TouchableOpacity>
          <Feather name="trash-2" size={16} color="#999" />
        </TouchableOpacity> */}
      </View>

      {/* ORIGINAL */}
      <View style={styles.row}>
        <Text style={styles.label}>Original Amount:</Text>
        <Text style={styles.value}>{formatINR(finalPrice)}</Text>
      </View>

      {/* DISCOUNT / UPCHARGE */}
      <View style={styles.splitRow}>
        <View style={styles.splitItem}>
          <Text style={styles.label}>Discount:</Text>
          <Text style={styles.value}>₹ 0.00</Text>
        </View>

        <View style={[styles.splitItem, { alignItems: "flex-end" }]}>
          <Text style={styles.label}>Upcharge:</Text>
          <Text style={styles.value}>₹ 0.00</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* FINAL */}
      <View style={styles.row}>
        <Text style={styles.finalLabel}>Final Amount:</Text>
        <Text style={styles.finalValue}>
          {formatINR(finalPrice)}
        </Text>
      </View>
    </View>
  );
})}


        {/* TOTAL CALCULATION */}
      <View style={styles.totalCard}>
  <Text style={styles.totalTitle}>Total Calculation</Text>

  <View style={styles.splitRow}>
    <Text style={styles.label}>Subtotal (All Elevators)</Text>
    <Text style={styles.value}>
      {formatINR(totals.subtotal)}
    </Text>
  </View>

  <View style={styles.dashedDivider} />

  <View style={styles.splitRow}>
    <Text style={styles.finalPriceLabel}>Final Price</Text>
    <Text style={styles.finalPriceValue}>
      {formatINR(totals.finalPrice)}
    </Text>
  </View>
</View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* BOTTOM BUTTON */}
      {/* <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitText}>Submit Now</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    gap: 12,
  },

  headerTitle: {
    fontSize: fontScale(16),
    fontWeight: "700",
    color: "#000",
  },

  content: {
    padding: Spacing.md,
  },

  /* CARD */
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
    marginBottom: verticalScale(8),
  },

  cardTitle: {
    fontSize: fontScale(16),
    fontWeight: "900",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: verticalScale(6),
  },

  label: {
    fontSize: fontScale(13),
    color: "#777",
    marginRight: 4,
  },

  value: {
    fontSize: fontScale(13),
    fontWeight: "600",
    color: "#000",
    marginRight: 12,
  },

  splitRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: verticalScale(6),
},

splitItem: {
  flexDirection: "row",
  alignItems: "center",
  flex: 1,
},

  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: verticalScale(10),
  },
dashedDivider: {
  borderWidth: 1,
  borderColor: "#E0E0E0",
  borderStyle: "dashed",   // ⭐ important
  marginVertical: verticalScale(10),
},

  finalLabel: {
    fontSize: fontScale(13),
    color: "#777",
  },

  finalValue: {
    fontSize: fontScale(13),
    fontWeight: "700",
    color: "#000",
    marginLeft: 4,
  },

  /* TOTAL */
  totalCard: {
   
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginTop: verticalScale(8),
  },

  totalTitle: {
    fontSize: fontScale(16),
    fontWeight: "800",
    marginBottom: verticalScale(8),
  },

  finalPriceLabel: {
    fontSize: fontScale(14),
    fontWeight: "700",
    color: Colors.primary,
  },

  finalPriceValue: {
    fontSize: fontScale(14),
    fontWeight: "700",
    color: Colors.primary,
  },

  /* BOTTOM */
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

  submitBtn: {
    backgroundColor: "#FF5A1F",
    height: 54,
    borderRadius: Radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },

  submitText: {
    color: "#fff",
    fontSize: fontScale(15),
    fontWeight: "700",
  },
});
