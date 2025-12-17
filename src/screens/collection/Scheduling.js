import React, { useState ,useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  StatusBar,ActivityIndicator
} from "react-native";
import CustomHeader from "../../componests/all/CustomHeader";
import Feather from "react-native-vector-icons/Feather";
import D, {
  moderateScale,
  scale,
  verticalScale,
  fontScale,
  Spacing,
  Radius,
} from "../../constants/Dimmence";
import ProgressBar from '../../componests/all/ProgressBar'
import Colors from "../../constants/Colors";
import * as IMAGE from "../../assets/svg/index"
import api from "../../config/api";
import { useSelector,useDispatch } from "react-redux";
import LottieView from "lottie-react-native";
import { RectButton } from "react-native-gesture-handler";
import { setSelectedSchedule } from "../../redux/Slices/schedulingSlice";
export default function Scheduling({ navigation }) {

  
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const [search, setSearch] = useState("");


const [page, setPage] = useState(1);
const [loading, setLoading] = useState(false);
const [isListEnd, setIsListEnd] = useState(false);
const [list, setList] = useState([]);

console.log(list)
const fetchScheduling = async () => {
  if (loading || isListEnd) return;

  try {
    setLoading(true);

    const res = await api.get("scheduling", {
      headers: {
        Authorization: `bearer token ${token}`,
      },
      params: {
        page: page,
        limit: 10,
      
      },
    });

    const results = res.data?.data?.results || [];
    const pagination = res.data?.data?.pagination;

    // Format UI data
    const formatted = results.map(item => ({
      id: item._id,
      proposalId: item.proposalId,
      code: item.projectId,
      address: item.projectName,
      mechanic: item?.mechanics?.[0]?.name || "N/A",
      mechanicColor: item?.mechanics?.[0]?.profileColor || "#646464",
      siteManager: item?.siteManager?.[0]?.name || "N/A",
      siteManagerColor: item?.siteManager?.[0]?.profileColor || "#7d2dc9",
      timelineStart: item.timeline?.start || null,
      timelineEnd: item.timeline?.end || null,
      status: item.progress > 0 ? "In Progress" : "Pending",
      progress: Math.min(item.progress / 10, 1),
    }));

    // First page → replace list  
    // Next pages → append  
    if (page === 1) {
      setList(formatted);
    } else {
      setList(prev => [...prev, ...formatted]);
    }

    // Check list end
    if (!pagination?.hasNextPage) {
      setIsListEnd(true);
    } else {
      setPage(prev => prev + 1);
    }

  } catch (err) {
    console.log("API Error:", err.response?.data || err.message);
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  setPage(1);
  setIsListEnd(false);
  fetchScheduling();
}, []);


  const getColor = (p) => {
  if (p <= 0.3) return "#4472ef";   // Blue
  if (p <= 0.7) return "#F59E0B";   // Yellow
  return "#289626";                 // Green
};

const getInitials = (name) => {
  if (!name || name === "N/A") return "N/A";

  const parts = name.trim().split(" ");

  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }

  return (parts[0][0] + parts[1][0]).toUpperCase();
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const date = new Date(dateString);

  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${day} ${month}`;
};

const filteredList = list.filter(item =>
  item.address.toLowerCase().includes(search.toLowerCase()) ||
  item.code.toLowerCase().includes(search.toLowerCase()) ||
  item.mechanic.toLowerCase().includes(search.toLowerCase()) ||
  item.siteManager.toLowerCase().includes(search.toLowerCase())
);

  return (
    <View style={styles.container}>
        <StatusBar
  translucent={false}
  backgroundColor="transparent"  // your header bg color
  barStyle="dark-content"
/>

        
      <CustomHeader title="Scheduling" onBackPress={() => navigation.goBack()} />

      {/* 🔍 Search Bar */}
     <View style={styles.searchBox}>
  <Feather name="search" size={moderateScale(18)} color="#666" />

  <TextInput
    placeholder="Search"
    value={search}
    onChangeText={setSearch}
    style={styles.searchInput}
    placeholderTextColor="#999"
  />

  {/* Clear Button */}
  {search.length > 0 && (
    <TouchableOpacity onPress={() => setSearch("")} style={styles.clearBtn}>
      <Feather name="x-circle" size={moderateScale(18)} color="#999" />
    </TouchableOpacity>
  )}
</View>


      {/* 📄 LIST */}
{loading  ? (
  <View style={{
    flex: 1,
  marginBottom:50,
    justifyContent: "center",
    alignItems: "center",
  }}>
    <LottieView
      source={require("../../assets/loader/Files.json")}
      autoPlay
      loop
      style={{ width: 340, height: 340 }}
    />

    
  </View>
) : (
  <FlatList
    data={filteredList}
    keyExtractor={(item) => item.id}
    contentContainerStyle={{
      paddingBottom: 120,
      flexGrow: filteredList.length === 0 ? 1 : 0,
    }}
    renderItem={({ item }) => (
      <Card
        item={item}
        navigation={navigation}
        getColor={getColor}
        getInitials={getInitials}
        formatDate={formatDate}
      />
    )}
    ListEmptyComponent={() => (
      <View style={{ marginTop: 10, alignItems: "center" }}>
        <Feather name="inbox" size={100} color="#D0D0D0" />
        <Text style={{ marginTop: 12, fontSize: 14, color: "#777" }}>
          No Scheduling Found
        </Text>
      </View>
    )}
    onEndReachedThreshold={0.4}
    onEndReached={() => {
      if (!loading && !isListEnd) {
        fetchScheduling();
      }
    }}
    ListFooterComponent={() =>
      loading ? (
        <View style={{ paddingVertical: 20, alignItems: "center" }}>
          <ActivityIndicator size="small" color={Colors.primary} />
        </View>
      ) : null
    }
  />
)}



      {/* FIXED BOTTOM BAR */}
<View style={styles.bottomBar}>
  <TouchableOpacity style={styles.optionRow}>
    <Feather name="arrow-down" size={18} color="#555" />
    <Text style={styles.optionText}>Sort by</Text>
  </TouchableOpacity>

  {/* Divider */}
  <View style={styles.divider} />

  <TouchableOpacity style={styles.optionRow}>
    <Feather name="sliders" size={18} color="#555" />
    <Text style={styles.optionText}>Filter by</Text>
  </TouchableOpacity>
</View>

    </View>
  );
}

const Card = ({ item ,navigation,getColor,getInitials,formatDate}) => {

  const dispatch = useDispatch();

   const handleCardPress = () => {
    dispatch(setSelectedSchedule(item));   // <-- Save card data in Redux
    navigation.navigate("SchedulingDetails");
  };

  return (
    <RectButton 
    rippleColor="#dadada"
  style={styles.card} 
  activeOpacity={0.7}
  onPress={handleCardPress}
>


      {/* Top Row: Code + Menu */}
      <View style={styles.rowBetween}>
        <Text style={styles.code}>{item.code}</Text>
        <Feather name="more-vertical" size={20} color="#333" />
      </View>

      {/* Address */}
      <Text style={styles.address}>{item.address}</Text>

      {/* Timeline */}
      <View style={styles.timelineBox}>
        <Feather name="calendar" size={14} color="#7d2dc9" />
       <Text style={styles.timelineText}>
  Timeline: {formatDate(item.timelineStart)} - {formatDate(item.timelineEnd)}
</Text>

      </View>

 <View style={styles.addressSeparator} />
      {/* Mechanic + Site Manager */}
   <View style={styles.peopleRow}>
  
  {/* Mechanic */}
  <View style={styles.personBox}>
    <IMAGE.USER_CHECK width={32} height={32} />

    <View style={styles.personDetails}>
      <Text style={styles.personLabel}>Mechanic</Text>
<View style={[styles.avatarBox, { backgroundColor: item.mechanicColor }]}>

 <Text style={styles.avatarText}>{getInitials(item.mechanic)}</Text>

</View>

    </View>
  </View>

  {/* Site Manager */}
  <View style={styles.personBox}>
    <IMAGE.USER_CHECK width={32} height={32} />

    <View style={styles.personDetails}>
      <Text style={styles.personLabel}>Site Manager</Text>
    <View style={[styles.avatarBox, { backgroundColor: item.siteManagerColor }]}>

<Text style={styles.avatarText}>{getInitials(item.siteManager)}</Text>

</View>

    </View>
  </View>

</View>


      {/* Status */}
     {/* Status Header Row */}
<View style={styles.statusHeader}>
  <Text style={styles.statusLabel}>Status</Text>
 <Text style={[styles.statusText, { color: getColor(item.progress) }]}>
  {item.status}
</Text>

</View>

{/* Progress Bar */}
<ProgressBar progress={item.progress} />

    </RectButton >
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
searchBox: {
  marginTop: verticalScale(1),
  marginHorizontal: moderateScale(10),
  marginBottom: verticalScale(10),

  flexDirection: "row",
  alignItems: "center",

  borderRadius: Radius.pill,
  paddingHorizontal: moderateScale(15),
  paddingVertical: verticalScale(4),

  borderWidth: moderateScale(1),
  borderColor: Colors.border,

  backgroundColor: Colors.white,
},

searchInput: {
  marginLeft: moderateScale(8),
  fontSize: fontScale(14),
  flex: 1,
  color: Colors.textDark,
},

clearBtn: {
  paddingLeft: moderateScale(8),
},



  card: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    marginHorizontal:10,
   borderWidth:0.8,
  borderColor:Colors.border,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

code: {
  fontSize: fontScale(14),          // 🔥 responsive font
  fontWeight: "600",
  color: "#545454",
  lineHeight: verticalScale(18),    // 🔥 clean spacing
},

address: {
  fontSize: fontScale(14),          // 🔥 slightly bigger & responsive
  fontWeight: "700",
  color: "#000",
  marginTop: verticalScale(4),      // 🔥 proper vertical spacing
  lineHeight: verticalScale(20),    // 🔥 avoids overlapping
  flexShrink: 1,                    // 🔥 long address wrap safely
},

timelineBox: {
  flexDirection: "row",
  alignItems: "center",

  alignSelf: "flex-start",   // 🔥 BACKGROUND AUTO-WRAP FIX

  marginTop: 8,
  backgroundColor: "#a955f71b",
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 4,
},

  timelineText: {
    marginLeft: 6,
    fontSize: 12,
    color: "#7d2dc9",
    fontWeight: "600",
  },

  addressSeparator: {
    width: "100%",
    height: 1,
    backgroundColor: "#E5E5E5",
    marginTop: moderateScale(6),
    marginBottom: moderateScale(2),
  },

  ////// 
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
  textAlignVertical: "center",  
},

avatarBox: {
  width: moderateScale(32),
  height: moderateScale(32),
  borderRadius: moderateScale(16),
  backgroundColor: "#19890d",   
  justifyContent: "center",
  alignItems: "center",
},

avatarText: {
  color: "#fff",
  fontSize: fontScale(12),
  fontWeight: "700",
},
  
statusHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 16,
  marginVertical:Spacing.md
},

statusLabel: {
  fontSize: 13,
  color: "#333",
  fontWeight: "500",
},

statusText: {
  fontSize: 13,
  fontWeight: "700",
  color: "#2563EB",
  textAlign: "right",
},
 bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",

    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(20),

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    borderTopWidth: scale(1),
    borderTopColor: "#E4E4E4",
  },

  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(10),
  },

  optionText: {
    marginLeft: scale(6),
    fontSize: fontScale(15),
    color: "#333",
    fontWeight: "500",
  },

  divider: {
    top:10,
    width: scale(1),
    height: verticalScale(25),
    backgroundColor: "#CFCFCF",
    marginHorizontal: scale(20),
    marginBottom: verticalScale(18),
  },
});
