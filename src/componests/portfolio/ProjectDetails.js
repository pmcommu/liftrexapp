import React ,{useState,useRef,useEffect}from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,Alert,ActivityIndicator
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../../constants/Colors";
import D, {
  moderateScale,
  verticalScale,
  fontScale,
  Spacing,
  Radius,
} from "../../constants/Dimmence";
import * as IMAGE from "../../assets/svg";
import CustomHeader from "../all/CustomHeader";
import CustomInput from "../all/CustomInput";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import CustomInfoModal from "../../componests/portfolio/custom/CustomInfoModal"
import PriceTypeModal from "../../componests/portfolio/custom/PriceTypeModal";
import CreateProposalModal from "./custom/CreateProposalModal";
import { useSelector,useDispatch } from "react-redux";
import DeleteConfirmModal from '../all/DeleteConfirmModal'
import api from "../../config/api";
import AddNotesModal from "./custom/AddNotesModal";
import { hydrateDraftResults,clearFormResult ,clearAllResults,setPriceType} from "../../redux/Slices/calculateCostSlice";
import Toast from "react-native-toast-message";

export default function ProjectDetails({ navigation ,route}) {
  const dispatch = useDispatch();

  const mode = route.params?.mode; // "CREATE" | "DRAFT" | "EDIT"
const isEditMode = mode === "EDIT";

  const token = useSelector((state) => state.auth.token);

  const priceModalRef = useRef(null);
 const modalRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const [showNotes, setShowNotes] = useState(false);

const [deleteTag, setDeleteTag] = useState(null);
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [draftSubmitting, setDraftSubmitting] = useState(false);

const resultsByForm = useSelector(
  state => state.calculateCost.resultsByForm
);
console.log('resultform',resultsByForm)
 const inquiry = useSelector( (state) => state.selectedInquiry.inquiry );

console.log('inquryry',inquiry)

const totalRequiredTags =
  inquiry.noOfMRL +
  inquiry.noOfTraction +
  inquiry.noOfHydrolic;
const filledTagsCount = Object.keys(resultsByForm || {}).length;

const hasAnyFilled = filledTagsCount > 0;

const allFilled = filledTagsCount === totalRequiredTags;


 const generateTags = (prefix, count) => {
  return Array.from({ length: count }, (_, i) => `${prefix}${i + 1}`);
};

const handleSaveDraft = async () => {
  if (draftSubmitting) return;

  if (!resultsByForm || Object.keys(resultsByForm).length === 0) {
    Toast.show({
      type: "info",
      text1: "No Data",
      text2: "Please fill at least one elevator",
    });
    return;
  }

  try {
    setDraftSubmitting(true);

    const payload = {
      inquiryProposalId: inquiry._id,
      draftJson: {
        elevatorDataList: resultsByForm,
      },
    };

    await api.post("/proposal/draft", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // ✅ SUCCESS TOAST
    Toast.show({
      type: "success",
      text1: "Draft Saved",
      text2: "Proposal draft saved successfully",
    });

  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Failed to save draft",
    });
  } finally {
    setDraftSubmitting(false);
  }
};


const fetchDraftProposal = async () => {
  try {
    const response = await api.get(
      `/proposal/draft`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          draftId: inquiry.draftId,
          inquiryProposalId: inquiry._id,
        },
      }
    );

    const elevatorDataList =
      response.data?.data?.draftJson?.elevatorDataList || {};
    console.log('elevaterlist',elevatorDataList)
    dispatch(hydrateDraftResults(elevatorDataList));

  } catch (error) {
    console.log(
      "Draft fetch error:",
      error?.response?.data || error
    );
  }
};

// useEffect(() => {
//   if (route.params?.mode !== "DRAFT") return;
//   if (!inquiry?._id || !inquiry?.draftId) return;

//   fetchDraftProposal();
// }, [route.params?.mode, inquiry?._id, inquiry?.draftId]);


useEffect(() => {
  const mode = route.params?.mode;

  // 🟡 Sirf DRAFT ya EDIT me hi API call ho
 // if (mode !== "DRAFT" && mode !== "EDIT") return;

  if (!inquiry?._id || !inquiry?.draftId) return;

  fetchDraftProposal();
}, [
  route.params?.mode,
  inquiry?._id,
  inquiry?.draftId,
]);

// useEffect(() => {
//   if (!inquiry?._id) return;

//   // 🔥 NEW PROJECT → CLEAR OLD DATA
//   dispatch(clearAllResults());

// }, [inquiry?._id]);

useEffect(() => {
  if (!inquiry?._id) return;

  const isEdit =
    inquiry?.status === "GENERATED" ||
    inquiry?.status === "SEND";

  // 🟢 Sirf NEW inquiry me clear karo
  if (!isEdit) {
    dispatch(clearAllResults());
  }
}, [inquiry?._id, inquiry?.status]);


const PRICE_TYPE_MAP = {
  START: "Starter Price",
  NEGOTIATED: "Negotiated Price",
  BEST: "Best Price",
};






  return (
    <View style={styles.container}>
      {/* HEADER */}
      <CustomHeader title="Project Details"
      onBackPress={() => navigation.goBack()}/>

      <ScrollView contentContainerStyle={{ padding: Spacing.md }}>
        {/* PROJECT CARD */}
    <View style={styles.projectCard}>

  {/* HEADER ROW */}
  <View style={styles.headerRow}>
    {/* LEFT CONTENT */}
   <View style={styles.headerLeft}>
  <IMAGE.FOLDER width={28} height={28} />

  <View style={styles.headerTextBox}>
    <Text style={styles.codeText}>
      {inquiry?.projectId || "--"}
    </Text>

    <Text style={styles.address}>
      {inquiry?.projectName || "--"}
    </Text>
  </View>
</View>

    {/* RIGHT ARROW */}
    <RectButton
      rippleColor="#d1d1d1"
 onPress={() => {
    setShowModal(true);   // ✅ ADD THIS
  }}
      style={styles.iconWrapper}
    >
      <IMAGE.ARROW width={22} height={25} />
    </RectButton>
  </View>

  <View style={styles.sectionDivider} />

  <View style={styles.projectActions}>
   <TouchableOpacity
  style={styles.actionBtn}
  onPress={() => modalRef.current?.open()}   // ✅ IMPORTANT
>
  <Feather name="plus" size={24} color={Colors.primary} />
  <Text style={styles.actionText}>Add New Elevator</Text>
</TouchableOpacity>


    <TouchableOpacity style={styles.actionBtn}  onPress={() => setShowNotes(true)}>
      <Feather name="edit-3" size={24} color={Colors.statusColor} />
      <Text style={[styles.actionText, { color: Colors.statusColor }]}>
        Add Notes
      </Text>
    </TouchableOpacity>
  </View>

</View>


        {/* ELEVATORS */}
     {/* ELEVATORS */}
<Text style={styles.sectionTitle}>Elevators</Text>

{/* MRL */}
{inquiry.noOfMRL > 0 && (
 <ElevatorCard
  title="Machine Room-Less Elevator (MRL)"
  qty={`${inquiry.noOfMRL} Qty.`}
  tags={generateTags("M", inquiry.noOfMRL)}
  prefix="M"
  resultsByForm={resultsByForm}
  onDeleteTag={(tag) => {
    setDeleteTag(tag);
    setShowDeleteModal(true);
  }}
/>

)}

{/* Traction */}
{inquiry.noOfTraction > 0 && (
<ElevatorCard
  title="Traction Elevator (TE)"
  qty={`${inquiry.noOfTraction} Qty.`}
  tags={generateTags("T", inquiry.noOfTraction)}
  prefix="T"
  resultsByForm={resultsByForm}
  onDeleteTag={(tag) => {
    setDeleteTag(tag);
    setShowDeleteModal(true);
  }}
/>

)}

{/* Hydraulic */}
{inquiry.noOfHydrolic > 0 && (
 <ElevatorCard
  title="Hydraulic Elevator (HE)"
  qty={`${inquiry.noOfHydrolic} Qty.`}
  tags={generateTags("H", inquiry.noOfHydrolic)}
  prefix="H"
  resultsByForm={resultsByForm}
  onDeleteTag={(tag) => {
    setDeleteTag(tag);
    setShowDeleteModal(true);
  }}
/>

)}

      </ScrollView>
     

{/* BOTTOM ACTION BAR */}
{hasAnyFilled && (
  <View style={styles.bottomBar}>

    {/* SAVE DRAFT → ONLY when NOT EDIT */}
    {!isEditMode && (
<TouchableOpacity
  style={[
    styles.draftBtn,
    draftSubmitting && styles.draftBtnActive,
  ]}
  activeOpacity={0.6}
  disabled={draftSubmitting}
  onPress={handleSaveDraft}
>
  <Text
    style={[
      styles.draftText,
      draftSubmitting && styles.draftTextActive,
    ]}
  >
    {draftSubmitting ? "Saving..." : "Save Draft"}
  </Text>
</TouchableOpacity>

    )}

    {/* CREATE / UPDATE BUTTON */}
    <TouchableOpacity
      style={[
        styles.primaryBtn,
        !allFilled && styles.primaryBtnDisabled,
      ]}
      activeOpacity={allFilled ? 0.8 : 1}
      disabled={!allFilled}
      onPress={() => {
        if (!allFilled) return;

        if (isEditMode) {
          // ✅ EDIT MODE → DIRECT FINAL PRICING
          navigation.navigate("EditFinalPricing", {
            mode: "EDIT",
          });
        } else {
          // ✅ CREATE MODE → PRICE TYPE MODAL
          priceModalRef.current?.open();
        }
      }}
    >
      <Text
        style={[
          styles.primaryText,
          !allFilled && styles.primaryTextDisabled,
        ]}
      >
        {isEditMode
          ? "Update Proposal"
          : "Preview & Create Proposal"}
      </Text>
    </TouchableOpacity>

  </View>
)}




 <CustomInfoModal
  visible={showModal}
  onClose={() => setShowModal(false)}
/>

<PriceTypeModal
  ref={priceModalRef}
  navigation={navigation}
  // onNext={(type) => {
  //   // type = START | NEGOTIATED | BEST
 
  //   dispatch(setPriceType(PRICE_TYPE_MAP[type])); // ✅ FIX
  //   priceModalRef.current?.close();
  //   navigation.navigate("FinalPricing");
  // }}
/>


   <CreateProposalModal ref={modalRef} navigation={navigation}/>


<DeleteConfirmModal
  visible={showDeleteModal}
  tag={deleteTag}
  onCancel={() => {
    setShowDeleteModal(false);
    setDeleteTag(null);
  }}
  onConfirm={() => {
    dispatch(clearFormResult(deleteTag)); // Redux se delete
    setShowDeleteModal(false);
    setDeleteTag(null);
  }}
/>


<AddNotesModal
  visible={showNotes}
  onClose={() => setShowNotes(false)}
 onSave={() => {
   
  }}
/>


    </View>
  );
}

/* ================= SUB COMPONENT ================= */

function ElevatorCard({ title, qty, tags, resultsByForm,onDeleteTag, prefix, }) {
  const navigation = useNavigation();

  return (
    <View style={styles.elevatorCard}>
      <View style={styles.elevatorHeader}>
        <Text style={styles.elevatorTitle}>{title}</Text>
        <Text style={styles.elevatorQty}>{qty}</Text>
      </View>

      <View style={styles.tagRow}>
        {tags.map((tag) => {
          // 🔥 Correct place: tag yahan available hai
          const isCalculated = !!resultsByForm?.[tag];

          return (
            <View key={tag} style={styles.tagBoxWrapper}>
              <TouchableOpacity
                style={[
                  styles.tagBox,
                  isCalculated && styles.tagBoxCalculated, // ✅ only tag highlight
                ]}
                activeOpacity={0.8}
                // onPress={() =>
                //   navigation.navigate("CreateProposal", {
                //     elevatorLabel: tag, // M1 / T1 / H1
                //     isEdit: isCalculated, // 👈 IMPORTANT (prefill trigger)
                //   })
                // }
                onPress={() => {
  if (prefix === "H") {
    // 🔥 Hydraulic → different screen
    navigation.navigate("H_CreateProposal", {
      elevatorLabel: tag,   // H1, H2
      isEdit: isCalculated,
    });
  } else {
    // 🔥 MRL / Traction → same screen
    navigation.navigate("CreateProposal", {
      elevatorLabel: tag,   // M1 / T1
      isEdit: isCalculated,
    });
  }
}}

              >
                <Text
                  style={[
                    styles.tagText,
                    isCalculated && styles.tagTextCalculated,
                  ]}
                >
                  {tag}
                </Text>
              </TouchableOpacity>

              {/* ✅ Check icon only if calculated */}
              {isCalculated && (
                <View style={styles.tagCheck}>
                  <Feather
                    name="check"
                    size={10}
                    color={Colors.primary}
                  />
                </View>
              )}

              {/* Delete (future use) */}
             <TouchableOpacity
  style={styles.tagDelete}
  onPress={() => onDeleteTag(tag)}
>
  <Feather name="x" size={10} color="#fff" />
</TouchableOpacity>

            </View>
          );
        })}
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
    backgroundColor: "#fff",
  },

  headerTitle: {
    fontSize: fontScale(18),
    fontWeight: "600",
    marginLeft: Spacing.sm,
  },

  /* PROJECT CARD */
  projectCard: {
    backgroundColor: "#fff",
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: verticalScale(16),
  },

projectActions: {
  flexDirection: "row",
  justifyContent: "space-between",   // ⭐ left & right push
  alignItems: "center",
  marginTop: verticalScale(12),
  width: "100%",                     // ⭐ important
},


actionBtn: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: verticalScale(6),
  paddingHorizontal: Spacing.sm,
  borderRadius: Radius.md,
},

actionText: {
  fontSize: fontScale(12),
  color: Colors.primary,
  fontWeight: "bold",
},


  iconWrapper: {
  paddingBottom: 12, 
  paddingLeft:10,                 // ⭐ increases touch area
             // smooth rounded feeling
 // justifyContent: "center",
  //alignItems: "center",
},


    headerLeft: {
      flexDirection: "row",
      alignItems: "flex-start",
      flex: 1,
    },
    
    headerTextBox: {
      marginLeft: 10,
      flexShrink: 1,
    },
    
      codeText: {
        fontSize: fontScale(15),
        fontWeight: "600",
         color:"#858585",
        //marginLeft: 8,
      },
    
      address: {
        marginTop: 5,
        fontWeight: "700",
        fontSize: fontScale(14),
        color:Colors.black,
      },
  
  
      sectionDivider: {
    height: 1,
    backgroundColor: Colors.border || "#EAEAEA",
    marginVertical: verticalScale(12),
  },
  headerRow: {
  flexDirection: "row",
  alignItems: "flex-start",   // ⭐ top aligned
},



iconWrapper: {
  paddingLeft: 10,
  paddingTop: 4,              // ⭐ slight top alignment tweak
},


  /* SECTION */
  sectionTitle: {
    fontSize: fontScale(15),
    fontWeight: "600",
    marginBottom: verticalScale(8),
  },

  /* ELEVATOR CARD */
  elevatorCard: {
    backgroundColor: "#fff",
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: verticalScale(12),
  },
elevatorCardCalculated: {
  backgroundColor: Colors.primaryLight || "#FFF1E8",
  borderColor: Colors.primary,
  borderWidth: 1.5,
},

  elevatorHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(8),
  },

  elevatorTitle: {
    fontSize: fontScale(14),
    fontWeight: "500",
  },

  elevatorQty: {
    fontSize: fontScale(14),
    fontWeight:'800',
    color: Colors.textSecondary,
  },

tagRow: {
  flexDirection: "row",
  flexWrap: "wrap",      // ✅ MULTI-ROW SUPPORT
  gap: Spacing.sm,
},

marginBottom: Spacing.sm, 
tagBox: {
  position: "relative",
  width: moderateScale(50),
  height: moderateScale(50),
  backgroundColor: "#F5F6F8",
  borderRadius: Radius.sm,
  alignItems: "center",
  justifyContent: "center",
},


tagText: {
  fontSize: fontScale(12),
  color: Colors.textPrimary,
},

tagDelete: {
  position: "absolute",
  top: -6,                            
  right: -6,
  width: 16,
  height: 16,
  borderRadius: 8,
  backgroundColor: "#FF4D4F",
  alignItems: "center",
  justifyContent: "center",
},
tagBoxCalculated: {
  backgroundColor: Colors.primaryLight || "#FFF1E8",
  borderWidth: 1,
  borderColor: Colors.primary,
},

tagTextCalculated: {
  color: Colors.primary,
  fontWeight: "700",
},

tagCheck: {
  position: "absolute",
  bottom: -6,
  left: "50%",
  transform: [{ translateX: -6 }],
  backgroundColor: "#fff",
  borderRadius: 8,
  padding: 2,
  elevation: 2,
},



///////////Bottom BAr/////////

bottomBar: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  flexDirection: "row",
  gap: 12,
  padding: Spacing.md,
  backgroundColor: "#fff",
  borderTopWidth: 1,
  borderTopColor: Colors.border,
},

draftBtn: {
  flex: 1,
  height: 48,
  borderRadius: Radius.pill,
  borderWidth: 1.5,
  borderColor: Colors.primary,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fff",
},

draftText: {
  fontSize: fontScale(13),
  fontWeight: "600",
  color: Colors.primary,
},
draftBtnActive: {
  backgroundColor: "rgba(52, 152, 219, 0.08)",
  borderColor: Colors.primary,
},

draftText: {
  fontSize: fontScale(13),
  fontWeight: "600",
  color: Colors.primary,
  textAlign: "center",
},

draftTextActive: {
  color: Colors.primary,
  opacity: 0.7,
},
primaryBtn: {
  flex: 1.6,                 // ⭐ bigger button
  height: 48,
  borderRadius: Radius.pill,
  backgroundColor: Colors.primary,
  alignItems: "center",
  justifyContent: "center",
},

primaryText: {
  fontSize: fontScale(13),
  fontWeight: "600",
  color: "#fff",
  textAlign: "center",
},

primaryBtnDisabled: {
  backgroundColor: "#DADADA",
},

primaryTextDisabled: {
  color: "#888",
},

});

