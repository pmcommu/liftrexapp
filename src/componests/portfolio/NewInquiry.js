import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../../constants/Colors";
import * as IMAGE from "../../assets/svg/index"
import D, {
  moderateScale,
  scale,
  verticalScale,
  fontScale,
  Spacing,
  Radius,
} from "../../constants/Dimmence";



export default function NewInquiry({navigation}) {
  return (
 <View style={styles.container}>
      {/* Header */}
   

      {/* Top Tabs */}
      

      {/* Search + Create New */}
     <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Feather name="search" size={moderateScale(18)} color="#999" />
          <TextInput
            placeholder="Search..."
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity style={styles.createBtn} onPress={ () => navigation.navigate('CreateInquiry')}>
          <Text style={styles.createBtnText}>+ Create New</Text>
        </TouchableOpacity>
      </View>

      {/* Inquiry List */}
      <FlatList
        data={[1, 2, 3]}
        renderItem={() => <InquiryCard />}
        keyExtractor={(item) => item.toString()}
        contentContainerStyle={{ paddingBottom: 90 }}
      />

      {/* Bottom buttons */}
   <View style={styles.bottomActions}>
  <View style={styles.actionWrapper}>
    
    {/* Sort By */}
    <TouchableOpacity style={styles.actionBtn}>
      <Feather name="sliders" size={18} color="#333" />
      <Text style={styles.actionText}>Sort by</Text>
    </TouchableOpacity>

    {/* Divider */}
    <View style={styles.divider} />

    {/* Filter By */}
    <TouchableOpacity style={styles.actionBtn}>
      <Feather name="filter" size={18} color="#333" />
      <Text style={styles.actionText}>Filter by</Text>
    </TouchableOpacity>

  </View>
</View>

    </View>
  );
}


function InquiryCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.cardId}>NQ25016</Text>

      <Text style={styles.cardAddress}>
        22 LORAINE STREET, BROOKLYN NY 11231
      </Text>

    
<View style={styles.peopleRow}>
       <View style={styles.personBox}>
            <IMAGE.FLEX width={40} height={30} />
      
          <View style={styles.personDetails}>
            <Text style={styles.personLabel}>No. of Elevators</Text>
            <Text style={styles.mechanic}>3</Text>
          </View>
        </View>
      
        {/* Site Manager */}
        <View style={styles.personBox}>
          <IMAGE.USER_CHECK width={32} height={32} />
      
          <View style={styles.personDetails}>
            <Text style={styles.personLabel}>Client</Text>
            <Text style={styles.site}>Sky Equity Group</Text>
          </View>
        </View>

        </View>

      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.greyBtn}>
          <Text style={styles.greyBtnText}>View Details</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.orangeBtn}>
          <Text style={styles.orangeBtnText}>Create Proposal</Text>
        </TouchableOpacity>
      </View>
<View style={styles.createtime}>

    <Text style={styles.dateText}>Created on: 20 Sep, 2025</Text>
</View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
   
  },

  /* Search Row */
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(10),
     marginHorizontal: moderateScale(10),
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingVertical: verticalScale(5),
    paddingHorizontal: moderateScale(12),
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },

  searchInput: {
    flex: 1,
    marginLeft: moderateScale(6),
    fontSize: fontScale(13),
    color: Colors.black,
  },

  createBtn: {
    backgroundColor: Colors.primary,
    marginLeft: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    paddingVertical: verticalScale(14),
    borderRadius: Radius.pill,
  },

  createBtnText: {
    color: Colors.white,
    fontSize: fontScale(13),
    fontWeight: "700",
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

  orangeBtn: {
    flex: 1,
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
   alignItems:'center',

},
  dateText: {
 
    marginTop: verticalScale(10),
    color: "#999",
    fontSize: fontScale(15),
  },
 bottomActions: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  alignItems: "center",
  paddingVertical: 12,
  backgroundColor: "#fff",
  borderTopWidth: 1,
  borderColor: "#eee",
  paddingBottom: 25, // to look clean
},

actionWrapper: {
  flexDirection: "row",
  backgroundColor: "#fff",
  paddingHorizontal: 20,
  paddingVertical: 10,
 

  
},

actionBtn: {
  flexDirection: "row",
  alignItems: "center",
  gap: 5,
  paddingHorizontal: 10,
},

divider: {
  width: 1,
  height: 20,
  backgroundColor: "#ddd",
  marginHorizontal: 12,
},

actionText: {
  fontSize: 14,
  fontWeight: "500",
  color: "#333",
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
});