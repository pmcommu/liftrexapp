import React, { useState ,useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,ScrollView,Modal,TextInput,Alert,ActivityIndicator
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import CustomDropdown from "../all/CustomDropdown";
import CustomHeader from "../all/CustomHeader";
import * as IMAGE from "../../assets/svg/index"
import Colors from "../../constants/Colors";
import api from "../../config/api";
import { CommonActions } from "@react-navigation/native";
import Toast from "react-native-toast-message";

export default function CreatePaymentPhases({ navigation }) {

  const token = useSelector(state => state.auth.token);



  const paymentTerms = useSelector(state => state.paymentTerms);
const [submitting, setSubmitting] = useState(false);


   const TABS = React.useMemo(() => {
  return paymentTerms?.groupData?.map(group => ({
    key: group.index,
    label: group.name,           // "M1" or "M1+M2"
    elevators: group.includeElevator,
    total: group.totalGcost,
    phases: group.phases,
  })) || [];
}, [paymentTerms]);

  const { project } = useSelector(
    (state) => state.projectDetails
  );

    const projectdetails = project.proposalDetails;

console.log('project',project)

const [activeTab, setActiveTab] = useState(
  TABS?.[0]?.label || ""
);
console.log('paymetntterm',paymentTerms)




  
  const [editPhase, setEditPhase] = useState(null);


  const DEFAULT_PHASES = [
  { id: 1, name: "Upon signing of proposal - Deposit", percentage: 10 },
  { id: 2, name: "Owner's approval of drawings", percentage: 25 },
  { id: 3, name: "Schedule Delivery of Material", percentage: 10 },
  { id: 4, name: "Upon Delivery of Material", percentage: 10 },
  { id: 5, name: "Installation of Rails", percentage: 10 },
  { id: 6, name: "Running Platform", percentage: 10 },
  { id: 7, name: "Installation of Cab", percentage: 10 },
  { id: 8, name: "Installation of Entrances", percentage: 10 },
  { id: 9, name: "Completion of Elevator Installation", percentage: 5 },
];

const [phases, setPhases] = useState(DEFAULT_PHASES);

console.log(phases)
const activeGroup = React.useMemo(() => {
  return TABS.find(t => t.label === activeTab);
}, [TABS, activeTab]);

const FINAL_PRICE = activeGroup?.total || 0;

const adjustByBasePercentage = (
  currentPhases,
  editedPhase,
  basePhases
) => {
  const editedId = editedPhase.id;
  const editedPercent = parseInt(
    editedPhase.percentage || 0,
    10
  );

  // baaki phases
  const others = currentPhases.filter(
    p => p.id !== editedId
  );

  const remaining = 100 - editedPercent;

  // base total (edited ke alawa)
  const baseTotal = basePhases
    .filter(p => p.id !== editedId)
    .reduce((s, p) => s + p.percentage, 0);

  let result = currentPhases.map(p => {
    if (p.id === editedId) {
      return { ...p, percentage: editedPercent };
    }

    const base = basePhases.find(
      b => b.id === p.id
    )?.percentage || 0;

    const ratio = base / baseTotal;
    const calculated = Math.floor(
      remaining * ratio
    );

    return {
      ...p,
      percentage: calculated,
    };
  });

  // 🔒 rounding fix (total = 100)
  let total = result.reduce(
    (s, p) => s + p.percentage,
    0
  );

  let diff = 100 - total;

  if (diff !== 0) {
    for (let i = 0; i < result.length && diff > 0; i++) {
      if (result[i].id !== editedId) {
        result[i].percentage += 1;
        diff--;
      }
    }
  }

  return result;
};

// const [phases, setPhases] = useState(
//   DEFAULT_PHASES.map(p => ({
//     ...p,
//     amount: "0.00",   // initially empty
//   }))
// );

useEffect(() => {
  setPhases(prev =>
    prev.map(p => ({
      ...p,
      amount: ((FINAL_PRICE * p.percentage) / 100).toFixed(2),
    }))
  );
}, [FINAL_PRICE]);

const openEditPhaseModal = (phase) => {
  setEditPhase({ ...phase });
};
const buildPaymentPayload = () => {
  return {
    // ✅ exact mapping
    projectId: project?.proposalDetails?.project_id,                 // "NQ25107"
    proposalId: project?.proposalDetails?._id,                       // mongo id
    costHistoryId: project?.proposalDetails?.costHistoryId,

     phaseDivision: DEFAULT_PHASES.length,                  // 9

    totalCost: Number(project?.projectData?.updated_final_amount),
    totalDue: Number(project?.projectData?.updated_final_amount),
    totalPaidAmount: 0,

    // ✅ backend expects THIS
    groupData: TABS.map(group => ({
  index: group.key,
  name: group.label,
  includeElevator: group.elevators,
  totalGcost: Number(group.total),
phases: phases.map((p, idx) => {
  const amt = Number(p.amount);

  return {
    order: idx + 1,
    name: p.name,
    percentage: p.percentage,
    amount: amt,

    // 🔥 backend-required defaults
    dueAmount: 0,
    paidAmount: 0,
    status: "Not Started",

    invoiceURL: "",
    isSendInvoice: false,
    sendInvoiceDate: null,
    payDate: null,
  };
})

    })),
  };
};


const submitPaymentTerms = async () => {
  if (submitting) return;

  try {
    setSubmitting(true);

    const payload = buildPaymentPayload();
    console.log("🚀 CREATE PAYMENT PAYLOAD", payload);

    const res = await api.post(
      "/payment/create-details",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res?.data?.success) {
      Toast.show({
        type: "success",
        text1: "Payment Terms Created",
        text2: "Payment terms created successfully",
      });

      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: "ProjectDashboard",
                params: { fromFinalPricing: true },
              },
            ],
          })
        );
      }, 800);
    } else {
      Toast.show({
        type: "error",
        text1: "Failed",
        text2: res?.data?.message || "Something went wrong",
      });
    }
  } catch (error) {
    console.error("PAYMENT API ERROR ❌", error?.response || error);

    Toast.show({
      type: "error",
      text1: "Error",
      text2:
        error?.response?.data?.message ||
        "Failed to create payment terms",
    });
  } finally {
    setSubmitting(false);
  }
};


const formatAmount = (value) => {
  if (!value) return "0.00";

  return Number(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <CustomHeader title="Create Payment Terms"
        onBackPress={() => navigation.goBack()}/>

      {/* INFO CARD */}
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
           <IMAGE.USER_CHECK width={40} height={30} />
          <View>
            <Text style={styles.infoLabel}>Client</Text>
             <Text style={styles.infoValue}>{projectdetails?.client_name}</Text>
          </View>
        </View>
    
        <View style={styles.infoItem}>
           <IMAGE.FLEX width={40} height={30} />
          <View>
            <Text style={styles.infoLabel}>No. of Elevators</Text>
            <Text style={styles.infoValue}>{projectdetails?.no_of_elevator}</Text>
          </View>
        </View>
      </View>
    
      {/* FINAL PRICE */}
      <View style={styles.finalPriceBox}>
      <Text style={styles.finalPriceLabel}>Final Price</Text>
      <Text style={styles.finalPriceValue}>
        $ {formatAmount(project?.proposalDetails?.total_billed)}
    
      </Text>
    </View>
    

      {/* ELEVATOR TABS */}
<View style={styles.tabsRow}>
  {TABS.map(tab => {
    const active = activeTab === tab.label;

    return (
      <TouchableOpacity
        key={tab.key}
        style={styles.tab}
        onPress={() => setActiveTab(tab.label)}
        activeOpacity={0.8}
      >
        {/* CONTENT */}
        <View style={styles.tabContent}>
          <View
            style={[
              styles.checkbox,
              active && styles.checkboxActive,
            ]}
          >
            {active && (
              <Feather name="check" size={12} color="#FFF" />
            )}
          </View>

          <Text
            style={[
              styles.tabText,
              active && styles.tabTextActive,
            ]}
          >
            {tab.label}
          </Text>
        </View>

        {/* FULL WIDTH UNDERLINE */}
        {active && <View style={styles.tabUnderline} />}
      </TouchableOpacity>
    );
  })}
</View>




      {/* PHASE HEADER */}
       <View style={styles.phaseHeader}>
        <Text style={styles.phaseTitle}>Phases</Text>

       <TouchableOpacity
  style={styles.addPhaseBtn}
  activeOpacity={0.8}
  onPress={() =>
    setEditPhase({
      id: Date.now(),          // temp id
      name: "New Phase",
      percentage: 0,
      amount: "0.00",
      isNew: true,             // ⭐ important flag
    })
  }
>
  <Feather name="plus" size={16} color="#FF5A1F" />
  <Text style={styles.addPhaseText}>Add Phases</Text>
</TouchableOpacity>

      </View>

      {/* PHASE LIST */}
     <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {phases.map((item, index) => (
  <TouchableOpacity
    key={item.id}
    style={styles.phaseCard}
    activeOpacity={0.8}
    onPress={() => openEditPhaseModal(item)}
  >
    {/* TOP */}
    <View style={styles.phaseTopRow}>
      <Text style={styles.phaseLabel}>
  {item.name}
</Text>


      <TouchableOpacity onPress={() => deletePhase(item.id)}>
        <Feather name="trash-2" size={18} color="#777" />
      </TouchableOpacity>
    </View>

    {/* INFO */}
    <View style={styles.phaseInfoRow}>
      {/* % */}
      <View style={styles.phaseInfo}>
        <View style={styles.iconCircle}>
          <Feather name="percent" size={14} color="#667085" />
        </View>
        <View>
          <Text style={styles.phaseInfoLabel}>
            Total % Per Phase
          </Text>
          <Text style={styles.phaseInfoValue}>
            {item.percentage}%
          </Text>
        </View>
      </View>

      {/* Amount */}
      <View style={styles.phaseInfo}>
        <View style={styles.iconCircle}>
          <Feather name="dollar-sign" size={14} color="#667085" />
        </View>
        <View>
          <Text style={styles.phaseInfoLabel}>
            Amount
          </Text>
          <Text style={styles.phaseInfoValue}>
            ${item.amount}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
))}

      </ScrollView>

      {/* CONTINUE */}
      {/* <TouchableOpacity
        style={styles.continueBtn}
        onPress={submitPaymentTerms}
      >
        <Text style={styles.continueText}>
          Continue
        </Text>
      </TouchableOpacity> */}
<TouchableOpacity
  disabled={submitting}
  style={[
    styles.continueBtn,
    submitting && { opacity: 0.7 },
  ]}
  onPress={submitPaymentTerms}
  activeOpacity={0.8}
>
  {submitting ? (
    <ActivityIndicator size="small" color="#FFF" />
  ) : (
    <Text style={styles.continueText}>Continue</Text>
  )}
</TouchableOpacity>


     <Modal visible={!!editPhase} transparent animationType="slide">
  <View style={styles.modalOverlay}>

    <View style={styles.editModal}>

      {/* DRAG HANDLE */}
      <View style={styles.dragHandle} />

      {/* TITLE */}
      <Text style={styles.modalTitle}>Edit Phase</Text>

      {/* INPUT : PHASE NAME */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Phase Name</Text>
        <TextInput
          value={editPhase?.name}
          onChangeText={(t) =>
            setEditPhase(p => ({ ...p, name: t }))
          }
          style={styles.input}
          placeholder="Enter phase name"
          placeholderTextColor="#999"
        />
      </View>

      {/* INPUT : PERCENT */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Percentage</Text>

        <View style={styles.percentInputRow}>
          <TextInput
            value={String(editPhase?.percentage)}
            keyboardType="numeric"
           onChangeText={(t) => {
  const value = parseInt(t || "0", 10);

  // modal state
  setEditPhase(p => ({
    ...p,
    percentage: value,
  }));

  // 🔥 MAIN SCREEN LIVE UPDATE (BASE percentage)
  setPhases(prev =>
    adjustByBasePercentage(
      prev,
      { ...editPhase, percentage: value },
      DEFAULT_PHASES
    ).map(p => ({
      ...p,
      amount: ((FINAL_PRICE * p.percentage) / 100).toFixed(2),
    }))
  );
}}

            style={[styles.input, { flex: 1 }]}
            placeholder="0"
            placeholderTextColor="#999"
          />

          <View style={styles.percentBadge}>
            <Text style={styles.percentText}>%</Text>
          </View>
        </View>
      </View>

      {/* CALCULATED AMOUNT */}
      <View style={styles.amountPreview}>
        <Text style={styles.amountLabel}>Calculated Amount</Text>
        <Text style={styles.amountValue}>
          {/* ₹ {((finalPrice * editPhase?.percentage) / 100).toFixed(2)} */}
        </Text>
      </View>

      {/* ACTION BUTTONS */}
      <View style={styles.modalActions}>
        <TouchableOpacity
          onPress={() => setEditPhase(null)}
          style={styles.cancelBtn}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

  <TouchableOpacity
  style={styles.saveBtn}
  onPress={() => {
    setPhases(prev => {
      // 1️⃣ new phase add ya edit phase update
      const updatedList = editPhase.isNew
        ? [...prev, { ...editPhase }]
        : prev.map(p =>
            p.id === editPhase.id ? editPhase : p
          );

      // 2️⃣ BASE percentage ke hisaab se auto adjust
      const adjusted = adjustByBasePercentage(
        updatedList,
        editPhase,
        DEFAULT_PHASES
      );

      // 3️⃣ amount recalc
      return adjusted.map(p => ({
        ...p,
        amount: ((FINAL_PRICE * p.percentage) / 100).toFixed(2),
      }));
    });

    setEditPhase(null);
  }}
>
  <Text style={styles.saveText}>Save</Text>
</TouchableOpacity>

      </View>

    </View>
  </View>
</Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

 
infoRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 16,
  marginHorizontal:40,
  paddingVertical:10,
},

infoItem: {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
},

infoLabel: {
  fontSize: 12,
  color: "#8A8A8A",
},

infoValue: {
  fontSize: 14,
  fontWeight: "600",
},

finalPriceBox: {
 
  borderRadius: 12,
  padding: 14,
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 16,
  marginHorizontal:40,
},

finalPriceLabel: {
  fontSize: 14,
  color: "#111111",
  fontWeight: "600",
},

finalPriceValue: {
  fontSize: 16,
  fontWeight: "700",
  color: "#1c1c1c",
},



  addPhase: {
    color: "#FF5A1F",
    fontWeight: "600",
  },





/////////////////////TAB ROW ////////             ////////////////////

tabsRow: {
  flexDirection: "row",
  borderBottomWidth: 1,
  borderColor: "#EEE",
},

tab: {
  flex: 1,                   
  alignItems: "center",
  paddingVertical: 14,
  position: "relative",
},

tabContent: {
  flexDirection: "row",
  alignItems: "center",
},

checkbox: {
  width: 18,
  height: 18,
  borderWidth: 1,
  borderColor: "#AAA",
  borderRadius: 4,
  marginRight: 6,
  alignItems: "center",
  justifyContent: "center",
},

checkboxActive: {
  backgroundColor: "#FF5A1F",
  borderColor: "#FF5A1F",
},

tabText: {
  fontSize: 14,
  color: "#444",
  fontWeight: "600",
},

tabTextActive: {
  color: "#FF5A1F",
},

tabUnderline: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,                  
  height: 2,
  backgroundColor: "#FF5A1F",
},


  /* ////////////////////Header//////////////////// */
  phaseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
    marginHorizontal:10,
  },
  phaseTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  addPhaseBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  addPhaseText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "600",
    color: "#FF5A1F",
  },

  /* /////////////////////Phase Card ////////////////////*/
phaseInfoRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 6,
},

phaseInfo: {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
  width: "48%",  
},

iconCircle: {
  width: 32,
  height: 32,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: Colors.border,
  alignItems: "center",
  justifyContent: "center",
},


  phaseCard: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    marginHorizontal:10,
    borderWidth:1,
    borderColor:Colors.border,
  },
  phaseTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  phaseLabel: {
    fontSize: 16,
    fontWeight: "700",
  },


  phaseInfoLabel: {
    fontSize: 12,
    color: "#667085",
  },
  phaseInfoValue: {
    fontSize: 14,
    fontWeight: "700",
  },

  /* ////////////////////Continue //////////////////*/
  continueBtn: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: "#FF5A1F",
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: "center",
  },
  continueText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },




  /////////////////////////////
modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.45)",
  justifyContent: "flex-end",
},

editModal: {
  backgroundColor: "#FFF",
  padding: 20,
  borderTopLeftRadius: 22,
  borderTopRightRadius: 22,
},

dragHandle: {
  width: 40,
  height: 5,
  backgroundColor: "#DDD",
  borderRadius: 4,
  alignSelf: "center",
  marginBottom: 12,
},

modalTitle: {
  fontSize: 18,
  fontWeight: "700",
  marginBottom: 20,
  textAlign: "center",
},

inputGroup: {
  marginBottom: 14,
},

inputLabel: {
  fontSize: 12,
  fontWeight: "600",
  color: "#667085",
  marginBottom: 6,
},

input: {
  borderWidth: 1,
  borderColor: "#E4E7EC",
  borderRadius: 12,
  paddingHorizontal: 14,
  paddingVertical: 12,
  fontSize: 14,
  color: "#111",
  backgroundColor: "#FFF",
},

percentInputRow: {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
},

percentBadge: {
  paddingHorizontal: 14,
  paddingVertical: 12,
  borderRadius: 12,
  backgroundColor: "#F2F4F7",
},

percentText: {
  fontSize: 14,
  fontWeight: "700",
  color: "#111",
},

amountPreview: {
  backgroundColor: "#F9FAFB",
  borderRadius: 12,
  padding: 14,
  marginTop: 10,
},

amountLabel: {
  fontSize: 12,
  color: "#667085",
},

amountValue: {
  fontSize: 16,
  fontWeight: "700",
  marginTop: 4,
},

modalActions: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 24,
},

cancelBtn: {
  paddingVertical: 12,
  paddingHorizontal: 24,
},

cancelText: {
  fontSize: 14,
  fontWeight: "600",
  color: "#667085",
},

saveBtn: {
  backgroundColor: "#FF5A1F",
  paddingVertical: 12,
  paddingHorizontal: 28,
  borderRadius: 24,
},

saveText: {
  color: "#FFF",
  fontSize: 14,
  fontWeight: "700",
},


});
