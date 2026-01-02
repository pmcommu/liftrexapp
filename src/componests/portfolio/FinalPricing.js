import React ,{useState}from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,Alert
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
import { useSelector,useDispatch } from "react-redux";
import api from "../../config/api";
import Toast from "react-native-toast-message"; 
import { CommonActions } from "@react-navigation/native";
import {
clearProjectDetails
} from "../../redux/Slices/projectDetailsSlice";
export default function FinalPricing({ navigation }) {

  const dispatch = useDispatch();
const [submitting, setSubmitting] = useState(false);
const [statusMsg, setStatusMsg] = useState("");
const [statusType, setStatusType] = useState("");

      const { project, loading, error } = useSelector(
    (state) => state.projectDetails
  );
 const token = useSelector(state => state.auth.token);
  const priceType = useSelector(
  state => state.calculateCost.priceType
);
const inquiry = useSelector(
    (state) => state.selectedInquiry.inquiry
  );
console.log(priceType)

const resultsByForm = useSelector(
  state => state.calculateCost.resultsByForm
);

console.log('resultl',resultsByForm)
const elevatorEntries = React.useMemo(
  () => Object.entries(resultsByForm || {}),
  [resultsByForm]
);


const formatINR = (value = 0) =>
  `₹ ${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;




const getOriginalAmountByPriceType = (data) => {
  // ✅ API calculated final price (preferred)
  if (data?.dataArray?.[1]?.["Final Price"]) {
    return Number(data.dataArray[1]["Final Price"]);
  }

  return 0;
};

const totals = React.useMemo(() => {
  let subtotal = 0;

  elevatorEntries.forEach(([_, data]) => {
    const originalAmount =
      getOriginalAmountByPriceType(data);

    const discount =
      Number(data?.req_body?.discount_amount) || 0;

    const upcharge =
      Number(data?.req_body?.upcharge_amount) || 0;

    subtotal += originalAmount - discount + upcharge;
  });

  return {
    subtotal,
    finalPrice: subtotal,
  };
}, [elevatorEntries, priceType]);




const handleGenerateProposal = async () => {
  if (submitting) return;

  if (!token) {
    Toast.show({
      type: "error",
      text1: "Auth Error",
      text2: "Token missing",
    });
    return;
  }

  if (!inquiry?.costHistoryId) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Project ID missing",
    });
    return;
  }

  try {
    setSubmitting(true);

    const cleanedResults = Object.fromEntries(
      Object.entries(resultsByForm || {}).map(([key, val]) => [
        key,
        {
          req_body: val.req_body,
          dataArray: val.dataArray,
        },
      ])
    );

    const payload = {
      elevator_cost_details: cleanedResults,
      project_id: inquiry.costHistoryId,
      project_name: inquiry.projectName || "",
      project_created_for:
        inquiry?.client?.companyRepresentative || "",
      price_type: priceType,
      is_edit_case: true,
      is_update_note: false,
    };

    await api.post(
      "/calculate_additional_cost_of_elevators",
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // ✅ SUCCESS TOAST
    Toast.show({
      type: "success",
      text1: "Proposal Generated",
      text2: "Pricing calculated successfully",
    });

    // 🚀 Navigate to ProjectDashboard (after short delay)
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "ProjectDashboard" }],
        })
      );
    }, 1200);

  } catch (err) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2:
        err?.response?.data?.message ||
        "Failed to calculate pricing",
    });
  } finally {
    setSubmitting(false);
  }
};


const handleGoToDashboard = () => {
  dispatch(clearProjectDetails()); // project clear ok

  navigation.replace("ProjectDashboard", {
    fromFinalPricing: true,
  });
};


  return (
    <View style={styles.container}>
        <CustomHeader title="Final Pricing"
          // onBackPress={() => navigation.goBack()}
        />
    

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ELEVATOR CARDS */}
{elevatorEntries.map(([label, elevatorData]) => {
  const originalAmount =
    getOriginalAmountByPriceType(elevatorData);

  const discount =
    Number(elevatorData?.req_body?.discount_amount) || 0;

  const upcharge =
    Number(elevatorData?.req_body?.upcharge_amount) || 0;

  const finalAmount =
    originalAmount - discount + upcharge;

  return (
    <View key={label} style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>
          {label} 
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Original Amount:</Text>
        <Text style={styles.value}>
          {formatINR(originalAmount)}
        </Text>
      </View>

      {discount > 0 && (
        <View style={styles.row}>
          <Text style={[styles.label, { color: "red" }]}>
            Discount:
          </Text>
          <Text style={[styles.value, { color: "red" }]}>
            - {formatINR(discount)}
          </Text>
        </View>
      )}

      {upcharge > 0 && (
        <View style={styles.row}>
          <Text style={[styles.label, { color: "green" }]}>
            Upcharge:
          </Text>
          <Text style={[styles.value, { color: "green" }]}>
            + {formatINR(upcharge)}
          </Text>
        </View>
      )}

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.finalLabel}>
          Final Amount:
        </Text>
        <Text style={styles.finalValue}>
          {formatINR(finalAmount)}
        </Text>
      </View>
    </View>
  );
})}


        {/* TOTAL CALCULATION */}
    <View style={styles.totalCard}>
  <Text style={styles.totalTitle}>
    Total Calculation
  </Text>

  <View style={styles.splitRow}>
    <Text style={styles.label}>
      Subtotal (All Elevators)
    </Text>
    <Text style={styles.value}>
      {formatINR(totals.subtotal)}
    </Text>
  </View>

  <View style={styles.dashedDivider} />

  <View style={styles.splitRow}>
    <Text style={styles.finalPriceLabel}>
      Final Price
    </Text>
    <Text style={styles.finalPriceValue}>
      {formatINR(totals.finalPrice)}
    </Text>
  </View>
</View>


        <View style={{ height: 100 }} />
      </ScrollView>

      {/* BOTTOM BUTTON */}
     <View style={styles.bottomBar}>
  <TouchableOpacity
    style={[
      styles.submitBtn,
      submitting && styles.submitBtnDisabled,
    ]}
    onPress={handleGoToDashboard }
    disabled={submitting}
    activeOpacity={submitting ? 1 : 0.85}
  >
    {submitting ? (
      <Text style={styles.submitText}>Submitting...</Text>
    ) : (
      <Text style={styles.submitText}>Submit Now</Text>
    )}
  </TouchableOpacity>
</View>

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
    fontSize: fontScale(14),
    fontWeight: "700",
    marginBottom: verticalScale(8),
  },

  finalPriceLabel: {
    fontSize: fontScale(13),
    fontWeight: "700",
    color: Colors.primary,
  },

  finalPriceValue: {
    fontSize: fontScale(13),
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
  submitBtnDisabled: {
  opacity: 0.7,
},
});
