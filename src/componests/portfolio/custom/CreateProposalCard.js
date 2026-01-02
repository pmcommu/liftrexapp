import React,{useRef} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import CustomHeader from "../../all/CustomHeader";
import Colors from "../../../constants/Colors";
import D, {
  moderateScale,
  scale,
  verticalScale,
  fontScale,
  Spacing,
  Radius,SCREEN_HEIGHT,SCREEN_WIDTH
} from "../../../constants/Dimmence";
import * as IMAGE from "../../../assets/svg/index"
import ProgressBar from "../../all/ProgressBar";
import CreateProposalModal from "./CreateProposalModal"
import { useSelector } from "react-redux";
export default function CreateProposalCard({
  onCreateProposal,navigation,openNotes   // ⭐ clear meaning
}) {



 const inquiry = useSelector(
    (state) => state.selectedInquiry.inquiry
  );
const status = inquiry?.status;

const isNewInquiry = status === "NEW_INQUIRY";
const isRejected = status === "REJECTED";
const isGenerated = status === "GENERATED";

const hasDraft = !!inquiry?.draftId;



const emails = inquiry?.email || [];
const primaryEmail = emails[0] || "-";
const extraCount = emails.length > 1 ? emails.length - 1 : 0;


const proposalButtonText = hasDraft
  ? "Draft Proposal"
  : isNewInquiry
  ? "Create Proposal"
  : "View Proposal";




  return (
    <View style={styles.container}>
   
     
        {/* MAIN CARD */}
        <View style={styles.card}>
        <Text style={styles.createdText}>
  Created on:{" "}
  {inquiry?.createdAt
    ? new Date(inquiry.createdAt).toDateString()
    : "-"}
</Text>

          {/* Inquiry */}
           
            <View style={styles.headerLeft}>

                  <IMAGE.FOLDER width={28} height={28} />
                  <View style={styles.headerTextBox}>
                <Text style={styles.codeText}>
  {inquiry?.projectId || "-"}
</Text>

<Text style={styles.address}>
  {inquiry?.projectName || "-"}
</Text>

                  </View>
                </View>
<View style={styles.sectionDivider} />

          {/* Client Info */}
    <View style={styles.infoRow}>
  <View style={styles.infoBox}>
    <IMAGE.USER_CHECK width={32} height={32} />

    <View style={styles.infoTextBox}>
      <Text style={styles.infoLabel}>Client Name</Text>
      <Text
        style={styles.infoValue}
        numberOfLines={2}          // 👈 max 2 lines
        ellipsizeMode="tail"      // 👈 ...
      >
        {inquiry?.client?.clientName || "-"}
      </Text>
    </View>
  </View>

  <View style={styles.infoBox}>
    <IMAGE.FLEX width={32} height={32} />

    <View style={styles.infoTextBox}>
      <Text style={styles.infoLabel}>Company Rep</Text>
      <Text
        style={styles.infoValue}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {inquiry?.client?.companyRepresentative || "-"}
      </Text>
    </View>
  </View>
</View>


          {/* Elevator Counts */}
       <View style={styles.elevatorRow}>
  {[
  {
    label: "MRL Elevators",
    value: inquiry?.noOfMRL ?? 0,
  },
  {
    label: "Traction Elevators",
    value: inquiry?.noOfTraction ?? 0,
  },
  {
    label: "Hydraulic Elevators",
    value: inquiry?.noOfHydrolic ?? 0,
  },
].map((item, index) => {
  const words = item.label.split(" ");
  const firstLine = words[0];
  const secondLine = words.slice(1).join(" ");

  return (
    <View key={index} style={styles.elevatorBox}>
      <Text style={styles.elevatorTitle}>{firstLine}</Text>
      <Text style={styles.elevatorSub}>{secondLine}</Text>
      <Text style={styles.elevatorValue}>
        {String(item.value).padStart(2, "0")}
      </Text>
    </View>
  );
})}

</View>



          {/* Contact */}
         <View style={styles.contactRow}>
  {/* Email */}
<View style={styles.contactBox}>
  <View style={styles.contactIconBox}>
    <Feather name="mail" size={22} color={Colors.textMedium} />
  </View>

  <View style={styles.contactTextBox}>
    <Text style={styles.contactLabel}>Email</Text>

    <View style={styles.emailRow}>
      <Text
        style={styles.contactValue}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {primaryEmail}
      </Text>

      {extraCount > 0 && (
        <View style={styles.emailBadge}>
          <Text style={styles.emailBadgeText}>
            +{extraCount}
          </Text>
        </View>
      )}
    </View>
  </View>
</View>


  {/* Phone */}
  <View style={styles.contactBox}>
    <View style={styles.contactIconBox}>
      <Feather name="phone" size={22} color={Colors.textMedium} />
    </View>

    <View style={styles.contactTextBox}>
      <Text style={styles.contactLabel}>Phone</Text>
      <Text style={styles.contactValue}>
  {inquiry?.phoneNumber || "-"}
</Text>

    </View>
  </View>
</View>

        </View>

        {/* STATUS CARD */}
     <View style={styles.card}>

  {/* Header */}
  <Text style={styles.statusTitle}>Status</Text>

  {/* Description */}
<Text style={styles.statusStepValue}>
  {inquiry?.status === "NEW_INQUIRY"
    ? "First Step: Create Proposal"
    : "Next Step: Review Proposal"}
</Text>


  {/* Progress */}
  <View style={styles.progressWrapper}>
     <Text style={styles.timelineText}>Created New Inquiry</Text>
    <ProgressBar progress={0.0} />
   
  </View>

  {/* CTA */}
{/* CTA SECTION */}
{!isRejected && (
  <TouchableOpacity
    style={styles.primaryBtn}
    activeOpacity={0.8}
  //  onPress={onCreateProposal}
  onPress={ () => navigation.navigate("FinalPricing")}
  >
    <Feather
      name="file-text"
      size={moderateScale(18)}
      color={Colors.white}
    />
   <Text style={styles.primaryText}>
  {proposalButtonText}
</Text>

  </TouchableOpacity>
)}

{/* 🔴 REJECTED STATE */}
{isRejected && (
  <View style={styles.rejectedBox}>
    <Feather name="x-circle" size={22} color="#D32F2F" />
    <Text style={styles.rejectedText}>
      Proposal was rejected.
    </Text>

    {/* Optional retry */}
   
  </View>
)}



</View>


        {/* ADD NOTES */}
    <View style={styles.secondaryBtnWrapper}>
  <TouchableOpacity
    style={styles.secondaryBtn}
    activeOpacity={0.7}
    onPress={openNotes }
  >
    <Feather
      name="edit-3"
      size={moderateScale(16)}
      color={Colors.statusColor || "#6C63FF"}
    />
    <Text style={styles.secondaryText}>Add Notes</Text>
  </TouchableOpacity>
</View>






      {/* <CreateProposalModal ref={modalRef} navigation={navigation}/> */}
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
  alignItems: "center",
  width: "48%",
  gap: Spacing.sm,
},


infoTextBox: {
  flex: 1,              // 🔥 THIS FIXES OVERFLOW
  minWidth: 0,          // 🔥 Android ke liye important
},

  infoLabel: {
    fontSize: fontScale(12),
    color: Colors.textMedium || "#777",
  },
infoValue: {
  fontSize: fontScale(14),
  fontWeight: "500",
  color: Colors.textPrimary,
  flexShrink: 1,        // 🔥 allow shrink
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
emailRow: {
  flexDirection: "row",
  alignItems: "center",
  maxWidth: moderateScale(140), // 👈 prevents overflow
},

emailBadge: {
  marginLeft: Spacing.xs,
  backgroundColor: Colors.primary || "#FF6A00",
  borderRadius: 10,
  paddingHorizontal: 6,
  paddingVertical: 2,
},

emailBadgeText: {
  color: "#fff",
  fontSize: fontScale(11),
  fontWeight: "700",
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
primaryBtn: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: Spacing.sm,               // icon–text spacing
  backgroundColor: Colors.primary || "#FF6A00",
  paddingVertical: verticalScale(14),
  borderRadius: Radius.pill,
},

primaryText: {
  color: Colors.white,
  fontSize: fontScale(15),
  fontWeight: "600",
},



secondaryBtnWrapper: {
  alignItems: "center",          // layout control only
  marginBottom: verticalScale(30),
   borderWidth: 1,
  borderColor: Colors.border,
  borderRadius: Radius.lg,
  paddingVertical: verticalScale(12),
  paddingHorizontal: Spacing.lg,
},

secondaryBtn: {
  flexDirection: "row",
  alignItems: "center",
  gap: Spacing.sm,
  
  paddingVertical: verticalScale(5),
  paddingHorizontal: Spacing.md,
   borderRadius: Radius.pill,
  backgroundColor: Colors.statusColorlight,
},

secondaryText: {
  fontSize: fontScale(14),
  fontWeight: "600",
  color: Colors.statusColor || "#6C63FF",
},


////////////// rejectedBox: {
rejectedBox: {
  marginTop: 16,
  padding: 14,
  borderRadius: 10,
  backgroundColor: "#FDECEA",
  alignItems: "center",
},

rejectedText: {
  marginTop: 6,
  fontSize: fontScale(15),
  color: "#D32F2F",
  fontWeight: "600",
},

retryBtn: {
  marginTop: 10,
  paddingVertical: 8,
  paddingHorizontal: 18,
  borderRadius: 20,
  backgroundColor: "#D32F2F",
},

retryText: {
  color: "#fff",
  fontWeight: "700",
  fontSize: 13,
},


});

