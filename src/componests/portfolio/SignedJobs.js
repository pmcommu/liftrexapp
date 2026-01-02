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

export default function SingedJobs({
  navigation,
  data = [],
  loading,        // 👈 initial loading
  loadingMore,    // 👈 pagination loading
  onLoadMore,
  search,
  hasMore
}) {





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

  return (
    <View style={styles.container}>
      {/* Search + Create New */}
      {/* <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Feather name="search" size={moderateScale(18)} color="#999" />
          <TextInput
            placeholder="Search..."
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity style={styles.createBtn}>
          <Text style={styles.createBtnText}>+ Create New</Text>
        </TouchableOpacity>
      </View> */}

      {/* Inquiry List */}
      
<FlatList
  data={data}
  keyExtractor={(item) => item._id}
  renderItem={({ item }) => (
    <InquiryCard item={item} navigation={navigation} />
  )}
  contentContainerStyle={{ paddingBottom: 140 }}
  onEndReached={onLoadMore}
  onEndReachedThreshold={0.6}
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

    </View>
  );
}



function InquiryCard({ item, navigation }) {

    const dispatch = useDispatch();
     
       const handleViewDetails = () => {
         dispatch(setSelectedInquiry(item)); // 🔥 FULL OBJECT STORE
         navigation.navigate("ProjectDashboard");
       };
     

  return (
    <View style={styles.card}>
      {/* Project ID */}
      <Text style={styles.cardId}>{item.projectId}</Text>

      {/* Address / Location */}
      <Text style={styles.cardAddress}>
        {item.projectName}
      </Text>
   <View style={styles.dashedDivider} />
      {/* Elevators */}
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

      {/* Buttons */}
      <View style={styles.btnRow}>
        <TouchableOpacity
          style={styles.greyBtn}
          onPress={handleViewDetails
          }
        >
          <Text style={styles.greyBtnText}>View Details</Text>
        </TouchableOpacity>

        {/* {!item.paymentTermsCreated && (
          <TouchableOpacity
            style={styles.orangeBtn}
            onPress={() =>
              navigation.navigate("CreateProposal", {
                inquiryId: item._id,
              })
            }
          >
            <Text style={styles.orangeBtnText}>
              Create Proposal
            </Text>
          </TouchableOpacity>
        )} */}
      </View>

      {/* Created date */}
       <View style={styles.createtime}>
                <Text style={styles.dateText}>
                  Created on:{" "}
                  {new Date(item.createdAt).toDateString()}
                </Text>
              </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
   
  },


  dashedDivider: {
    borderWidth: 0.6,
    borderColor: "#E0E0E0",
    marginTop: verticalScale(8),
  },

  /* CARD */
  card: {
    backgroundColor: Colors.white,
    marginTop: verticalScale(10),
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

  row: {
    flexDirection: "row",
    marginTop: verticalScale(10),
    alignItems: "center",
  },

  rowText: {
    marginLeft: moderateScale(6),
    color: Colors.black,
    fontSize: fontScale(13),
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

createtime:{
   alignItems:'center',

},
  dateText: {
 
    marginTop: verticalScale(10),
    color: "#999",
    fontSize: fontScale(15),
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

mechanicavatar: {
  width: 32,
  height: 32,
  borderRadius: 16,     // 32 / 2 = perfect circle
  backgroundColor: "#ad12b6",
  color: "#fff",

  fontSize: 13,
  fontWeight: "700",

  textAlign: "center",
  textAlignVertical: "center",  // Android perfect vertical align
},

siteavatar: {
  width: 32,
  height: 32,
  borderRadius: 16,     // 32 / 2 = perfect circle
  backgroundColor: "#19890d",
  color: "#fff",

  fontSize: 13,
  fontWeight: "700",

  textAlign: "center",
  textAlignVertical: "center",  // Android perfect vertical align
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

///////////////////////////
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

///////////////////////
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