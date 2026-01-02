import React,{useMemo,useCallback,useRef,useEffect} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,Animated
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
import { useDispatch } from "react-redux";
import { setSelectedInquiry ,openCreateProposalModal} from "../../redux/Slices/selectedInquirySlice";
import * as IMAGE from "../../assets/svg/index"
import AnimatedSpinner from "../all/AnimatedSpinner";

const InquiryCard = React.memo(({ item, navigation }) => {
const isRejected = item.status === "REJECTED";

    const dispatch = useDispatch();
   
     const handleViewDetails = () => {
       dispatch(setSelectedInquiry(item)); // 🔥 FULL OBJECT STORE
       navigation.navigate("ProjectDashboard");
     };
   
   
const handleCreateOrDraft = () => {
  // Store inquiry
  dispatch(setSelectedInquiry(item));

  // 🔵 PRIORITY 1: Proposal already generated / sent / signed
  if (
    item?.status === "GENERATED" ||
    item?.status === "SEND" ||
    item?.status === "SIGNED" ||
    item?.paymentTermsCreated === true ||
    item?.is_proposal_send === true ||
    item?.is_proposal_signed === true
  ) {
    navigation.navigate("ProjectDashboard");
    return;
  }

  // 🟠 PRIORITY 2: Draft exists but proposal NOT generated yet
  if (item?.draftId) {
    navigation.navigate("ProjectDetails");
    return;
  }

  // 🟢 PRIORITY 3: Fresh inquiry
  dispatch(openCreateProposalModal());
  navigation.navigate("ProjectDashboard");
};

const getButtonLabel = (item) => {
  if (item.status === "SIGNED") return "View Signed";
  if (item.status === "SEND") return "Signed Proposal";
  if (item.status === "GENERATED") return "Send Proposal";

  // NEW_INQUIRY cases
  if (item.status === "NEW_INQUIRY" && item.draftId) {
    return "Open Draft";
  }

  return "Create Proposal";
};
const getButtonIcon = (item) => {
  switch (item.status) {
    case "GENERATED":
      return "send";          // Send Proposal
    case "SEND":
      return "upload";        // Signed Proposal
    case "SIGNED":
      return "check-circle";  // View Signed
    case "NEW_INQUIRY":
      if (item.draftId) return "file-text"; // Open Draft
      return "file-plus";   // Create Proposal
    default:
      return "file-plus";
  }
};

     return (
       <View style={styles.card}>
         {/* Project ID */}
         <Text style={styles.cardId}>{item.projectId}</Text>
   
         {/* Address / Project Name */}
         <Text style={styles.cardAddress}>
           {item.projectName}
         </Text>
   <View style={styles.dashedDivider} />
         {/* INFO ROW */}
         <View style={styles.peopleRow}>
           {/* Elevators */}
           <View style={styles.personBox}>
             <IMAGE.FLEX width={40} height={30} />
             <View style={styles.personDetails}>
               <Text style={styles.personLabel}>No. of Elevators</Text>
               <Text style={styles.mechanic}>
                 {item.noOfElevatorsNum}
               </Text>
             </View>
           </View>
   
           {/* Client */}
           <View style={styles.personBox}>
             <IMAGE.USER_CHECK width={32} height={32} />
             <View style={styles.personDetails}>
               <Text style={styles.personLabel}>Client</Text>
               <Text style={styles.site}>
                 {item.client?.clientName || "-"}
               </Text>
             </View>
           </View>
         </View>
   
         {/* ACTION BUTTONS */}
       <View style={styles.btnRow}>
  {/* View Details – always visible */}
  <TouchableOpacity
    style={styles.greyBtn}
    onPress={handleViewDetails}
  >
    <Text style={styles.greyBtnText}>View Details</Text>
  </TouchableOpacity>

  {/* Right side */}
  {isRejected ? (
    <View style={styles.rejectedBadge}>
      <Text style={styles.rejectedText}>Rejected</Text>
    </View>
  ) : (
<TouchableOpacity
  style={styles.orangeBtn}
  onPress={handleCreateOrDraft}
  activeOpacity={0.8}
>
  <Feather
    name={getButtonIcon(item)}
    size={16}
    color="#FFF"
    style={{ marginRight: 6 }}
  />

  <Text style={styles.orangeBtnText}>
    {getButtonLabel(item)}
  </Text>
</TouchableOpacity>


  )}
</View>

   
         {/* CREATED DATE */}
         <View style={styles.createtime}>
           <Text style={styles.dateText}>
             Created on:{" "}
             {new Date(item.createdAt).toDateString()}
           </Text>
         </View>
       </View>
  );
});

/* ================= MAIN ================= */


const SkeletonCard = () => {
  
  const shimmerAnim = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = shimmerAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-300, 300],
  });

  return (
    <View style={[styles.card, { overflow: "hidden", backgroundColor: "#eee" }]}>
      
      {/* STATIC SKELETON BLOCKS */}
      <View style={styles.skeletonLineSmall} />
      <View style={styles.skeletonLineLarge} />
      <View style={styles.skeletonLineMedium} />
      <View style={styles.skeletonLineMedium} />

      <View style={styles.skeletonBtnRow}>
        <View style={styles.skeletonBtn} />
        <View style={[styles.skeletonBtn, { marginLeft: 10 }]} />
      </View>

      {/* 🔥 SLIDING HIGHLIGHT */}
      <Animated.View
        style={[
          styles.shimmerOverlay,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
};




export default function All({
  navigation,
  data = [],
  loading,
  hasMore, search,
  onLoadMore,
})
 {


   
const onEndReachedCalledDuringMomentum = useRef(false);



  const renderItem = useCallback(
    ({ item }) => (
      <InquiryCard item={item} navigation={navigation} />
    ),
    [navigation]
  );

const SkeletonList = () => (
  <>
    {[1, 2, 3, 4, 5].map((i) => (
      <SkeletonCard key={i} />
    ))}
  </>
);


  if (loading && data.length === 0) {
  return (
    <View style={styles.container}>
      <SkeletonList />
    </View>
  );
}
if (!loading && data.length === 0 && search) {
  return (
    <View style={styles.emptyState}>
      <Feather name="search" size={42} color="#ccc" />
      <Text style={styles.emptyTitle}>No results found</Text>
      <Text style={styles.emptySubtitle}>
        Try searching with a different project or client name
      </Text>
    </View>
  );
}


const handleEndReached = () => {
  if (
    !onEndReachedCalledDuringMomentum.current &&
    hasMore &&
    !loading
  ) {
    console.log("🔥 PAGINATION CALL");
    onEndReachedCalledDuringMomentum.current = true;
    onLoadMore && onLoadMore();
  }
};


  return (
    <View style={styles.container}>
<FlatList

  data={data}
  keyExtractor={(item) => item._id}
  renderItem={renderItem}

  onMomentumScrollBegin={() => {
    onEndReachedCalledDuringMomentum.current = false;
  }}

  onEndReached={handleEndReached}
  //onEndReachedThreshold={0.35}
contentContainerStyle={{ paddingBottom: 90 }}
ListFooterComponent={
  loading && data.length > 0 ? (
    <View style={styles.footerLoader}>
      <AnimatedSpinner size={26} />
      <Text style={styles.footerText}>Loading more...</Text>
    </View>
  ) : !hasMore ? (
    <Text style={styles.noMoreText}>
      No more results
    </Text>
  ) : null
}


/>


      {/* Bottom actions */}
      {/* <View style={styles.bottomActions}>
        <View style={styles.actionWrapper}>
          <TouchableOpacity style={styles.actionBtn}>
            <Feather name="sliders" size={18} color="#333" />
            <Text style={styles.actionText}>Sort by</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.actionBtn}>
            <Feather name="filter" size={18} color="#333" />
            <Text style={styles.actionText}>Filter by</Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: Colors.white,
     
    },
  

    /* CARD */
    card: {
      backgroundColor: Colors.white,
      marginTop: verticalScale(5),
      padding: moderateScale(15),
      borderRadius: Radius.md,
       borderWidth:1,
       borderColor:Colors.border,
     marginHorizontal: moderateScale(10),
     
    },
  
    cardId: {
      fontSize: fontScale(12),
      fontWeight: "700",
      color: "#999",
    },
  
    cardAddress: {
      fontSize: fontScale(15),
      fontWeight: "700",
      color: Colors.black,
      marginTop: verticalScale(5),
    },
  
  dashedDivider: {
    borderWidth: 0.6,
    borderColor: "#E0E0E0",
    marginTop: verticalScale(8),
  },
 
  
    btnRow: {
      flexDirection: "row",
      marginTop: verticalScale(15),
    },
  
    greyBtn: {
      flex: 1,
      borderWidth: 1,
      borderColor: Colors.border,
      borderRadius: Radius.pill,
      paddingVertical: verticalScale(8),
      alignItems: "center",
    },
  
    greyBtnText: {
      color: Colors.black,
      fontSize: fontScale(13),
    },
  
    orangeBtn: {
      flex: 1,
      flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
      marginLeft: moderateScale(10),
      backgroundColor: Colors.primary,
      borderRadius: Radius.pill,
      paddingVertical: verticalScale(8),
      alignItems: "center",
    },
  
    orangeBtnText: {
      color: Colors.white,
      fontSize: fontScale(13),
      fontWeight: "700",
    },
  createtime:{
    marginVertical:10,
     alignItems:'center',
  
  },

  


  
  
  peopleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
   
    marginTop: 12,
  },
  
  personBox: {
       justifyContent: "center",    
    flexDirection: "row",      // 👈 Icon + right side text
    alignItems: "center",
    width: "48%",
  },
  
  personDetails: {
    marginLeft: 10,            // 👈 space between icon & text
    justifyContent: "center",
  },
  
  personLabel: {
    fontSize: 12,
    color: "#444",
    marginBottom: 3,
  },
  

  rejectedBadge: {
  flex: 1,
  marginLeft: 10,
  borderRadius: 20,
  paddingVertical: 8,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#FDECEA",
  borderWidth: 1,
  borderColor: "#F44336",
},

rejectedText: {
  color: "#F44336",
  fontSize: 13,
  fontWeight: "700",
},



////////////////////
skeletonLineSmall: {
  height: 10,
  width: "35%",
  backgroundColor: "#ddd",
  borderRadius: 4,
  marginBottom: 10,
},

skeletonLineLarge: {
  height: 18,
  width: "75%",
  backgroundColor: "#ddd",
  borderRadius: 6,
  marginBottom: 12,
},

skeletonLineMedium: {
  height: 14,
  width: "60%",
  backgroundColor: "#ddd",
  borderRadius: 6,
  marginBottom: 10,
},

skeletonBtnRow: {
  flexDirection: "row",
  marginTop: 10,
},

skeletonBtn: {
  flex: 1,
  height: 36,
  backgroundColor: "#ddd",
  borderRadius: 20,
},

/* 🔥 SHIMMER OVERLAY */
shimmerOverlay: {
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  width: "40%",
  backgroundColor: "rgba(255, 255, 255, 0.278)",
},

footerLoader: {
  paddingVertical: 24,
  alignItems: "center",
  justifyContent: "center",
},

footerText: {
  marginTop: 8,
  fontSize: fontScale(12),
  color: "#999",
},

noMoreText: {
  textAlign: "center",
  paddingVertical: 20,
  color: "#aaa",
  fontSize: fontScale(12),
},


emptyState: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: 20,
},

emptyTitle: {
  marginTop: 12,
  fontSize: fontScale(16),
  fontWeight: "600",
  color: "#333",
},

emptySubtitle: {
  marginTop: 6,
  fontSize: fontScale(13),
  color: "#888",
  textAlign: "center",
},


});