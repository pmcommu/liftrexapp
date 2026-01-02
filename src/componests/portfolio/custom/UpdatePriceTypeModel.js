import React, { useState, forwardRef } from "react";
import { View, Text, TouchableOpacity, Alert ,StyleSheet,ActivityIndicator} from "react-native";
import { Modalize } from "react-native-modalize";
import Feather from "react-native-vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../config/api";
import Toast from "react-native-toast-message";


import D, {
  moderateScale,
  scale,
  verticalScale,
  fontScale,
  Spacing,
  Radius,SCREEN_HEIGHT,SCREEN_WIDTH
} from "../../../constants/Dimmence";
import Colors from "../../../constants/Colors";
import { resetPaymentTerms } from "../../../redux/Slices/paymentTermsSlice";

const PRICE_TYPE_MAP = {
  START: "Starter Price",
  NEGOTIATED: "Negotiated Price",
  BEST: "Best Price",
};

const UpdatePriceTypeModal = forwardRef(
  ({ navigation, onUpdated }, ref) => {

  
  const [selected, setSelected] = useState("START");

  const token = useSelector(state => state.auth.token);
  const inquiry = useSelector(state => state.selectedInquiry.inquiry);

 const { project, loading, error } = useSelector(
        (state) => state.projectDetails
      );


      const [submitting, setSubmitting] = useState(false);

 const parsedCostHistory = React.useMemo(() => {
    const jsonString =
      project?.projectData?.cost_history_json;

    if (!jsonString) {
      console.log("❌ cost_history_json missing");
      return null;
    }

    try {
      return JSON.parse(jsonString);
    } catch (e) {
      console.log("❌ JSON PARSE ERROR >>>", e);
      return null;
    }
  }, [project]);

  /* ===============================
     2️⃣ BUILD CLEAN RESULTS
     =============================== */
  const cleanedResults = React.useMemo(() => {
    if (!parsedCostHistory?.input_details) return {};

    return Object.fromEntries(
      Object.entries(parsedCostHistory.input_details).map(
        ([key, val]) => [
          key,
          {
            req_body: val.req_body,
            dataArray: val.dataArray,
          },
        ]
      )
    );
  }, [parsedCostHistory]);


console.log(cleanedResults)

const handleUpdatePriceType = async () => {
  if (submitting) return;

  if (!token) {
    Toast.show({
      type: "error",
      text1: "Auth Error",
      text2: "Token missing",
    });
    return;
  }

  if (!project?.projectData?._id) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Project data missing",
    });
    return;
  }

  const selectedPriceType = PRICE_TYPE_MAP[selected];

  try {
    setSubmitting(true);

    const payload = {
      elevator_cost_details: cleanedResults,
      project_id: project.projectData._id,
      project_name: project.projectData.project_name,
      project_created_for:
        project.projectData.project_created_for,
      price_type: selectedPriceType,
      is_edit_case: true,
      is_update_note: false,
    };

    const response = await api.post(
      "/calculate_additional_cost_of_elevators",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // ✅ SUCCESS TOAST (PRICE TYPE SPECIFIC)
    Toast.show({
      type: "success",
      text1: "Price Type Updated",
      text2: `${selectedPriceType} applied successfully`,
    });

    onUpdated?.();          // refresh parent
    ref.current?.close();   // close modal

  } catch (err) {
    Toast.show({
      type: "error",
      text1: "Update Failed",
      text2:
        err?.response?.data?.message ||
        "Failed to update price type",
    });
  } finally {
    setSubmitting(false);
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
      submitting && styles.nextBtnDisabled,
    ]}
    onPress={handleUpdatePriceType}
    activeOpacity={submitting ? 1 : 0.85}
    disabled={submitting}
  >
    {submitting ? (
      <ActivityIndicator size="small" color="#fff" />
    ) : (
      <>
        <Text style={styles.nextText}>Update</Text>
        <Feather name="arrow-right" size={16} color="#fff" />
      </>
    )}
  </TouchableOpacity>
</View>

    </View>
  </Modalize>
);

});



export default  UpdatePriceTypeModal ;
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

  nextText: {
    color: "#fff",
    fontSize: fontScale(13),
    fontWeight: "600",
  },
  nextBtnDisabled: {
  opacity: 0.7,
},
});
