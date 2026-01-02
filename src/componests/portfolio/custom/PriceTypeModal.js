import React, { useState, forwardRef ,} from "react";
import { View, Text, TouchableOpacity, Alert ,StyleSheet,ActivityIndicator, Platform} from "react-native";
import { Modalize } from "react-native-modalize";
import Feather from "react-native-vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../config/api";
import { setPriceType } from "../../../redux/Slices/calculateCostSlice";
import {
  pricingStart,
  pricingSuccess,
  pricingError,
} from "../../../redux/Slices/calculatePricingSlice";
import D, {
  moderateScale,
  scale,
  verticalScale,
  fontScale,
  Spacing,
  Radius,SCREEN_HEIGHT,SCREEN_WIDTH
} from "../../../constants/Dimmence";
import Colors from "../../../constants/Colors";
import Toast from "react-native-toast-message";

const PRICE_TYPE_MAP = {
  START: "Starter Price",
  NEGOTIATED: "Negotiated Price",
  BEST: "Best Price",
};

const PriceTypeModal = forwardRef(({ navigation }, ref) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("START");

  const token = useSelector(state => state.auth.token);
  const inquiry = useSelector(state => state.selectedInquiry.inquiry);

const [loading, setLoading] = useState(false);
  const resultsByForm = useSelector(
    state => state.calculateCost.resultsByForm
  );


  const elevatorEntries = React.useMemo(
    () => Object.entries(resultsByForm || {}),
    [resultsByForm]
  );
  

  const getOriginalAmountByPriceType = (data) => {
    // ✅ API calculated final price (preferred)
    if (data?.dataArray?.[1]?.["Final Price"]) {
      return Number(data.dataArray[1]["Final Price"]);
    }
  
    return 0;
  };
  const totals = React.useMemo(() => {
  let subtotal = 0;
  let totalDiscounts = 0;
  let totalUpcharges = 0;

  elevatorEntries.forEach(([key, data]) => {
    const baseFinalPrice =
      Number(data?.dataArray?.[1]?.["Final Price"]) || 0;

    const discount =
      Number(data?.req_body?.discount_amount) || 0;

    const upcharge =
      Number(data?.req_body?.upcharge_amount) || 0;

    subtotal += baseFinalPrice;
    totalDiscounts += discount;
    totalUpcharges += upcharge;
  });

  const finalProjectCost =
    subtotal - totalDiscounts + totalUpcharges;

  return {
    subtotal,
    totalDiscounts,
    totalUpcharges,
    finalPrice: finalProjectCost,
  };
}, [elevatorEntries]);


 console.log("===== PROJECT PRICE DEBUG =====");
console.log("Subtotal (Σ Final Price):", totals.subtotal);
console.log("Total Discounts:", totals.totalDiscounts);
console.log("Total Upcharges:", totals.totalUpcharges);
console.log("FINAL PROJECT COST:", totals.finalPrice);
console.log("================================");

const currentStatus = inquiry.status;
const isEditCase = ["GENERATED", "SEND"].includes(currentStatus);

const handleProceed = async () => {
  if (!token || !inquiry?._id) {
    Alert.alert("Error", "Required data missing");
    return;
  }

  try {
    setLoading(true);
    dispatch(pricingStart());

    const selectedPriceType = PRICE_TYPE_MAP[selected];
    dispatch(setPriceType(selectedPriceType));

    // ✅ Optional user feedback
    if (Platform.OS === "android") {
      Toast.show({
        type: "info",
        text1: "Calculating pricing",
        text2: "Please wait...",
      });
    }

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
  inquiryProposalId: inquiry._id,
  project_name: inquiry.projectName || "",
  project_created_for:
    inquiry?.client?.companyRepresentative || "",
  price_type: selectedPriceType,

  // 🔥 MOST IMPORTANT FIX
  is_edit_case: isEditCase,

  is_update_note: false,
  updated_final_amount: Number(totals.finalPrice) || 0,
};


    // 🔹 API 1
    const pricingRes = await api.post(
      "/calculate_additional_cost_of_elevators",
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch(pricingSuccess(pricingRes.data));

    // 🔹 API 2
    await api.put(
      "proposal/tab-status",
      {
        proposalId: inquiry._id,
        newStatus: "GENERATED",
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // ✅ Success feedback
    Toast.show({
      type: "success",
      text1: "Pricing Generated",
      text2: "Final pricing created successfully",
    });

    ref.current?.close();
    navigation.navigate("FinalPricing");

  } catch (err) {
    dispatch(pricingError(err?.response?.data));

    Alert.alert(
      "Error",
      err?.response?.data?.message ||
        "Pricing calculation failed"
    );
  } finally {
    setLoading(false);
  }
};



  return (
  <Modalize
    ref={ref}
    adjustToContentHeight
    modalStyle={styles.modal}
    overlayStyle={styles.overlay}
    handleStyle={{ opacity: 0 }}
  >
    <View style={styles.content}>
      {/* TITLE */}
      <Text style={styles.title}>Select Price Type</Text>
      <Text style={styles.subTitle}>
        Choose the most suitable pricing option for this proposal before proceeding.
      </Text>

      {/* OPTIONS */}
      {Object.keys(PRICE_TYPE_MAP).map(key => (
        <TouchableOpacity
          key={key}
          style={styles.optionRow}
          onPress={() => setSelected(key)}
          activeOpacity={0.8}
        >
          {/* RADIO */}
          <View style={styles.radioOuter}>
            {selected === key && <View style={styles.radioInner} />}
          </View>

          {/* TEXT */}
          <View style={{ flex: 1 }}>
            <Text style={styles.optionTitle}>
              {PRICE_TYPE_MAP[key]}
            </Text>

            {/* optional subtitle if needed later */}
            {/* <Text style={styles.optionSub}>Subtitle here</Text> */}
          </View>
        </TouchableOpacity>
      ))}

      {/* FOOTER */}
     <View style={styles.footer}>
  <TouchableOpacity
    style={[
      styles.nextBtn,
      loading && styles.nextBtnDisabled,
    ]}
    activeOpacity={loading ? 1 : 0.85}
    disabled={loading}
    onPress={handleProceed}
  >
    {loading ? (
      <ActivityIndicator size="small" color="#fff" />
    ) : (
      <>
        <Text style={styles.nextText}>Next</Text>
        <Feather name="arrow-right" size={16} color="#fff" />
      </>
    )}
  </TouchableOpacity>
</View>

    </View>
  </Modalize>
);

});



export default PriceTypeModal;
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
    fontSize: fontScale(16),
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: verticalScale(12),
  },
subTitle: {
  fontSize: fontScale(14),
  color: Colors.textMedium || "#777",
  marginBottom: verticalScale(14),
  lineHeight: 18,
},

  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(12),
    gap: 12,
  },

  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
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

  footer: {
    alignItems: "flex-end",
    marginTop: verticalScale(16),
  },

  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.primary,
    paddingVertical: verticalScale(10),
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.pill,
  },
nextBtnDisabled: {
  opacity: 0.7,
},
  nextText: {
    color: "#fff",
    fontSize: fontScale(13),
    fontWeight: "600",
  },
});
