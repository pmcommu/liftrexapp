import React, { useState, forwardRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Modalize } from "react-native-modalize";
import Feather from "react-native-vector-icons/Feather";
import {
  Spacing,
  Radius,
  fontScale,
  verticalScale,
} from "../../../constants/Dimmence";
import Colors from "../../../constants/Colors";
const FinalPricingModal = forwardRef(({ pricingData }, ref) => {


const material = pricingData?.dataArray?.[0] || {};
const summary = pricingData?.dataArray?.[1] || {};
const discount = pricingData?.req_body?.discount_amount || 0;

console.log('discount',discount)
  const [showCost, setShowCost] = useState(true);
  const [showExtra, setShowExtra] = useState(false);

  const Row = ({ label, value, highlight }) => (
    <View style={styles.row}>
      <Text style={[styles.label, highlight && styles.highlight]}>
        {label}
      </Text>
      <Text style={[styles.value, highlight && styles.highlight]}>
        {value}
      </Text>
    </View>
  );

  return (
    <Modalize
      ref={ref}
      modalHeight={verticalScale(560)}
      adjustToContentHeight={false}
      handleStyle={{ opacity: 0 }}
      modalStyle={styles.modal}
      overlayStyle={styles.overlay}
    >
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Final Pricing</Text>
          <Text style={styles.subtitle}>
            Review the complete pricing breakdown and confirm all
            details before submitting the proposal
          </Text>
        </View>

        <TouchableOpacity onPress={() => ref.current?.close()}>
          <Feather name="x" size={22} />
        </TouchableOpacity>
      </View>

      {/* ===== COST BREAKDOWN ===== */}
     <View style={styles.sectionContainer}>
  
  {/* HEADER */}
  <TouchableOpacity
    style={styles.sectionHeader}
    onPress={() => setShowCost(!showCost)}
    activeOpacity={0.8}
  >
    <Text style={styles.sectionTitle}>Cost Breakdown</Text>
    <Feather
      name={showCost ? "chevron-up" : "chevron-down"}
      size={20}
    />
  </TouchableOpacity>

  {/* BODY */}
{showCost && (
  <View style={styles.sectionBody}>
    <Row
      label="Small Material Cost"
      value={`$ ${Number(material["Small Material Cost"] || 0).toLocaleString()}`}
    />
    <Row
      label="Big Material Cost"
      value={`4 ${Number(material["Big Material Cost"] || 0).toLocaleString()}`}
    />
    <Row
      label="Total Material Cost"
      value={`$ ${Number(summary["Total Material Cost"] || 0).toLocaleString()}`}
    />
    <Row
      label="Labour Cost"
      value={`$ ${Number(summary["Labor Cost"] || 0).toLocaleString()}`}
    />
    <Row
      label="Annual Maintenance"
      value={`$ ${Number(summary["1 year maintainance"] || 0).toLocaleString()}`}
    />
  </View>
)}


</View>

      {/* ===== ADDITIONAL CHARGES ===== */}
 <View style={styles.sectionContainer}>
  
  {/* HEADER */}
  <TouchableOpacity
    style={styles.sectionHeader}
    onPress={() => setShowExtra(!showExtra)}
    activeOpacity={0.8}
  >
    <Text style={styles.sectionTitle}>Additional Charges</Text>
    <Feather
      name={showExtra ? "chevron-up" : "chevron-down"}
      size={20}
    />
  </TouchableOpacity>

  {/* BODY */}
{showExtra && (
  <View style={styles.sectionBody}>
    <Row
      label="Material Margin"
      value={`$ ${Number(summary["Material Margin"] || 0).toLocaleString()}`}
    />
    <Row
      label="Tax 9%"
      value={`$ ${Number(summary["9% Tax"] || 0).toLocaleString()}`}
    />
  </View>
)}


</View>


      {/* ===== TOTAL CALCULATION ===== */}
    <View style={styles.totalBox}>
  <Text style={styles.sectionTitle}>Total Calculation</Text>

  <Row
    label="Total Price"
    value={`$ ${Number(summary["Total Price"] || 0).toLocaleString()}`}
  />

  <Row
    label="Discount Amount"
    value={`- $ ${Number(discount || 0).toLocaleString()}`}
  />

  <Row
    label="DOB Fees"
    value={`$ ${Number(summary["DOB fees"] || 0).toLocaleString()}`}
  />

  <Row
    label="Margin of Error"
    value={`$ ${Number(summary["Margin of error"] || 0).toLocaleString()}`}
  />

  <View style={styles.divider} />

  <Row
    label="Final Price"
    value={`$ ${Number(summary["Final Price"] || 0).toLocaleString()}`}
    highlight
  />
</View>

    </Modalize>
  );
});

export default FinalPricingModal;
const styles = StyleSheet.create({
  modal: {
    borderTopLeftRadius: Radius.md,
    borderTopRightRadius: Radius.md,
    padding: Spacing.md,
  },

  overlay: {
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(12),
  },

  title: {
    fontSize: fontScale(18),
    fontWeight: "700",
    color: "#111",
  },

  subtitle: {
    fontSize: fontScale(14),
    color: "#666",
    marginTop: verticalScale(4),
    maxWidth: "90%",
  },

sectionContainer: {
  borderWidth: 1,
  borderColor: "#E5E7EB",
  borderRadius: Radius.md,
  marginTop: verticalScale(10),
  overflow: "hidden", // ⭐ VERY IMPORTANT
},

sectionHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: Spacing.sm,
  backgroundColor: "#fff",
},

sectionBody: {
  padding: Spacing.sm,
  borderTopWidth: 1,            // ⭐ ONLY TOP BORDER
  borderTopColor: "#E5E7EB",
},


  sectionTitle: {
    fontSize: fontScale(14),
    fontWeight: "700",
    color: "#111",
  },



  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: verticalScale(4),
  },

  label: {
    fontSize: fontScale(13),
    color: "#555",
  },

  value: {
    fontSize: fontScale(13),
    fontWeight: "600",
    color: "#111",
  },

  totalBox: {
    backgroundColor: "#F9FAFB",
    borderRadius: Radius.md,
    padding: Spacing.sm,
    marginTop: verticalScale(14),
  },

  divider: {
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
    marginVertical: verticalScale(8),
  },

  highlight: {
    color: Colors.primary || "#FF5A1F",
    fontWeight: "700",
  },
});
