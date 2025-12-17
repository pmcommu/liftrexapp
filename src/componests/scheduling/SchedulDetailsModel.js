import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  ScrollView,TouchableOpacity,StatusBar
} from "react-native";
import * as IMAGE from "../../assets/svg/index";
import Colors from "../../constants/Colors";
import D, {
  moderateScale,
  scale,
  verticalScale,
  fontScale,
  Spacing,
  Radius,SCREEN_HEIGHT,SCREEN_WIDTH,
} from "../../constants/Dimmence";
import Feather from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import ProgressBar from "../all/ProgressBar";
export default function SchedulDetailsModel({ visible, onClose, data }) {

  const schedulingdetails = useSelector(
  state => state.scheduling.schedulingdetails
);

const mechanics = schedulingdetails?.mechanic ?? [];
console.log(schedulingdetails)
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

const slideUp = {
  transform: [
    {
      translateY: slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0], // center popup effect
      }),
    },
  ],
};

const getInitials = (name = "") => {
  if (!name) return "NA";
  const parts = name.trim().split(" ");
  return (
    parts[0][0]?.toUpperCase() +
    (parts[1]?.[0]?.toUpperCase() || "")
  );
};
const formatDate = (dateString) => {
  if (!dateString) return "-";

  const date = new Date(dateString);

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};


return (
  <Modal transparent visible={visible} animationType="fade">
     <StatusBar
            translucent
            backgroundColor="rgba(0, 0, 0, 0.392)"
            barStyle="light-content"
          />
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay} />
    </TouchableWithoutFeedback>

    <View style={styles.centerWrap}>
      <Animated.View style={[styles.modalBox, slideUp]}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
  <Text style={styles.modalTitle}>Project Details</Text>

  <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
    <Feather name="x" size={27} color="#000" />
  </TouchableOpacity>
</View>


        

          {/* Code + Address */}
        <View style={styles.box}>
<Text style={styles.smallText}>
  Created on: {formatDate(schedulingdetails.createdAt)}
</Text>

  {/* Header Row */}
  <View style={styles.rowTop}>
    <IMAGE.FOLDER width={28} height={28} />
   <View style={styles.codeBox}>
  <Text style={styles.code}>{data.code}</Text>
  <Text
  style={styles.address}
  numberOfLines={2}
  ellipsizeMode="tail"
>
  {data.address} 
</Text>

</View>

  </View>

  {/* Separator */}
  <View style={styles.separator} />

  {/* Client Name */}
 <View style={styles.twoColumnRow}>

  {/* LEFT COLUMN */}
  <View style={styles.column}>
    <View style={styles.row}>
      <IMAGE.USER_CHECK width={20} height={20} />
      <View style={{ marginLeft: 8 }}>
        <Text style={styles.label}>Client Name</Text>
        <Text style={styles.value}>{schedulingdetails.clientName}</Text>
      </View>
    </View>
  </View>

  {/* RIGHT COLUMN */}
  <View style={styles.column}>
    <View style={styles.row}>
      <IMAGE.USER_CHECK width={20} height={20} />
      <View style={{ marginLeft: 8 }}>
        <Text style={styles.label}>No of Elevators</Text>
        <Text style={styles.value}>{schedulingdetails.noOfElevators}</Text>
      </View>
    </View>
  </View>

</View>

</View>


          {/* Client */}
      
          
         

          {/* Status Box */}
          <View style={styles.statusBox}>
            <Text style={styles.statusTitle}>Status</Text>
            <Text style={styles.statusMessage}>our project is set up but hasn't started yet.</Text>

            <Text style={styles.stepText}>
              First Step: Start Scheduling
            </Text>

          <ProgressBar progress={data.progress} />
          </View>

          {/* Tags */}
        <View style={styles.roleCard}>

  {/* LEFT SIDE - SITE MANAGER */}
  <View style={styles.roleItem}>
    <Text style={styles.roleLabel}>Site Manager</Text>

    {schedulingdetails?.siteManager?.length > 0 ? (
      <View
        style={[
          styles.badge,
          { backgroundColor: schedulingdetails.siteManager[0].profileColor || "#4CAF50" }
        ]}
      >
        <Text style={styles.badgeText}>
          {getInitials(schedulingdetails.siteManager[0].name)}
        </Text>
      </View>
    ) : (
      <View style={[styles.badge, { backgroundColor: "#9CA3AF" }]}>
        <Text style={styles.badgeText}>NA</Text>
      </View>
    )}
  </View>

  {/* DIVIDER */}
  <View style={styles.divider} />

  {/* RIGHT SIDE - MECHANIC */}
  <View style={styles.roleItem}>
    <Text style={styles.roleLabel}>Mechanic</Text>

    {schedulingdetails?.mechanic?.length > 0 ? (
      <View
        style={[
          styles.badge,
          { backgroundColor: schedulingdetails.mechanic[0].profileColor || "#C217E8" }
        ]}
      >
        <Text style={styles.badgeText}>
          {getInitials(schedulingdetails.mechanic[0].name)}
        </Text>
      </View>
    ) : (
      <View style={[styles.badge, { backgroundColor: "#9CA3AF" }]}>
        <Text style={styles.badgeText}>NA</Text>
      </View>
    )}
  </View>

</View>


        </ScrollView>
      </Animated.View>
    </View>
  </Modal>
);

}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  centerWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(18),
  },

  modalBox: {
    width: "99%",
    backgroundColor: "#fff",
    padding: moderateScale(Spacing.lg),
    borderRadius: moderateScale(20),
    maxHeight: "82%",

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: moderateScale(10),
    elevation: 10,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(10),
  },

  closeBtn: {
    padding: moderateScale(6),
  },

  modalTitle: {
    fontSize: fontScale(18),
    fontWeight: "700",
    marginBottom: verticalScale(6),
    color: "#000",
  },

  smallText: {
    fontSize: fontScale(12),
    marginBottom: verticalScale(Spacing.md),
    color: "#444",
  },

  box: {
    borderWidth: moderateScale(1),
    borderColor: Colors.border,
    padding: moderateScale(Spacing.md),
    borderRadius: Radius.lg,
    marginBottom: verticalScale(12),
    backgroundColor: "#fff",
  },

  rowTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: verticalScale(12),
  },

  separator: {
    height: verticalScale(1),
    backgroundColor: Colors.border,
    marginVertical: verticalScale(10),
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(6),
  },
codeBox: {
  marginLeft: scale(10),
  flexDirection: "column",
  justifyContent: "flex-start",   // 🔥 important
},

  code: {
    fontSize: fontScale(15),
    fontWeight: "700",
    color: "#696969",
  },
address: {
  fontSize: fontScale(15),
  fontWeight: "600",
  color: "#0f0f0f",
  marginTop: verticalScale(6),
  flexShrink: 1,     // ⭐ WRAP ONLY WHEN NEEDED
  width: "70%",
},


twoColumnRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  //width: "100%",
  marginTop: verticalScale(10),
  gap: scale(12), // column gap added
},


  column: {
    flex: 1,
  },

  label: {
    fontSize: fontScale(12),
    color: "#777",
  },

  value: {
    fontSize: fontScale(14),
    fontWeight: "600",
    color: "#222",
    marginTop: verticalScale(1),
  },

  /** STATUS BOX **/
  statusBox: {
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
  },

  statusMessage: {
    marginTop: verticalScale(5),
    color: "#000",
  },

  stepText: {
    marginTop: verticalScale(10),
    fontWeight: "600",
    color: "#565656",
    marginBottom:10,
  },

  timelineBar: {
    height: verticalScale(6),
    backgroundColor: "#eaeaea",
    marginTop: verticalScale(12),
    borderRadius: moderateScale(10),
  },

  /** ROLE CARD **/
  roleCard: {
  flexDirection: "row",
  alignItems: "center",
  borderWidth: moderateScale(1),
  borderColor: Colors.border,
  paddingVertical: verticalScale(12),
  paddingHorizontal: scale(16),
borderRadius: Radius.lg,
  marginTop: verticalScale(10),
},

roleItem: {
  flex: 1,                     // 🔥 both items equal width
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between", // 🔥 text left, badge right
  paddingRight: scale(5),
},

roleLabel: {
  fontSize: fontScale(14),
  fontWeight: "600",
  color: "#333",
},

divider: {
  width: moderateScale(1),
  height: "100%",              // 🔥 divider poori height me
  backgroundColor: Colors.border,
  marginHorizontal: scale(12),
},

badge: {
  marginLeft:4,
  width: moderateScale(32),
  height: moderateScale(32),
  borderRadius: moderateScale(16),
  justifyContent: "center",
  alignItems: "center",
},

badgeText: {
  color: "#fff",
  fontWeight: "700",
  fontSize: fontScale(13),
},

});
