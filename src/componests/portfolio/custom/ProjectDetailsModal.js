import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  Pressable,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../../../constants/Colors";
import * as IMAGE from "../../../assets/svg";
import {
  Spacing,
  Radius,
  fontScale,
  verticalScale,
  moderateScale,
} from "../../../constants/Dimmence";
import ProgressBar from "../../all/ProgressBar";
import { useSelector } from "react-redux";

export default function ProjectDetailsModal({
  visible,
  onClose,
}) {

     const { project, loading, error } = useSelector(
          (state) => state.projectDetails
        );

        
        const inquiry = useSelector(
  (state) => state.selectedInquiry.inquiry
);




        const projectData = project?.projectData;
const proposalDetails = project?.proposalDetails;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const elevatorData = [
  { label: "MRL Elevators", value: inquiry.noOfMRL ?? 0 },
  { label: "Traction Elevators", value: inquiry.noOfTraction ?? 0 },
  { label: "Hydraulic Elevators", value: inquiry.noOfHydrolic ?? 0 },
];

  /* 🔹 OPEN animation */
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  /* 🔹 CLOSE with animation */
  const handleClose = () => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose?.();
    });
  };


const STATUS_CONFIG = {
  NEW_INQUIRY: {
    label: "New Inquiry",
    message: "New inquiry received.",
    progress: 0.1, // 10%
  },

  GENERATED: {
    label: "Proposal Generated",
    message: "Proposal has been generated.",
    next:"Next Step: Send Proposal",
    progress: 0.4, // 40%
  },

  SEND: {
    label: "Proposal Sent",
    message: "Proposal has been sent to the client.",
    next:"Next Step: Upload Signed Document",
    progress: 0.7, // 70%
  },

  SIGNED: {
    label: "Proposal Completed",
    message: "Proposal has been signed.",
    progress: 1, // 100%
  },

  REJECTED: {
    label: "Rejected",
    message: "Inquiry was rejected.",
    progress: 0,
  },
};
const statusInfo =
  STATUS_CONFIG[inquiry?.status] || {
    label: "In Progress",
    message: "Project is in progress.",
    progress: 0.25,
  };

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
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
    >
      {/* 🔹 BACKDROP (tap to close) */}
      <Pressable style={styles.overlay} onPress={handleClose}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* prevent close on content tap */}
          <Pressable>
            {/* ================= HEADER ================= */}
            <View style={styles.header}>
              <Text style={styles.title}>Project Details</Text>
              <TouchableOpacity onPress={handleClose}>
                <Feather name="x" size={22} />
              </TouchableOpacity>
            </View>

            {/* ================= CONTENT ================= */}
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.projectCard}>
                {/* HEADER ROW */}
                <View style={styles.headerLeft}>
                  <IMAGE.FOLDER width={28} height={28} />
                  <View style={styles.headerTextBox}>
                 <Text style={styles.codeText}>
  {inquiry.projectId}
</Text>

<Text style={styles.address}>
  {inquiry.projectName}
</Text>


                  </View>
                </View>

                <View style={styles.sectionDivider} />

                {/* ELEVATORS */}
               <View style={styles.elevatorRow}>
  {elevatorData.map((item, index) => {
    const [first, ...rest] = item.label.split(" ");
    return (
      <View key={index} style={styles.elevatorBox}>
        <Text style={styles.elevatorTitle}>{first}</Text>
        <Text style={styles.elevatorSub}>{rest.join(" ")}</Text>
        <Text style={styles.elevatorValue}>{item.value}</Text>
      </View>
    );
  })}
</View>


                {/* CONTACT */}
<View style={styles.contactRow}>
  {/* EMAIL */}
  <View style={styles.emailBox}>
    <View style={styles.contactIconBox}>
      <Feather name="mail" size={20} color={Colors.textMedium} />
    </View>

    <View style={styles.emailTextBox}>
      <Text style={styles.contactLabel}>Email</Text>
      <Text
        style={styles.contactValue}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {inquiry.client?.email?.[0] || "-"}
      </Text>
    </View>
  </View>

  {/* PHONE */}
  <View style={styles.contactBox}>
    <View style={styles.contactIconBox}>
      <Feather name="phone" size={20} color={Colors.textMedium} />
    </View>

    <View style={styles.contactTextBox}>
      <Text style={styles.contactLabel}>Phone</Text>
      <Text style={styles.contactValue}>
        {inquiry.phoneNumber || "-"}
      </Text>
    </View>
  </View>
</View>




                
              </View>
<View style={styles.statusBox}>
  <Text style={styles.statusTitle}>Status</Text>

  {/* Status message */}
  <Text style={styles.statusMessage}>
    {statusInfo.message}
  </Text>

  {/* Current status */}
  <Text style={styles.stepText}>
    Current Status:{" "}
    <Text style={styles.stepHighlight}>
      {statusInfo.label}
    </Text>
  </Text>

  {/* Next step (only if exists) */}
  {statusInfo.next && (
    <View style={styles.nextStepBox}>
      <Feather
        name="arrow-right-circle"
        size={16}
        color={Colors.primary}
      />
      <Text style={styles.nextStepText}>
        {statusInfo.next}
      </Text>
    </View>
  )}

  {/* Progress */}
  <ProgressBar progress={statusConfig.progress / 100}
color={statusConfig.color}/>
</View>


            </ScrollView>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: Radius.lg,
    padding: Spacing.md,
    maxHeight: "80%",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(12),
  },

  title: {
    fontSize: fontScale(18),
    fontWeight: "700",
    color: "#111",
  },

  projectCard: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    padding: Spacing.md,
  },

  headerLeft: {
    flexDirection: "row",
  },

  headerTextBox: {
    marginLeft: 10,
    flexShrink: 1,
  },

  codeText: {
    fontSize: fontScale(14),
    fontWeight: "600",
    color: "#858585",
  },

  address: {
    marginTop: 5,
    fontSize: fontScale(14),
    fontWeight: "700",
    color: Colors.black,
  },

  sectionDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: verticalScale(12),
  },

  elevatorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  },

  elevatorSub: {
    fontSize: fontScale(12),
    marginTop: 2,
    fontWeight: "600",
    color: Colors.textMedium,
  },

  elevatorValue: {
    fontSize: fontScale(18),
    fontWeight: "700",
    marginTop: 6,
  },

  ////////////////// ConENT ROW//////////////
contactRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: verticalScale(12),
},

contactBox: {
  flexDirection: "row",
  width: "48%",
  alignItems: "center",
},

emailBox: {
  flexDirection: "row",
  width: "58%",           // email ko thoda zyada space
  alignItems: "center",
},

contactIconBox: {
  width: moderateScale(36),
  height: moderateScale(36),
  borderRadius: Radius.sm,
  alignItems: "center",
  justifyContent: "center",
  marginRight: Spacing.sm,

  flexShrink: 0,          // 🔥 icon kabhi compress nahi hoga
  flexGrow: 0,
},

contactTextBox: {
  flex: 1,               // 🔥 text ko remaining space
  minWidth: 0,           // 🔥 Android overflow fix
},

emailTextBox: {
  flex: 1,
  minWidth: 0,
},

contactLabel: {
  fontSize: fontScale(12),
  color: Colors.textMedium,
},

contactValue: {
  fontSize: fontScale(13),
  fontWeight: "600",
},


/////////////////// Stattsus boxxx ///////
statusBox: {
  marginTop: 10,
  borderWidth: moderateScale(1),
  borderColor: Colors.border,
  padding: moderateScale(Spacing.md),
  borderRadius: Radius.lg,
  marginBottom: verticalScale(12),
  backgroundColor: "#fff",
},

statusTitle: {
  fontWeight: "700",
  fontSize: fontScale(15),
  color: "#000",
  marginBottom: verticalScale(4),
},

statusMessage: {
  marginTop: verticalScale(4),
  fontSize: fontScale(13),
  color: "#333",
  lineHeight: 18,
},

stepText: {
  marginTop: verticalScale(10),
  fontWeight: "600",
  fontSize: fontScale(13),
  color: "#565656",
},

stepHighlight: {
  color: Colors.primary,
  fontWeight: "700",
},

nextStepBox: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: verticalScale(6),
  marginBottom: verticalScale(10),
  gap: moderateScale(6),
},

nextStepText: {
  fontSize: fontScale(13),
  color: Colors.primary,
  fontWeight: "600",
},

  
    timelineBar: {
      height: verticalScale(6),
      backgroundColor: "#eaeaea",
      marginTop: verticalScale(12),
      borderRadius: moderateScale(10),
    },
});
