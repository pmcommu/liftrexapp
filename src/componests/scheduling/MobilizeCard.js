// import React,{useState,useEffect,useRef} from "react";
// import { View, Text, TouchableOpacity, StyleSheet ,TextInput,FlatList} from "react-native";
// import Feather from "react-native-vector-icons/Feather";
// import Colors from "../../constants/Colors";
// import { moderateScale, Spacing, Radius, fontScale } from "../../constants/Dimmence";
// import * as IMAGE from "../../assets/svg/index";
// const MobilizeCard = ({ item, openSheet, selectedAction }) => {


// const mobilizeList = [
//   {
//     id: "1",
//     title: "Mobilize",
//     actualTimeline: "20 Nov - 1 Dec",
//     planned: "Set Planned Timeline",
//     status: "Done",
//   },
//   {
//     id: "2",
//     title: "Mobilize",
//     actualTimeline: "15 Dec - 30 Dec",
//     planned: "Set Planned Timeline",
//     status: "In Progress",
//   },
//   {
//     id: "3",
//     title: "Mobilize",
//     actualTimeline: "10 Jan - 25 Jan",
//     planned: "Set Planned Timeline",
//     status: "Ready to Start",
//   },
// ];




//   const [activeTab, setActiveTab] = useState("PE1");

//   const getStatusStyles = (status) => {
//   switch (status) {
//     case "Done":
//       return {
//         bg: "#22c55e41",       // Green
//         border: "#22C55E",
//         text: "#22C55E",
//       };

//     case "In Progress":
//       return {
//         bg: "#f59f0b40",       // Orange
//         border: "#F59E0B",
//         text: "#F59E0B",
//       };

//     case "Ready to Start":
//       return {
//         bg: "#3982f62e",       // Blue
//         border: "#3B82F6",
//         text: "#3B82F6"
//       };

//     default:
//        return {
//         bg: "#22c55e41",       // Green
//         border: "#22C55E",
//         text: "#22C55E",
//       };
//   }
// };


//   const getapproveStyles = (status) => {
//   switch (status) {
//     case "Done":
//       return {
//         bg:  "#22C55E",       // Green
//         border: "#22C55E",
//         text: "#fefefe",
//       };

//     case "In Progress":
//       return {
//         bg: "#F59E0B",      // Orange
//         border: "#F59E0B",
//         text: "#ffffff",
//       };

//     case "Ready to Start":
//       return {
//         bg: "#3B82F6",    // Blue
//         border: "#3B82F6",
//         text: "#ffffff"
//       };

//     default:
//       return {
//         bg: "transparent",
//         border: Colors.primary,
//         text: Colors.primary
//       };
//   }
// };
// const statusStyle = getStatusStyles(selectedAction);


// const MobilizeItem = ({ item, openSheet, selectedAction }) => {
//   const statusStyle = getStatusStyles(selectedAction || item.status);

//   return (
//     <View style={styles.card}>

//       {/* Header */}
//       <View style={styles.row}>
//         <Text style={styles.title}>{item.title}</Text>

//         <View style={styles.iconRow}>
//           <View style={styles.iconCirclePurple}>
//             <IMAGE.MESSAGE width={28} height={28} />
//           </View>

//           <View style={styles.iconCircleYellow}>
//            <IMAGE.FILE width={28} height={28} />
//           </View>
//         </View>
//       </View>

//       {/* Actual Timeline */}
//       <View style={styles.timelineRow}>
//         <Feather name="calendar" size={18} color={Colors.textMedium} />
//         <Text style={styles.timelineLabel}>Actual Timeline:</Text>
//         <Text style={styles.timelineValue}>{item.actualTimeline}</Text>
//       </View>

//       {/* Planned */}
//       <View style={styles.timelineRow}>
//         <Feather name="calendar" size={18} color="#6A00FF" />
//         <Text style={styles.linkText}>{item.planned}</Text>
//       </View>

//       <View style={styles.divider} />

//       {/* Buttons */}
//       <View style={styles.buttonRow}>
//         <TouchableOpacity
//           style={[
//             styles.btnOutline,
//             { backgroundColor: statusStyle.bg, borderColor: statusStyle.border },
//           ]}
//           onPress={openSheet}
//         >
//           <Text style={[styles.btnOutlineText, { color: statusStyle.text }]}>
//             {selectedAction ? selectedAction : item.status}
//           </Text>

//           <Feather name="chevron-down" size={18} color={statusStyle.text} />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.btnFilled}>
//           <Text style={styles.btnFilledText}>
//             {item.status === "Done" ? "Approved" : "Approve"}
//           </Text>

//           <Feather name="chevron-down" size={18} color="#fff" />
//         </TouchableOpacity>
//       </View>

//     </View>
//   );
// };


//   return (
//     <View style={{}}>
//            <View style={styles.rowBetween}>
//                   <View style={styles.searchBox}>
//                     <Feather name="search" size={18} color="#666" />
//                     <TextInput placeholder="Search" style={styles.searchInput} />
//                   </View>
        
//                   <TouchableOpacity style={styles.downloadBtn}>
                   
//                     <Text style={styles.downloadText}>Download</Text>
//                    <Feather name="chevron-down" size={22} color="#fff" />
//                   </TouchableOpacity>
//                 </View>
        
//         <View style={styles.tabRow}>
//           {["PE1", "PE2", "PE3"].map((item) => (
//             <TouchableOpacity
//               key={item}
//               style={[
//                 styles.tabBtn,
//                 activeTab === item && styles.tabActive,
//               ]}
//               onPress={() => setActiveTab(item)}
//             >
//               <Text
//                 style={[
//                   styles.tabText,
//                   activeTab === item && styles.tabActiveText,
//                 ]}
//               >
//                 {item}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
        
        
//                 {/* Assign Mechanic */}
//                 <TouchableOpacity style={styles.assignBox}>
//                    <Feather name="plus-circle" size={25} color={Colors.primary} />
//                   <Text style={styles.assignText}>Assign Mechanic</Text>
//                 </TouchableOpacity>
//    <FlatList
//   data={mobilizeList}
//   keyExtractor={(item) => item.id}
//   renderItem={({ item }) => (
//     <MobilizeItem
//       item={item}
//       selectedAction={selectedAction}
//       openSheet={openSheet}
//     />
//   )}
//   contentContainerStyle={{ paddingBottom: 120 }}
// />

   
//     </View>
//   );
// };

// export default MobilizeCard;
// const styles = StyleSheet.create({
//   rowBetween: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     margin: Spacing.md,
//   },

//   searchBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth:1,
//     borderColor:Colors.border2,
//     borderRadius: Radius.pill,
//     paddingHorizontal: Spacing.md,
//     width: "65%",
//   },

//   searchInput: {
//     marginLeft: 8,
//     flex: 1,
//   },

//   downloadBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FF6A00",
//     paddingHorizontal: Spacing.md,
//     paddingVertical: Spacing.sm,
//     borderRadius: Radius.pill,
//   },

//   downloadText: {
//     color: "#fff",
//     marginHorizontal: 6,
//     fontWeight: "600",
//   },

//     tabRow: {
//   flexDirection: "row",
//   justifyContent: "space-between",
//   marginTop: Spacing.md,
//   marginHorizontal:15,
// },

// tabBtn: {
//   flex: 1,                        // 👈 MULTIPLE TABS = EQUAL WIDTH
//   paddingVertical: Spacing.sm,
//   alignItems: "center",           // center text
//   borderBottomWidth: 2,
//   borderColor: Colors.border,     // inactive underline
// },

// tabActive: {
//   borderColor: Colors.primary,     // active underline full width
// },

// tabText: {
//   fontSize: fontScale(14),
//   color: "#555",
// },

// tabActiveText: {
//   color: Colors.primary,
//   fontWeight: "700",
// },



//   assignBox: {
//     marginHorizontal: Spacing.md,
//     marginTop: 15,
//     padding: Spacing.md,
//     borderRadius: Radius.pill,
//     borderWidth: 1,
//     borderColor: "#fe7c63",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor:Colors.primaryLight,
//   },

//   assignText: {
//     marginLeft: 6,
//     color: "#fe694c",
//     fontSize: fontScale(13),
//     fontWeight: "600",
//   },
//   card: {
//     backgroundColor: "#fff",
//     margin: Spacing.md,
//     padding: Spacing.md,
//     borderRadius: Radius.lg,
//     borderWidth: 1,
//     borderColor: Colors.border,
//   },

//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   title: {
//     fontSize: fontScale(16),
//     fontWeight: "700",
//     color: Colors.textDark,
//   },

//   iconRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   iconCirclePurple: {
//     width: 35,
//     height: 32,
//     borderRadius: 19,
//     backgroundColor: "#F0E7FF",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 8,
//   },

//   iconCircleYellow: {
//     width: 35,
//     height: 32,
//     borderRadius: 19,
//     backgroundColor: "#FFF3CC",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   timelineRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 12,
//   },

//   timelineLabel: {
//     fontSize: fontScale(13),
//     color: Colors.textMedium,
//     marginLeft: 6,
//   },

//   timelineValue: {
//     fontSize: fontScale(13),
//     color: Colors.textDark,
//     fontWeight: "600",
//   },

//   linkText: {
//     color: "#6A00FF",
//     marginLeft: 6,
//     fontSize: fontScale(13),
//     fontWeight: "600",
//   },

//   divider: {
//     height: 1,
//     backgroundColor: Colors.border,
//     marginVertical: Spacing.md,
//   },

//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },

//   btnOutline: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//     marginRight: 10,
//     borderWidth: 1.5,

//     paddingVertical: 10,
//     justifyContent: "center",
//     borderRadius: Radius.md,
//   },

//   btnOutlineText: {
   
//     fontSize: fontScale(13),
//     marginRight: 6,
//     fontWeight: "600",
//   },

//   btnFilled: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//     backgroundColor: Colors.green,
//     paddingVertical: 10,
//     justifyContent: "center",
//     borderRadius: Radius.md,
//   },

//   btnFilledText: {
//     color: "#fff",
//     fontSize: fontScale(13),
//     marginRight: 6,
//     fontWeight: "600",
//   },
// });



import React, { useState ,useEffect,useRef} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,Dimensions ,ActivityIndicator,Animated,Pressable,ScrollView
} from "react-native";
import { moderateScale, Spacing, Radius, fontScale ,verticalScale,scale} from "../../constants/Dimmence";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../../constants/Colors";
import * as IMAGE from "../../assets/svg/index";
import { useSelector ,useDispatch} from "react-redux";
import api from "../../config/api";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Dropdown } from 'react-native-element-dropdown';
import { setSchedulingDetails } from "../../redux/Slices/schedulingSlice";
import { RectButton } from "react-native-gesture-handler";
import { setSelectedTask } from "../../redux/Slices/selectedTaskSlice";
import Comments from "./comments";
const MobilizeCard = ({
 // tabs,
  openSheet,
  openComments,
  openUpload,
  openDownload,
  navigation,
  reloadRef,
  openAssignMechanic,openApproveReject, openSchedulingUpload,openAssignSiteManager
}) => {

   const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
const user = useSelector((state) => state.auth.user);
   const selected = useSelector(state => state.scheduling.selectedSchedule);

const [showComments, setShowComments] = useState(false);


  const [activeTab, setActiveTab] = useState(null);
  const [tabDetails, setTabDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

const [searchText, setSearchText] = useState("");


  const [showAssign, setShowAssign] = useState(false);


  const [mechanics, setMechanics] = useState([]);
const [selectedMechanics, setSelectedMechanics] = useState([]);
const [sitemanager, setSiteManager] = useState([]);


// useEffect(() => {
//   loadMechanics();
// }, []);

// const loadMechanics = async () => {
//   try {
//     const res = await api.get("/user/registered-users", {
//       headers: { authorization: `bearer ${token}` }
//     });

//     const formatted = res.data.data.map(u => ({
//       label: `${u.name} (${u.email})`,
//       value: u._id,
//       name: u.name,
//       email: u.email
//     }));

//     setMechanics(formatted);

//   } catch (err) {
//     console.log("USER FETCH ERROR:", err);
//   }
// };




console.log('tabdetais',tabDetails)
 //  const [schedulingdetails, setSchedulingDetails] = useState([]);
   const [ tabs, setTabs] =useState([])
   const [checklistItems, setChecklistItems] = useState([]);
  const [viewMode, setViewMode] = useState("list"); 
// "list" | "kanban"

const allChecked = checklistItems.every(item => item.isChecked === true);

//console.log('sedulla',schedulingdetails)
   const [isExpanded, setIsExpanded] = useState(true);
   const rotateAnim = useRef(new Animated.Value(0)).current;
   
   const toggleExpand = () => {
     Animated.timing(rotateAnim, {
       toValue: isExpanded ? 0 : 1,
       duration: 200,
       useNativeDriver: true,
     }).start();
   
     setIsExpanded(!isExpanded);
   };
   
   const rotateIcon = rotateAnim.interpolate({
     inputRange: [0, 1],
     outputRange: ["0deg", "90deg"],
   });
  // 1️⃣ FIRST TAB DEFAULT
  useEffect(() => {
    if (tabs?.length > 0) {
      setActiveTab(tabs[0].tabId);
    }
  }, [tabs]);


  // 2️⃣ FETCH TAB DATA
  const fetchTabDetails = async (tabId) => {
  try {
    setLoading(true);

    const res = await api.get(`/scheduling/tab/${tabId}/details`, {
      headers: { authorization: `bearer ${token}` },
    });

    setTabDetails(res.data?.data?.tasks || []);

    setHasLoadedOnce(true);   // ⭐ MARK API DONE
  } catch (err) {
    console.log("TAB DETAILS ERROR:", err);
    setHasLoadedOnce(true);   // ⭐ ERROR में भी API completed मानेंगे
  } finally {
    setLoading(false);
  }
};


  // 3️⃣ FETCH WHEN TAB CHANGES
  useEffect(() => {
    if (!activeTab) return;
    fetchTabDetails(activeTab);
  }, [activeTab]);


  // 4️⃣ Parent ko refresh ka function dena
  useEffect(() => {
    if (reloadRef) {
      reloadRef.current = fetchTabDetails;
    }
  }, [activeTab]);





  // 🌈 Helpers
  const formatRange = (range) => {
    if (!range?.startDate || !range?.endDate) return "N/A";

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const s = new Date(range.startDate);
    const e = new Date(range.endDate);

    return `${s.getDate()} ${months[s.getMonth()]} - ${e.getDate()} ${months[e.getMonth()]}`;
  };

  const getReadableStatus = (status) => {
    const map = {
      READY_TO_START: "Ready to Start",
      IN_PROGRESS: "In Progress",
      COMPLETED: "Done",
      DONE: "Done",
      PENDING_APPROVAL: "Pending Approval",
      REJECTED: "Rejected",
    };
    return map[status] || "Not Set";
  };

const getStatusStyles = (statusRaw) => {
  const status = (statusRaw || "").trim().toUpperCase();

  switch (status) {
    case "READY_TO_START":
      return { bg: "#1f72f72e", border: "#126cfc", text: "#1b71fa" };

    case "IN_PROGRESS":
    case "INPROGRESS":
      return { bg: "#f59f0b40", border: "#F59E0B", text: "#F59E0B" };

    case "DONE":
    case "COMPLETED":
      return { bg: "#22c55e41", border: "#22C55E", text: "#22C55E" };

    case "PENDING_APPROVAL":
   
      return { bg: "#8cc1f93e", border: "#7aadfe", text: "#7eb8feff" };

    case "REJECTED":
      return { bg: "#ef44441a", border: "#EF4444", text: "#EF4444" };  // 🔥 NEW

    default:
      return { bg: "#e5e5e5", border: "#999", text: "#666" };
  }
};


const fetchDetails = async () => {


  if (!selected?.id) {
    return;
  }

  try {
    const res = await api.get(`/scheduling/proposal/${selected.proposalId}/details`, {
      headers: { authorization: `bearer ${token}` },
    });

   // setSchedulingDetails(res.data?.data || {});
    dispatch(setSchedulingDetails(res.data.data));

    setChecklistItems(res.data?.data.preInstallationChecklist || []);
    setTabs(res.data?.data.tabs || [])
setSelectedMechanics(res.data?.data?.mechanic || [])
setSiteManager(res.data?.data?.siteManager || [])
  } catch (err) {
    console.log("ERROR:", err);
  } finally {
    setLoading(false);
  }
};



useEffect(() => {
  fetchDetails();
}, [])


const toggleCheckItem = async (itemId, currentStatus) => {
  try {
    // 1. UI Update (Instant UI refresh)
    const updated = checklistItems.map((item) =>
      item._id === itemId ? { ...item, isChecked: !currentStatus } : item
    );
    setChecklistItems(updated);

    // 2. API CALL  (PUT REQUIRED)
    await api.put(
      "/scheduling/checklist",
      {
        schedulingId: selected.id,         // scheduling id
        checklistItemId: itemId,           // item id
        isChecked: !currentStatus          // new value
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${token}`,
        },
      }
    );

    console.log("Checklist Updated:", itemId);

  } catch (err) {
    console.log("CHECKLIST UPDATE ERROR:", err.response?.data || err.message);
  }
};


const filteredTabDetails = tabDetails.filter(item =>
  item.name?.toLowerCase().includes(searchText.toLowerCase())
);


const KANBAN_STATUSES = [
  "READY_TO_START",
  "IN_PROGRESS",
  "DONE",
  "PENDING_APPROVAL",
  // "ON_HOLD",
  "REJECTED",
  
];

const STATUS_COLORS = {
  READY_TO_START: "#2563EB",     // blue
  IN_PROGRESS: "#F59E0B",        // amber
  PENDING_APPROVAL: "#9e09bc",   // red
  REJECTED: "#EF4444",            // gray
       
  DONE: "#16A34A",               // dark green
};

const groupByStatus = (tasks = []) => {
  const map = {};
  KANBAN_STATUSES.forEach(s => (map[s] = []));

  tasks.forEach(task => {
    if (map[task.status]) {
      map[task.status].push(task);
    }
  });

  return map;
};

const kanbanData = groupByStatus(filteredTabDetails);


const getInitials = (name = "") => {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (
    parts[0][0].toUpperCase() +
    parts[parts.length - 1][0].toUpperCase()
  );
};

// duplicate remove
const uniqueMechanics = React.useMemo(() => {
  const map = new Map();
  selectedMechanics.forEach(m => {
    map.set(m._id, m);
  });
  return Array.from(map.values());
}, [selectedMechanics]);




  // ⭐ Single Item Component
  const MobilizeItem = ({ item }) => {
    const statusStyle = getStatusStyles(item.status);
const pendingDoc = item.docs?.find(doc => doc.status === "PENDING");
const isPending = Boolean(pendingDoc);
const hasUnreadComment = item.isCommentRead === false;

const today = new Date();

const plannedEndDate = item?.plannedTimeline?.endDate
  ? new Date(item.plannedTimeline.endDate)
  : null;

const invalidStatus = ![
  // "READY_TO_START",
  // "IN_PROGRESS",
  "DONE",
].includes(item.status);

const isOverdue =
  plannedEndDate && plannedEndDate < today;

const showAlert = invalidStatus && isOverdue;

const user = useSelector((state) => state.auth.user);
const isAdmin = user?.roleName === "admin";

    return (
     <RectButton
     rippleColor="#e8e8e8"
  activeOpacity={0.8}
style={[
  styles.card,
  viewMode === "kanban" && styles.cardKanban,
]}

  onPress={() =>
    navigation.navigate("TaskDetails", {
      tabId: activeTab,             
      taskId: item.taskId,           
      titlename: item.name,
      actualTimeline: item.actualTimeline,
      plannedTimeline: item.plannedTimeline,
       docs: item.docs || [],  
    })
  }
>
 {showAlert && (
    <View style={styles.alertIcon}>
      <Feather name="alert-circle" size={16} color="#fff" />
    </View>
  )}
        {/* <View style={styles.card}> */}

          {/* Title Row */}
          <View style={styles.row}>
            <Text style={[styles.title, { flexShrink: 1 }]} numberOfLines={2}>
              {item.name}
            </Text>

          <View style={styles.iconRow}>
<View style={{ position: "relative" }}>
  <RectButton
    style={styles.iconCirclePurple}
    onPress={() =>
    navigation.navigate("NewComments", {
      tabId: activeTab,             
      taskId: item.taskId,           
      titlename: item.name,
      actualTimeline: item.actualTimeline,
      plannedTimeline: item.plannedTimeline,
       docs: item.docs || [],  
    })
  }
     // onPress={() => navigateComments(activeTab, item.taskId)}
   // onPress={() => openComments(activeTab, item.taskId)}
  >
    <IMAGE.MESSAGE width={25} height={25} />
  </RectButton>

  {/* 🔴 Red Dot */}
  {hasUnreadComment && (
    <View style={styles.redDot} />
  )}
</View>


  <RectButton
    style={styles.iconCircleYellow}
    onPress={() => openDownload(activeTab, item)}
  >
    <IMAGE.FILE width={25} height={25} />
  </RectButton>
</View>

          </View>


          {/* Actual */}
    {user?.roleName === "admin" && item?.actualTimeline && (
  <View style={styles.timelineRow}>
    <Feather name="calendar" size={18} color={Colors.textMedium} />
    <Text style={styles.timelineLabel}>Actual Timeline: </Text>
    <Text style={styles.timelineValue}>
      {formatRange(item.actualTimeline)}
    </Text>
  </View>
)}


          {/* Planned */}
          <View style={styles.timelineRow}>
            <Feather name="calendar" size={18} color={Colors.textMedium} />
               <Text style={styles.timelineLabel}>Planned Timeline: </Text>
            <Text style={styles.linkText}>{formatRange(item.plannedTimeline)}</Text>
          </View>


          <View style={styles.divider} />

          {/* Status Button */}
    <View style={styles.buttonRow}>

  {/* ===== LIST VIEW (OLD BEHAVIOR – NO CHANGE) ===== */}
  {viewMode === "list" && (
    <>
      {/* Status Button */}
      {/* <RectButton
        style={[
          styles.btnOutline,
          { backgroundColor: statusStyle.bg, borderColor: statusStyle.border },
        ]}
        onPress={() => openSheet(activeTab, item.taskId, item.status)}
      >
        <Text style={{ color: statusStyle.text }}>
          {getReadableStatus(item.status)}
        </Text>
        <Feather name="chevron-down" size={18} color={statusStyle.text} />
      </RectButton> */}
<RectButton
  style={[
    styles.btnOutline,
    { backgroundColor: statusStyle.bg, borderColor: statusStyle.border },
  ]}
  onPress={() => {
    // 1️⃣ Redux me save
    dispatch(
      setSelectedTask({
        tabId: activeTab,
        taskId: item.taskId,
        status: item.status,
      })
    );

    // 2️⃣ Sheet open
    openSheet();
  }}
>
  <Text style={{ color: statusStyle.text }}>
    {getReadableStatus(item.status)}
  </Text>
  <Feather name="chevron-down" size={18} color={statusStyle.text} />
</RectButton>

      {/* Action Button */}
<RectButton
  style={[
    styles.btnFilled,
    isPending
      ? styles.btnActionNeeded   // 🔥 yellow
      : styles.btnDisabled,      // ⚫ light black
    !isAdmin && styles.btnDisabled,
  ]}
  enabled={isAdmin && isPending}
  onPress={() => {
    if (!isAdmin || !isPending) return;
    openApproveReject(activeTab, item, pendingDoc);
  }}
>
  <Text
    style={[
      styles.btnFilledText,
      !isPending && { color: "#999" },
    ]}
  >
    {isPending ? "! Action Needed" : "No Action"}
  </Text>

  {isPending && (
    <Feather name="chevron-down" size={18} color="#ffffff" />
  )}
</RectButton>

    </>
  )}

  {/* ===== KANBAN VIEW (NEW LOGIC) ===== */}
  {viewMode === "kanban" && isAdmin && (
    <RectButton
      style={[
        styles.btnFilled,
        styles.fullWidthBtn,
        !isPending && { opacity: 0.4 },
      ]}
      enabled={isPending}
      onPress={() => {
        if (pendingDoc) {
          openApproveReject(activeTab, item, pendingDoc);
        }
      }}
    >
      <Text style={styles.btnFilledText}>
        {isPending ? "! Action needed" : "No Action"}
      </Text>
    </RectButton>
  )}

  {viewMode === "kanban" && !isAdmin && (
    <RectButton
      style={[
        styles.btnOutline,
        styles.fullWidthBtn,
        { backgroundColor: statusStyle.bg, borderColor: statusStyle.border },
      ]}
      onPress={() => {
    // 1️⃣ Redux me save
    dispatch(
      setSelectedTask({
        tabId: activeTab,
        taskId: item.taskId,
        status: item.status,
      })
    );

    // 2️⃣ Sheet open
    openSheet();
  }}
    >
      <Text style={{ color: statusStyle.text, fontWeight: "700" }}>
        {getReadableStatus(item.status)}
      </Text>
    </RectButton>
  )}

</View>


        {/* </View> */}
      </RectButton>
    );
  };


  // ⭐ Final Return UI
  return (
    <View>
      {/* Search */}
{user?.roleName === "admin" && (
  <TouchableOpacity
    style={styles.siteassignBox}
    onPress={() => openAssignSiteManager(activeTab)}
    activeOpacity={0.8}
  >
    {/* CENTER TEXT */}
    <View style={styles.centerTextWrap}>
      <Text style={styles.assignText}>Site Manager</Text>
    </View>

    {/* RIGHT SIDE – SITE MANAGER AVATAR */}
    {sitemanager?.length > 0 && (
      <View style={styles.avatarStack}>
        {sitemanager.slice(0, 1).map((m, index) => (
          <View
            key={m._id}
            style={[
              styles.avatarCircle,
              {
                backgroundColor: m.profileColor || "#10B981", // green for site manager
              },
            ]}
          >
            <Text style={styles.avatarText}>
              {getInitials(m.name)}
            </Text>
          </View>
        ))}

        {/* FUTURE SAFE: if multiple site managers */}
        {sitemanager.length > 1 && (
          <View style={styles.countCircle}>
            <Text style={styles.countText}>
              +{sitemanager.length - 1}
            </Text>
          </View>
        )}
      </View>
    )}
  </TouchableOpacity>
)}

 <View style={styles.card}>

  {/* SECTION HEADER */}
  <TouchableOpacity
    style={styles.sectionHeader}
    onPress={toggleExpand}
    activeOpacity={0.7}
  >
    {/* LEFT SIDE ICON */}
    <Animated.View style={{ transform: [{ rotate: rotateIcon }] }}>
      <Feather name="chevron-right" size={20} color="#555" />
    </Animated.View>

    <Text style={styles.sectionTitle}>Pre Installation Checklist</Text>

    {/* RIGHT SIDE — ALL CHECKED STATUS */}
    {allChecked && (
      <View style={styles.statusBox}>
        <Feather name="check-circle" size={18} color="#22C55E" />
        <Text style={styles.prestatusText}>All Checked</Text>
      </View>
    )}
  </TouchableOpacity>

  {/* CHECKLIST */}
  {isExpanded && (
    <>
      <View style={styles.addressSeparator} />

      <View style={styles.checklistCard}>
        {checklistItems.map((item) => (
  <RectButton
    key={item._id}
    onPress={() => toggleCheckItem(item._id, item.isChecked)}
    activeOpacity={0.7}
  >
    {checkItem(item.title, item.isChecked)}
  </RectButton>
))}



      </View>
    </>
  )}
</View>

<View style={styles.taskTitleRow}>
  <Text style={styles.taskTitle}>Scheduling Tasks</Text>

  {/* <TouchableOpacity
    style={styles.viewToggleBtn}
    onPress={() =>
      setViewMode(prev => (prev === "list" ? "kanban" : "list"))
    }
  >
    <Feather
      name={viewMode === "list" ? "columns" : "list"}
      size={20}
      color={Colors.primary}
    />
  </TouchableOpacity> */}
</View>



      <View style={styles.rowBetween}>
      <View style={styles.searchBox}>
  <Feather name="search" size={18} color="#666" />

  <TextInput
    style={[styles.searchInput, { color: "black" }]}
    placeholder="Search"
    placeholderTextColor={Colors.black}
    value={searchText}
    onChangeText={setSearchText}
  />

  {/* CLEAR ICON (ONLY SHOW WHEN TEXT EXISTS) */}
  {searchText.length > 0 && (
    <TouchableOpacity onPress={() => setSearchText("")}>
      <Feather name="x-circle" size={20} color="#888" />
    </TouchableOpacity>
  )}
</View>


        <TouchableOpacity style={styles.downloadBtn} onPress={() => openSchedulingUpload()} >
          <Text style={styles.downloadText}>Download</Text>
          <Feather name="chevron-down" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
     <View style={styles.tabRow}>
  {tabs?.map((t) => (
    <TouchableOpacity
      key={t.tabId}
      style={[
        styles.tabBtn,
        activeTab === t.tabId && { borderBottomWidth: 2, borderBottomColor: Colors.primary },
      ]}
      onPress={() => {
        setLoading(true);    
        setTabDetails([]);   
        setActiveTab(t.tabId);
      }}
    >
      <Text style={[styles.tabText, activeTab === t.tabId && { color: Colors.primary }]}>
        {t.elevatorKey}
      </Text>
    </TouchableOpacity>
  ))}
</View>


      {/* Assign */}
 {user?.roleName === "admin" && (
<TouchableOpacity
  style={styles.assignBox}
  onPress={() => openAssignMechanic(activeTab)}
  activeOpacity={0.8}
>
  {/* CENTER TEXT */}
  <View style={styles.centerTextWrap}>
    <Text style={styles.assignText}>Assign Mechanic</Text>
  </View>

  {/* RIGHT SIDE – AVATAR STACK */}
  {uniqueMechanics.length > 0 && (
    <View style={styles.avatarStack}>
      {uniqueMechanics.slice(0, 2).map((m, index) => (
        <View
          key={m._id}
          style={[
            styles.avatarCircle,
            {
              backgroundColor: m.profileColor || "#6366F1",
              marginLeft: index === 0 ? 0 : -10,
              zIndex: 10 - index,
            },
          ]}
        >
          <Text style={styles.avatarText}>
            {getInitials(m.name)}
          </Text>
        </View>
      ))}

      {uniqueMechanics.length > 2 && (
        <View style={styles.countCircle}>
          <Text style={styles.countText}>
            +{uniqueMechanics.length - 2}
          </Text>
        </View>
      )}
    </View>
  )}
</TouchableOpacity>



)}



      {/* List */}
      
{viewMode === "list" ? (
  /* ================= LIST VIEW ================= */
  <FlatList
    data={filteredTabDetails}
    keyExtractor={(item, index) =>
  item._id ? item._id.toString() : `${item.taskId}-${index}`
}

    renderItem={({ item }) => <MobilizeItem item={item} />}
    ListFooterComponent={
      loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.primary}
          style={{ padding: 20 }}
        />
      ) : null
    }
    ListEmptyComponent={
      hasLoadedOnce && !loading && filteredTabDetails.length === 0 ? (
        <View style={styles.emptyBox}>
          <Feather name="clipboard" size={50} color="#999" />
          <Text style={styles.emptyTitle}>No Tasks Found</Text>
          <Text style={styles.emptySubtitle}>
            Try adjusting your search or choose another tab.
          </Text>
        </View>
      ) : null
    }
    contentContainerStyle={{
      paddingBottom: 120,
      flexGrow: 1,
    }}
  />
) : (
  /* ================= KANBAN VIEW ================= */
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 120 }}
  >
 {KANBAN_STATUSES.map(status => {
  const count = kanbanData[status]?.length || 0; // ✅ YAHI PAR

  return (
    <View key={status} style={styles.kanbanColumn}>
      
      {/* ===== KANBAN HEADER ===== */}
      <View style={styles.kanbanHeader}>
        {/* LEFT: DOT + STATUS TEXT */}
        <View style={styles.headerLeft}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: STATUS_COLORS[status] || "#999" },
            ]}
          />

          <Text
            style={[
              styles.kanbanHeaderText,
              { color: STATUS_COLORS[status] || "#333" },
            ]}
          >
            {getReadableStatus(status)}
          </Text>
        </View>

        {/* RIGHT: COUNT BADGE */}
        <View
          style={[
            styles.countBadge,
            // { backgroundColor: STATUS_COLORS[status] || "#E5E7EB" },
          ]}
        >
          <Text style={styles.countText}>0{count}</Text>
        </View>
      </View>

      {/* ===== TASKS ===== */}
      {count > 0 ? (
        kanbanData[status].map(item => (
          <MobilizeItem
         key={`${status}-${item.taskId}`}  
            item={item}
            viewMode="kanban"
          />
        ))
      ) : (
        <Text style={styles.emptyText}>No Tasks</Text>
      )}
    </View>
  );
})}

  </ScrollView>
)}


    </View>
  );
};

const checkItem = (label, checked) => (
  <View style={styles.checkRow}>
    <MaterialIcons
      name={checked ? "check-box" : "check-box-outline-blank"}
      size={24}
      color={checked ? Colors.primary : "#999"}
    />
    <Text style={styles.checkText}>{label}</Text>
  </View>
);


export default MobilizeCard;

const styles = StyleSheet.create({
rowBetween: {
  flexDirection: "row",
 // justifyContent: "space-between",
  //alignItems: "center",
  marginHorizontal: moderateScale(11),
  marginVertical: verticalScale(10),
  gap: scale(10), // 🔥 perfect spacing
},

searchBox: {
  flexDirection: "row",
  alignItems: "center",
  borderWidth: moderateScale(1),
  borderColor: Colors.border2,
  borderRadius: Radius.pill,
  paddingHorizontal: moderateScale(12),

  height: verticalScale(42),   // 🔥 FIXED HEIGHT MATCHING BUTTON
  flex: 1,
},


searchInput: {
  marginLeft: moderateScale(8),
  flex: 1,
  fontSize: fontScale(14),
  color: Colors.textDark,
},

downloadBtn: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#FF6A00",
  paddingHorizontal: moderateScale(14),
  borderRadius: Radius.pill,

  height: verticalScale(42),   // 🔥 SAME HEIGHT AS SEARCH BOX
  justifyContent: "center",
},

redDot: {
  position: "absolute",
  top: 1,
  right: 1,
  width: 10,
  height: 10,
  borderRadius: 10,
  backgroundColor: "red",
  //borderWidth: 2,
  //borderColor: "#fff",
},

downloadText: {
  color: "#fff",
 
  fontWeight: "600",
  fontSize: fontScale(14),
},


    tabRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: Spacing.md,
  marginHorizontal:15,
},

tabBtn: {
  flex: 1,                        // 👈 MULTIPLE TABS = EQUAL WIDTH
  paddingVertical: Spacing.sm,
  alignItems: "center",           // center text
  borderBottomWidth: 2,
  borderColor: Colors.border,     // inactive underline
},

tabActive: {
  borderColor: Colors.primary,     // active underline full width
},

tabText: {
  fontSize: fontScale(14),
  color: "#555",
},

tabActiveText: {
  color: Colors.primary,
  fontWeight: "700",
},


////////////////////SITE MANAGERASSING STYLEE//////////////////////////
siteassignBox: {
  marginHorizontal: moderateScale(12),
marginVertical: verticalScale(5),

  height: verticalScale(45),
  paddingHorizontal: moderateScale(16),

  borderRadius: moderateScale(40),
  borderWidth: 1,
  borderColor: "#fe7c63",
  //backgroundColor: Colors.primaryLight,

  position: "relative",          // 🔥 REQUIRED
  justifyContent: "center",
},

////////////////////ASSING STYLEE//////////////////////////
assignBox: {
  marginHorizontal: moderateScale(12),
  marginTop: verticalScale(15),

  height: verticalScale(45),
  paddingHorizontal: moderateScale(16),

  borderRadius: moderateScale(40),
  borderWidth: 1,
  borderColor: "#fe7c63",
  backgroundColor: Colors.primaryLight,

  position: "relative",          // 🔥 REQUIRED
  justifyContent: "center",
},

centerTextWrap: {
  position: "absolute",
  left: 0,
  right: 0,
  alignItems: "center",          // 🔥 perfect center
},

assignText: {
  color: "#fe694c",
  fontSize: fontScale(14),
  fontWeight: "600",
},

avatarStack: {
  position: "absolute",
  right: moderateScale(14),      // 🔥 stick to right
  flexDirection: "row",
  alignItems: "center",
},

avatarCircle: {
  width: 32,
  height: 32,
  borderRadius: 16,
  justifyContent: "center",
  alignItems: "center",

  borderWidth: 2,
  borderColor: "#fff",

  backgroundColor: "#6366F1",
},

avatarText: {
  color: "#fff",
  fontSize: 12,
  fontWeight: "700",
},

countCircle: {
  width: 32,
  height: 32,
  borderRadius: 16,

  backgroundColor: "#F97316",
  justifyContent: "center",
  alignItems: "center",

  marginLeft: -10,          // 🔥 overlap with avatar
  // borderWidth: 2,
  // borderColor: "#fff",
},

countText: {
  color: "#fff",
  fontSize: 11,
  fontWeight: "700",
},


////////////////////CARD STYLEE//////////////////////////
  card: {
    top:10,
    backgroundColor: "#fff",
    marginHorizontal:Spacing.md,
    marginVertical:Spacing.sm,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

 title: {
  fontSize: moderateScale(16),
  fontWeight: "600",
  color: Colors.textDark,
  flexShrink: 1,
  width: "80%",
},


iconRow: {
  flexDirection: "row",
  alignItems: "center",
  gap: moderateScale(10),   // 🔥 spacing responsive & consistent
},

iconCirclePurple: {
  width: moderateScale(40),     // 🔥 same size every device
  height: moderateScale(40),    // 🔥 perfect circle
  borderRadius: moderateScale(21),
  backgroundColor: "#F0E7FF",
  justifyContent: "center",
  alignItems: "center",
},

iconCircleYellow: {
  width: moderateScale(40),
  height: moderateScale(40),
  borderRadius: moderateScale(21),
  backgroundColor: "#FFF3CC",
  justifyContent: "center",
  alignItems: "center",
},


  timelineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  timelineLabel: {
    fontSize: fontScale(13),
    color: Colors.textMedium,
    marginLeft: 6,
  },

  timelineValue: {
    fontSize: fontScale(13),
    color: Colors.textDark,
    fontWeight: "800",
  },

  linkText: {
    color: "#0d00ff",
    marginLeft: 6,
    fontSize: fontScale(13),
    fontWeight: "800",
  },

  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },
buttonRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: scale(10), // 🔥 spacing perfect & responsive
},

btnOutline: {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",

  height: verticalScale(40),   // 🔥 fixed perfect height
  borderWidth: moderateScale(1.4),
 borderRadius: Radius.sm,

  paddingHorizontal: moderateScale(10),
},

btnOutlineText: {
  fontSize: fontScale(13),
  marginRight: scale(6),
  fontWeight: "600",
},

btnFilled: {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",

  height: verticalScale(40),   // 🔥 same as outline
  borderRadius: Radius.sm,
  backgroundColor: Colors.green,

  paddingHorizontal: moderateScale(10),
},

btnFilled: {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  height: verticalScale(40),
  borderRadius: Radius.sm,
  paddingHorizontal: moderateScale(10),
},

// ⚠️ ACTION NEEDED (HOT YELLOW)
btnActionNeeded: {
  backgroundColor: "#FFC107", // hot yellow
  opacity: 1,
},

// ❌ NO ACTION / DISABLED
btnDisabled: {
  backgroundColor: "#E0E0E0", // light black / grey
  opacity: 0.7,
},

btnFilledText: {
  fontSize: 14,
  fontWeight: "600",
  color: "#000",
  marginRight: 6,
},


btnFilledText: {
  color: "#fff",
  fontSize: fontScale(13),
  marginRight: scale(6),
  fontWeight: "600",
},



////////////////
alertIcon: {
  position: "absolute",
  top: -5,
  left: -5,
  backgroundColor: "#E53935", // red
  width: 26,
  height: 26,
  borderRadius: 13,
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10,
  
},

card: {
  backgroundColor: "#fff",
  borderRadius: Radius.lg,
  marginVertical: Spacing.sm,
  marginHorizontal: Spacing.md,   // 👈 default (LIST)
  padding: Spacing.md,
  borderWidth: 0.8,
  borderColor: Colors.border,
},

cardKanban: {
  marginHorizontal: 2,            // 👈 REMOVE in KANBAN
},

cardHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
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
  color: Colors.primary,
  textAlign: "right",
},

sectionHeader: {
  flexDirection: "row",

  alignItems: "center",
  
  paddingVertical: Spacing.sm,
},

  sectionTitle: {
    fontSize: fontScale(15),
    fontWeight: "700",
   // marginTop: 20,
    marginLeft: Spacing.sm,
  },

  checklistCard: {
    backgroundColor: "#fff",
    margin: Spacing.md,
    //padding: Spacing.md,
    borderRadius: Radius.lg,
  },

  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },

  checkText: {
    marginLeft: 10,
    fontSize: fontScale(14),
  },



  ///------  /////// task schdual/////
   taskTitle: {
    fontSize: fontScale(17),
    fontWeight: "800",
   marginTop: 20,
    marginLeft: Spacing.md,
  },

  ////////------ status row---------

statusBox: {
  flexDirection: "row",
  alignItems: "center",
  marginLeft: "auto",
},

prestatusText: {
  marginLeft: 4,
  color: "#22C55E",
  fontSize: 13,
  fontWeight: "800",
},

/////////////////

emptyBox: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingTop: 40,
  paddingHorizontal: 20,
},

emptyTitle: {
  fontSize: 18,
  fontWeight: "700",
  color: "#555",
  marginTop: 12,
},

emptySubtitle: {
  fontSize: 14,
  color: "#888",
  marginTop: 4,
  textAlign: "center",
},


/////////

taskTitleRow: {
  flexDirection: "row",
  alignItems: "center",          // ⭐ vertically center
  justifyContent: "space-between",
  marginHorizontal: Spacing.md,
  marginTop: 20,
  //marginBottom: 10,
},

taskTitle: {
  fontSize: fontScale(17),
  fontWeight: "800",
  color: Colors.black,
},

viewToggleBtn: {
  width: 36,
  height: 36,
  borderRadius: 18,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f6954127",   // light bg for icon
},

kanbanColumn: {
  width: 320,
  marginRight: 5,
},

// kanbanHeader: {
//   textAlign: "center",
//   fontWeight: "800",
//   fontSize: 14,
//   paddingVertical: 8,
//   borderRadius: 8,
//   backgroundColor: "#f1f1f1",
//   marginBottom: 10,
//   borderWidth:1,
//   borderColor:Colors.border,
// },
kanbanHeader: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 8,
  borderRadius: 10,
 // backgroundColor: "#F8FAFC", // light bg
  marginBottom: 10,
  gap: 8,
  borderWidth:1,
  borderColor:Colors.border,
},
statusDot: {
  width: 8,
  height: 8,
  borderRadius: 4,
},
kanbanHeaderText: {
  fontSize: 14,
  fontWeight: "800",
},


emptyText: {
  textAlign: "center",
  color: "#999",
  marginTop: 20,
  fontSize: 12,
},

kanbanHeader: {
  marginTop:8,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 10,
  
  marginBottom: 10,
    borderWidth:1,
    borderRadius:Radius.md,
  borderColor:Colors.border,
},

headerLeft: {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
},

statusDot: {
  width: 8,
  height: 8,
  borderRadius: 4,
},

kanbanHeaderText: {
  fontSize: 14,
  fontWeight: "800",
},

countBadge: {
  minWidth: 22,
  height: 22,

  borderRadius: 11,
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: 6,
},

countText: {
  color: "#171717",
  fontSize: 12,
  fontWeight: "800",
},

});



  // const MobilizeItem = ({ item }) => {
  //   const status = selectedStatusList[item.id];
  //   const statusStyle = getStatusStyles(status);



  //   return (
  //      <TouchableOpacity
  //     activeOpacity={0.8}
  //     onPress={() =>
  //       navigation.navigate("TaskDetails", {
  //         id: item.id,
  //         title: item.title,
  //         actualTimeline: item.actualTimeline,
  //         planned: item.planned,
  //       })
  //     }
  //   >
  //     <View style={styles.card}>
        
  //       <View style={styles.row}>
  //         <Text style={styles.title}>{item.title}</Text>

  //         <View style={styles.iconRow}>
            
  //           <TouchableOpacity style={styles.iconCirclePurple} onPress={openComments}>
  //             <IMAGE.MESSAGE width={25} height={25} />
  //           </TouchableOpacity>

  //           <TouchableOpacity style={styles.iconCircleYellow} onPress={openUpload}>
  //             <IMAGE.FILE width={25} height={25} />
  //           </TouchableOpacity>
  //         </View>
  //       </View>

  //       <View style={styles.timelineRow}>
  //         <Feather name="calendar" size={18} color={Colors.textMedium} />
  //         <Text style={styles.timelineLabel}>Actual Timeline: </Text>
  //         <Text style={styles.timelineValue}>{item.actualTimeline}</Text>
  //       </View>

  //       <View style={styles.timelineRow}>
  //         <Feather name="calendar" size={18} color="#0d00ff" />
  //         <Text style={styles.linkText}>{item.planned}</Text>
  //       </View>

  //       <View style={styles.divider} />

  //       <View style={styles.buttonRow}>
  //         <TouchableOpacity
  //           style={[
  //             styles.btnOutline,
  //             { backgroundColor: statusStyle.bg, borderColor: statusStyle.border },
  //           ]}
  //           onPress={() => {
  //             setCurrentItemId(item.id);
  //             openSheet();
  //           }}
  //         >
  //           <Text style={{ color: statusStyle.text }}>{status}</Text>
  //           <Feather name="chevron-down" size={18} color={statusStyle.text} />
  //         </TouchableOpacity>

  //         <TouchableOpacity style={styles.btnFilled}>
  //           <Text style={styles.btnFilledText}>{status === "Done" ? "Approved" : "Approve"}</Text>
  //           <Feather name="chevron-down" size={18} color="#fff" />
  //         </TouchableOpacity>
  //       </View>

  //     </View>
  //     </TouchableOpacity>
  //   );
  // };
