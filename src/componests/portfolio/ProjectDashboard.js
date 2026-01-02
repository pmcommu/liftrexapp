import React,{useRef,useState,useEffect,useCallback} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import CustomHeader from "../all/CustomHeader";
import Colors from "../../constants/Colors";
import D, {
  moderateScale,
  scale,
  verticalScale,
  fontScale,
  Spacing,
  Radius,SCREEN_HEIGHT,SCREEN_WIDTH
} from "../../constants/Dimmence";
import * as IMAGE from "../../assets/svg/index"
import ProgressBar from "../all/ProgressBar";
import { RectButton } from "react-native-gesture-handler";
import CreateProposalModal from "../portfolio/custom/CreateProposalModal"
import ProposalPricingList from '../portfolio/custom/ProposalPricingList'
import CreateProposalCard from "../portfolio/custom/CreateProposalCard";
import AddNotesModal from "../../componests/portfolio/custom/AddNotesModal"
import FinalPricingModal from "../../componests/portfolio/custom/FinalPricingModal";
import CreatePaymentTermsModal from "../../componests/portfolio/custom/CreatePaymentTermsModal"
import ProjectDetailsModal from "../../componests/portfolio/custom/ProjectDetailsModal"
import UpdatePriceTypeModal from "../../componests/portfolio/custom/UpdatePriceTypeModel";
import { useSelector,useDispatch } from "react-redux";
import {
  setProjectLoading,
  setProjectDetails,
  setProjectError,
} from "../../redux/Slices/projectDetailsSlice";
import api from "../../config/api";
import ExportOptionsModal from '../portfolio/custom/ExportOptionsModal'
import { resetCreateProposalModal} from "../../redux/Slices/selectedInquirySlice";
import { hydrateDraftResults,clearFormResult ,clearAllResults} from "../../redux/Slices/calculateCostSlice";
import SendProposalConfirmModal from '../portfolio/custom/SendProposalConfirmModal';
import ConfirmEmailModal from '../portfolio/custom/ConfirmEmailModal'
import DeleteProjectModal from '../portfolio/custom/DeleteProjectModal'
import { useFocusEffect } from "@react-navigation/native";
import FullScreenLoader  from "../all/FullScreenLoader"
import EmailActivityModal from "../../componests/portfolio/custom/EmailActivityModal"
import { fetchEmailThread } from "../../redux/Slices/emailActivitySlice";
import ReplyComposeModal from "./custom/ReplyComposeModal";
export default function ProjectDashboard({ navigation,route }) {

   const fromFinalPricing = route?.params?.fromFinalPricing;
  //////////////// REDUX //////////////////////
const dispatch = useDispatch();

const [ projectstatus, setProjectStatus] =useState(null)
 const token = useSelector(state => state.auth.token);


 const inquiry = useSelector(
    (state) => state.selectedInquiry.inquiry
  );


const openCreateProposalModal = useSelector(
  state => state.selectedInquiry.openCreateProposalModal
);

   const { project, loading, error } = useSelector(
        (state) => state.projectDetails
      );


// const status = projectstatus ||
//   inquiry?.status;

const status = React.useMemo(() => {
  return project?.proposalDetails?.status ?? inquiry?.status;
}, [project, inquiry]);



// const canShowSendProposal =
//   status === "GENERATED" && isPaymentTermCreated === true;


///// ///////////// BUTTON CONDITIONS //////////////////////////

  const isPaymentTermCreated = !!project?.proposalDetails?.paymentTermsCreated;

  const rawNotes = project?.proposalDetails?.notes;

const notes = Array.isArray(rawNotes)
  ? rawNotes.filter(n => n && n.trim() !== "")
  : [];


  const projectId = inquiry?.costHistoryId ;

const canShowSendProposal =
  status === "GENERATED" &&
  isPaymentTermCreated === true &&
  project?.proposalDetails?.is_proposal_send !== true;

const isSignedJob =
  status === "SEND" ||
  project?.proposalDetails?.is_proposal_signed === true;

const canShowEmailActivity =
  status === "SEND" || isSignedJob;


  
/////////////////////REFS //////////////////////

const pricingRef = useRef(null);
  const modalRef = useRef(null);
const paymentRef = useRef(null);
const [pricingData, setPricingData] = useState(null);
 const priceModalRef = useRef(null);
const exportRef = useRef(null);
const emailModalRef = useRef(null);
const emailActivityRef = useRef(null);
 const replyRef = useRef(null);

////////////////////STATE //////////////////////

const [showNotes, setShowNotes] = useState(false);
const [showDetails, setShowDetails] = useState(false);
const [showSendConfirm, setShowSendConfirm] = useState(false);
const [showEmailModal, setShowEmailModal] = useState(false);
const [showDelete, setShowDelete] = useState(false);
// const [projectDetails, setProjectDetails] = useState(null);
// const [projectLoading, setProjectLoading] = useState(false);

// console.log(projectDetails)
const [showAllNotes, setShowAllNotes] = useState(false);

const MAX_VISIBLE_NOTES = 2;
const visibleNotes = showAllNotes
  ? notes
  : notes.slice(0, MAX_VISIBLE_NOTES);


///////////////API CALLS //////////////////////
const fetchProjectDetails = async () => {
  if (!projectId) return;
  console.log('projectaaaaaaa',projectId)
  try {
    dispatch(setProjectLoading(true));

    const res = await api.post(
      "/get_single_project_details",
      { project_id: projectId },
      {
        headers: {
          authorization: `bearer ${token}`,
        },
      }
    );

    const data = res?.data?.data || null;
setProjectStatus(data?.proposalDetails?.status)
    dispatch(setProjectDetails(data)); // ✅ STORE IN REDUX
   
    console.log("PROJECT DETAILS:", data);

  } catch (error) {
    dispatch(
      setProjectError(
        error.response?.data || error.message
      )
    );
    console.log(
      "PROJECT DETAILS ERROR:",
      error.response?.data || error.message
    );
  } finally {
    dispatch(setProjectLoading(false));
  }
};



useFocusEffect(
  React.useCallback(() => {
    if (projectId) {
      fetchProjectDetails();
    }
  }, [projectId])
);


// useFocusEffect(
//   React.useCallback(() => {
//     if (!projectId) {
//       console.log("⏳ Waiting for projectId...");
//       return;
//     }

//     fetchProjectDetails(projectId);
//   }, [projectId])
// );

const handleOpenEmailActivity = () => {
    dispatch(
      fetchEmailThread({
        proposalId: project?.proposalDetails?._id,
        threadId: project?.proposalDetails?.adminEmailthreadId,
        type: "proposal",
      })
    );

    emailActivityRef.current?.open();
  };
/////////////// HADLE CREATE PROPOSAL ///////////////

// const handleCreateProposal = () => {
//   modalRef.current?.open();
// };

const handleCreateProposal = () => {
  // 🟡 Draft exist → direct CreateProposal
  if (inquiry?.draftId) {
    navigation.navigate("ProjectDetails", {
      inquiryId: inquiry._id,
      draftId: inquiry.draftId,
      mode: "DRAFT",
    });
    return;
  }

  // 🟢 No draft → open price type modal
  modalRef.current?.open();
};

useEffect(() => {
  if (openCreateProposalModal) {
    modalRef.current?.open();
    dispatch(resetCreateProposalModal());
  }
}, [openCreateProposalModal]);

// const handleUpdateProposal = () => {
//   // 🟡 Draft exist → EDIT
//   //if (inquiry?.draftId) {
//     navigation.navigate("ProjectDetails", {
//       inquiryId: inquiry._id,
//       draftId: inquiry.draftId,
//       mode: "EDIT",
//     });
//     return;
//  // }

//   // 🟢 No draft → Create flow open
//  // modalRef.current?.open();
// };


const parseCostHistoryJson = (jsonString) => {
  try {
    if (!jsonString) return {};
    const parsed = JSON.parse(jsonString);
    return parsed?.input_details || {};
  } catch (e) {
    console.log("Invalid cost_history_json", e);
    return {};
  }
};


const handleUpdateProposal = () => {
  if (!project) return;

  const costHistoryJson =
    project?.projectData?.cost_history_json ||
    project?.proposalDetails?.costHistoryJson;

  const formDataByFormKey =
    parseCostHistoryJson(costHistoryJson);

  dispatch(hydrateDraftResults(formDataByFormKey));

  // ✅ EDIT MODE EXPLICITLY PASS KARO
  navigation.navigate("EditProjectDetails", {
    mode: "EDIT",
  });
};



const handleViewFinalPricing = (elevatorData) => {
  setPricingData(elevatorData);   // ✅ selected elevator
  pricingRef.current?.open();     // ✅ Modalize open
};

////////////// RENDER //////////////////////
const getStatusConfig = (status) => {
  switch (status) {
    case "GENERATED":
      return {
        label: "Priced Jobs",
        color: "#F59E0B", // amber / yellow
        progress: 25,
      };

    case "SEND":
      return {
        label: "Proposal Sent",
        color: "#2563EB", // blue
        progress: 50,
      };

    case "SIGNED":
      return {
        label: "Signed Jobs",
        color: "#16A34A", // green
        progress: 75,
      };

    case "NEW_INQUIRY":
      return {
        label: "New Inquiry",
        color: "#6B7280", // gray
        progress: 0,
      };

    case "REJECTED":
      return {
        label: "Rejected",
        color: "#DC2626", // red
        progress: 0,
      };

    default:
      return {
        label: "Unknown",
        color: "#9CA3AF", // light gray
        progress: 0,
      };
  }
};



const statusConfig = getStatusConfig(inquiry?.status);



  return (
    <View style={styles.container}>
     <CustomHeader
        title="Project Deshboard"
        onBackPress={() => {
          if (fromFinalPricing) {
            navigation.navigate("Portfolio"); // ✅ FinalPricing se aaye
          } else {
            navigation.goBack(); // ✅ Normal flow
          }
        }}
      />
    
    

      <ScrollView contentContainerStyle={{ padding: 16 ,paddingBottom:100,}}>

{/*     STATUS NEW_INQUEry */}

{(status === "NEW_INQUIRY" || status === "REJECTED") && (
  <CreateProposalCard
    onCreateProposal={handleCreateProposal}
    navigation={navigation}
    openNotes={() => setShowNotes(true)}
  />
)}




        {/* ADD NOTES */}
  




{/*     STATUS GENERATED */}
 {(status === "GENERATED" || status === "SEND" || status === "SIGNED") && (
  <>
    <View style={styles.projectCard}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <IMAGE.FOLDER width={28} height={28} />
          <View style={styles.headerTextBox}>
            <Text style={styles.codeText}>
              {inquiry?.projectId}
            </Text>
            <Text style={styles.address}>
              {inquiry?.projectName}
            </Text>
          </View>
        </View>

        <RectButton
          rippleColor="#d1d1d1"
          onPress={() => setShowDetails(true)}
          style={styles.iconWrapper}
        >
          <IMAGE.ARROW width={22} height={25} />
        </RectButton>
      </View>

      <View style={styles.sectionDivider} />

<ProgressBar
  label="Status"
  value={statusConfig.label}
  progress={statusConfig.progress / 100}
color={statusConfig.color}
/>

{canShowSendProposal && (
  <View style={styles.sendbutton}>
    <TouchableOpacity
      style={styles.primaryBtn}
      activeOpacity={0.8}
      onPress={() => setShowSendConfirm(true)}
    >
      <Feather
        name="send"
        size={moderateScale(18)}
        color={Colors.white}
      />
      <Text style={styles.primaryText}>Send Proposal</Text>
    </TouchableOpacity>
  </View>
)}

{isSignedJob && (
  <View style={styles.sendbutton}>
    <TouchableOpacity
      style={styles.primaryBtn}
      activeOpacity={0.8}
      onPress={() => setShowSendConfirm(true)}
    >
      <Feather
        name="upload"
        size={moderateScale(18)}
        color={Colors.white}
      />
      <Text style={styles.primaryText}>Singed Jobs</Text>
    </TouchableOpacity>
  </View>
)}
    </View>


<View style={styles.secondaryBtnWrapper}>

 {notes.length === 0 && (
  <View style={styles.centerOnly}>
    <TouchableOpacity
      style={styles.secondaryBtn}
      activeOpacity={0.7}
      onPress={() => setShowNotes(true)}
    >
      <Feather
        name="edit-3"
        size={moderateScale(16)}
        color={Colors.statusColor || "#6C63FF"}
      />
      <Text style={styles.secondaryText}>
        Add Notes
      </Text>
    </TouchableOpacity>
  </View>
)}
{notes.length > 0 && (
  <>
    {/* HEADER */}
    <View style={styles.notesHeaderRow}>
      <Text style={styles.notesTitle}>Notes</Text>

      <TouchableOpacity
        style={styles.addNotesBtn}
        activeOpacity={0.7}
        onPress={() => setShowNotes(true)}
      >
        <Feather
      name="edit-2"
          size={14}
          color={Colors.statusColor}
        />
        <Text style={styles.addNotesText}>
          Add Notes
        </Text>
      </TouchableOpacity>
    </View>

    {/* NOTES LIST (LIMITED / FULL) */}
<View style={styles.notesContainer}>
  {visibleNotes.map((note, index) => (
    <View key={index} style={styles.noteCard}>
      {note.split("\n").map((line, lineIndex) => (
        <Text key={lineIndex} style={styles.noteText}>
          {lineIndex === 0
            ? `Note ${index + 1}: ${line}`
            : `          ${line}`} {/* indent for next lines */}
        </Text>
      ))}
    </View>
  ))}
</View>

    {/* VIEW ALL / VIEW LESS */}
    {notes.length > MAX_VISIBLE_NOTES && (
      <TouchableOpacity
        style={styles.viewAllBtn}
        activeOpacity={0.7}
        onPress={() => setShowAllNotes(prev => !prev)}
      >
        <Text style={styles.viewAllText}>
          {showAllNotes ? "View Less" : "View All"}
        </Text>
        <Feather
          name={showAllNotes ? "chevron-up" : "chevron-down"}
          size={16}
          color={Colors.primary}
        />
      </TouchableOpacity>
    )}
  </>
)}

</View>



{canShowEmailActivity && (
 <View style={styles.emailActivityRow}>
  <TouchableOpacity
  style={styles.leftSection}
  activeOpacity={0.7}
  
    onPress={handleOpenEmailActivity}
    //emailActivityRef.current?.open(); // 🔥 OPEN MODAL

>
  <Feather
    name="chevron-right"
    size={26}
    color={Colors.textMedium}
  />
  <Text style={styles.leftTitle}>Email Activity</Text>
</TouchableOpacity>

    <TouchableOpacity
      style={styles.newBtn}
      activeOpacity={0.8}
      onPress={() => {
        // new email
      }}
    >
      <Feather name="plus" size={16} color={Colors.primary} />
      <Text style={styles.newText}>New</Text>
    </TouchableOpacity>
  </View>
)}


    <ProposalPricingList
    
 onViewFinalPricing={handleViewFinalPricing}
      onEdit={handleUpdateProposal}
      onDelete={() => setShowDelete(true)}
      onExport={() => {
         exportRef.current?.open();
      }}
      onChangePriceType={() => {
         priceModalRef.current?.open();
      }}
      onViewBreakdown={() => {}}
      onDownloadCSV={() => {}}
      onCreatePaymentTerms={() => {}}
      navigation={navigation}
    />
  </>
)}


      </ScrollView>
{(inquiry?.status === "GENERATED" || inquiry?.status === "SEND") && (
  <View style={styles.bottomBtnWrapper}>
    <TouchableOpacity
      style={styles.primaryBtn}
      activeOpacity={0.8}
      onPress={() => paymentRef.current?.open()}
    >
      <Feather
        name={isPaymentTermCreated ? "edit-3" : "file-text"}
        size={moderateScale(18)}
        color={Colors.white}
      />

      <Text style={styles.primaryText}>
        {isPaymentTermCreated
          ? "Update Payment Term"
          : "Create Payment Term"}
      </Text>
    </TouchableOpacity>
  </View>
)}



<AddNotesModal
  visible={showNotes}
  onClose={() => setShowNotes(false)}
 onSave={() => {
    fetchProjectDetails(); // 🔁 SAME FUNCTION
  }}
/>

      <CreateProposalModal ref={modalRef} navigation={navigation}/>
 <FinalPricingModal ref={pricingRef}  pricingData={pricingData} />
      <CreatePaymentTermsModal ref={paymentRef} />

      <ProjectDetailsModal
  visible={showDetails}
  onClose={() => setShowDetails(false)}
/>

<UpdatePriceTypeModal
  ref={priceModalRef}
  onUpdated={() => {
    fetchProjectDetails(); // 🔁 REFRESH PROJECT
  }}
/>

<DeleteProjectModal
  visible={showDelete}
  onClose={() => setShowDelete(false)}
  projectId={project?.proposalDetails?._id} // 🔥 PASS ID
  navigation={navigation}
  token={token}
/>


<ExportOptionsModal
  ref={exportRef}
  onExportNotes={() => console.log("Export Notes")}
  onExportDocs={() => console.log("Export Docs")}
  onExportPdf={() => console.log("Export PDF")}
/>


<SendProposalConfirmModal
  visible={showSendConfirm}
  onClose={() => setShowSendConfirm(false)}
  onConfirm={() => {
    setShowSendConfirm(false);       // ❌ first modal close
setShowEmailModal(true)
  }}
/>


<ConfirmEmailModal
  visible={showEmailModal}
  onClose={() => setShowEmailModal(false)}
/>

<EmailActivityModal
  ref={emailActivityRef}
  onReply={() => {
    emailActivityRef.current?.close(); // optional
    replyRef.current?.open();
  }}
/>


 <ReplyComposeModal
  ref={replyRef}

  onSent={() => {
    replyRef.current?.close();
  }}
/>



  {loading && <FullScreenLoader />}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background || "#F6F7F9",
  },




  /* ================= CARD ================= */
  card: {
     paddingHorizontal: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    borderWidth:1,
    borderColor:Colors.border,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },

  createdText: {
    fontSize: fontScale(14),
    color: Colors.textMedium || "#777",
    marginBottom: verticalScale(10),
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

  /* ================= INFO ================= */
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: verticalScale(10),
  },

infoBox: {
  flexDirection: "row",
  alignItems: "center",          // ✅ icon + text center
  justifyContent: "center",      // ✅ box ke andar center
  gap: Spacing.sm,
  width: "48%",
},


  infoLabel: {
    fontSize: fontScale(12),
    color: Colors.textMedium || "#777",
  },

  infoValue: {
    fontSize: fontScale(14),
    fontWeight: "500",
    color: Colors.textPrimary || "#111",
  },

  /* ================= ELEVATORS ================= */
  elevatorRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginVertical: verticalScale(12),
},

elevatorBox: {
  width: "31%",
  backgroundColor: Colors.primaryLight,
  borderRadius: Radius.md,
  alignItems: "center",
  paddingVertical: verticalScale(10),

},

elevatorTitle: {
  fontSize: fontScale(12),
  fontWeight: "600",
  color: Colors.textPrimary,
},

elevatorSub: {
  fontSize: fontScale(12),
  color: Colors.textMedium,
  marginTop: verticalScale(2),
  fontWeight: "600",
},

elevatorValue: {
  fontSize: fontScale(18),
  fontWeight: "700",
  color: Colors.textPrimary,
  marginTop: verticalScale(6),
},


  /* ================= CONTACT ================= */
 contactRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: verticalScale(12),
},

contactBox: {
  flexDirection: "row",
       
  width: "48%",
   alignItems: "center",          // ✅ icon + text center
  justifyContent: "center", 
},

contactIconBox: {
  width: moderateScale(36),
  height: moderateScale(36),
  borderRadius: Radius.sm,
 
  alignItems: "center",
  justifyContent: "center",
  marginRight: Spacing.sm,
},

contactTextBox: {
  justifyContent: "center",
},

contactLabel: {
  fontSize: fontScale(14),
  color: Colors.textMedium,
},

contactValue: {
  fontSize: fontScale(13),
  fontWeight: "500",
  color: Colors.textPrimary,
},


 /* ================= STATUS CARD ================= */
statusTitle: {
  fontSize: fontScale(15),
  fontWeight: "600",
  marginBottom: verticalScale(6),
  color: Colors.textPrimary,
},

statusText: {
  fontSize: fontScale(13),
  color: Colors.textMedium,
  lineHeight: verticalScale(18),
},

statusInfoBox: {
  flexDirection:'row',
  borderRadius: Radius.md,

  marginTop: verticalScale(10),
},

statusStepLabel: {
  fontSize: fontScale(11),
  color: Colors.textSecondary,
},

statusStepValue: {
  fontSize: fontScale(13),
  fontWeight: "600",
  color: Colors.textPrimary,
  marginTop: verticalScale(2),
},

statusTimeline: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: verticalScale(10),
},



timelineText: {
  fontSize: fontScale(15),
  color: Colors.textSecondary,
  marginBottom:2,
},

progressWrapper: {
  marginTop: verticalScale(14),
  marginBottom:30,
},

progressText: {
  fontSize: fontScale(11),
  color: Colors.textSecondary,
  marginTop: verticalScale(6),
  textAlign: "right",
},

/* ================= BUTTON ================= */
sendbutton:{
  marginBottom:10,
 marginVertical:20,
},
bottomBtnWrapper: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  paddingHorizontal: 16,
  paddingVertical: 12,
 
  // 🔥 Safe area feel (iOS + Android)
  paddingBottom: 24,
},
primaryBtn: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: Spacing.sm,               // icon–text spacing
  backgroundColor: Colors.primary || "#FF6A00",
  paddingVertical: verticalScale(12),
  borderRadius: Radius.pill,
},

primaryText: {
  color: Colors.white,
  fontSize: fontScale(15),
  fontWeight: "600",
},

///////////////Notes /////////////
secondaryBtnWrapper: {
  width: "100%",
  borderWidth: 1,
  borderColor: Colors.border,
  borderRadius: Radius.lg,
  paddingVertical: verticalScale(12),
  marginBottom: verticalScale(24),
},

centerOnly: {
  width: "100%",
  alignItems: "center",
},

secondaryBtn: {
  flexDirection: "row",
  alignItems: "center",
  gap: Spacing.sm,
  paddingVertical: verticalScale(6),
  paddingHorizontal: Spacing.lg,
  borderRadius: Radius.pill,
  backgroundColor: Colors.statusColorlight,
},

secondaryText: {
  fontSize: fontScale(14),
  fontWeight: "600",
  color: Colors.statusColor || "#6C63FF",
},

notesContainer: {
  marginTop: verticalScale(12),
  paddingHorizontal: Spacing.lg,
},

noteCard: {
 
  borderRadius: Radius.md,
  //paddingVertical: Spacing.sm,
  paddingHorizontal:Spacing.sm,
  marginBottom: verticalScale(1),
  // borderWidth: 1,
  // borderColor: Colors.border,
},
noteText: {
  fontSize: fontScale(13),
  color: Colors.textSecondary,
  lineHeight: 20,
  marginBottom: verticalScale(2),
},

/////////////////////////
notesHeaderRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginHorizontal:15,
  marginBottom: verticalScale(2),
},

notesTitle: {
  fontSize: fontScale(16),
  fontWeight: "800",
  color: Colors.textDark,
},

addNotesBtn: {
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: Radius.pill,
  
},

addNotesText: {
  fontSize: fontScale(14),
  fontWeight: "600",
  color: Colors.statusColor,
  textDecorationLine: "underline",     // 🔥 underline
},

viewAllBtn: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginTop: verticalScale(6),
  gap: 4,
},

viewAllText: {
  fontSize: fontScale(12),
  fontWeight: "600",
  color: Colors.primary,
},


////////////////NEw STyles///////

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



//////////. Email activity

emailActivityRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBottom: verticalScale(15),
  
  
 
},

leftSection: {
  flexDirection: "row",
  alignItems: "center",
  gap: moderateScale(6),
},

leftTitle: {
  fontSize: fontScale(14),
  fontWeight: "800",
  color: Colors.textDark,
},

newBtn: {
  flexDirection: "row",
  alignItems: "center",
  gap: moderateScale(4),
  paddingHorizontal: moderateScale(10),
  paddingVertical: verticalScale(6),
  borderRadius: Radius.pill,
  
},

newText: {
  fontSize: fontScale(14),
  fontWeight: "800",
  color: Colors.primary,
},

});









        {/* MAIN CARD */}
        {/* <View style={styles.card}>
          <Text style={styles.createdText}>Created on: 20 Sep, 2025</Text>

        
           
            <View style={styles.headerLeft}>

                  <IMAGE.FOLDER width={28} height={28} />
                  <View style={styles.headerTextBox}>
                    <Text style={styles.codeText}>NQ25016</Text>
                    <Text style={styles.address}> 22 LORAINE STREET, BROOKLYN NY 11231</Text>
                  </View>
                </View>
<View style={styles.sectionDivider} />

        
          <View style={styles.infoRow}>
            <View style={styles.infoBox}>
               <IMAGE.USER_CHECK width={32} height={32} />
              <View>
                <Text style={styles.infoLabel}>Client Name</Text>
                <Text style={styles.infoValue}>Sky Equity Group</Text>
              </View>
            </View>

            <View style={styles.infoBox}>
             <IMAGE.USER_CHECK width={32} height={32} />
              <View>
                <Text style={styles.infoLabel}>Company Rep</Text>
                <Text style={styles.infoValue}>Nasin Hall</Text>
              </View>
            </View>
          </View>

        
       <View style={styles.elevatorRow}>
  {[
    { label: "MRL Elevators", value: "03" },
    { label: "Traction Elevators", value: "03" },
    { label: "Hydraulic Elevators", value: "03" },
  ].map((item, index) => {
    const words = item.label.split(" ");
    const firstLine = words[0];                 // MRL / Traction / Hydraulic
    const secondLine = words.slice(1).join(" "); // Elevators

    return (
      <View key={index} style={styles.elevatorBox}>
    
        <Text style={styles.elevatorTitle}>
          {firstLine}
        </Text>

       
        <Text style={styles.elevatorSub}>
          {secondLine}
        </Text>

       
        <Text style={styles.elevatorValue}>
          {item.value}
        </Text>
      </View>
    );
  })}
</View>



          
         <View style={styles.contactRow}>
  
  <View style={styles.contactBox}>
    <View style={styles.contactIconBox}>
      <Feather name="mail" size={22} color={Colors.textMedium} />
    </View>

    <View style={styles.contactTextBox}>
      <Text style={styles.contactLabel}>Email</Text>
      <Text style={styles.contactValue}>test@gmail.com</Text>
    </View>
  </View>

  
  <View style={styles.contactBox}>
    <View style={styles.contactIconBox}>
      <Feather name="phone" size={22} color={Colors.textMedium} />
    </View>

    <View style={styles.contactTextBox}>
      <Text style={styles.contactLabel}>Phone</Text>
      <Text style={styles.contactValue}>+1 9715808559</Text>
    </View>
  </View>
</View>

        </View> */}

{/*         
     <View style={styles.card}>


  <Text style={styles.statusTitle}>Status</Text>

  
  <Text style={styles.statusText}>
    Your project is set up but hasn’t started yet.
  </Text>

  
  <View style={styles.statusInfoBox}>
  
    <Text style={styles.statusStepValue}>First Step: Create Proposal</Text>
  </View>


 

 
  <View style={styles.progressWrapper}>
     <Text style={styles.timelineText}>Created New Inquiry</Text>
    <ProgressBar progress={0.4} />
   
  </View>

 
 <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.8} onPress={() => modalRef.current?.open()}>
  <Feather
    name="file-text"          // 📄 proposal icon
    size={moderateScale(18)}
    color={Colors.white}
  />
  <Text style={styles.primaryText}>Create Proposal</Text>
</TouchableOpacity>


</View> */}