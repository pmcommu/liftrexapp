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



import React, { useState ,useEffect} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,Dimensions ,ActivityIndicator
} from "react-native";
import { moderateScale, Spacing, Radius, fontScale ,verticalScale,scale} from "../../constants/Dimmence";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../../constants/Colors";
import * as IMAGE from "../../assets/svg/index";
import { useSelector } from "react-redux";
import api from "../../config/api";

const MobilizeCard = ({
  tabs,
  openSheet,
  openComments,
  openUpload,
  openDownload,
  navigation,
  reloadRef,
  onLocalStatusUpdate,
}) => {

  const token = useSelector((state) => state.auth.token);

  const [activeTab, setActiveTab] = useState(null);
  const [tabDetails, setTabDetails] = useState([]);
  const [loading, setLoading] = useState(false);

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

      // Keep old data until new arrives → reduces flicker
      setTabDetails(prev => prev);

      const res = await api.get(`/scheduling/tab/${tabId}/details`, {
        headers: { authorization: `bearer ${token}` },
      });

      setTabDetails(res.data?.data?.tasks || []);
    } catch (err) {
      console.log("TAB DETAILS ERROR:", err);
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


  // 5️⃣ UI INSTANT UPDATE (No API wait)
  const updateStatusLocally = (taskId, newStatus) => {
    setTabDetails((prev) =>
      prev.map((item) =>
        item.taskId === taskId ? { ...item, status: newStatus } : item
      )
    );

    if (onLocalStatusUpdate) {
      onLocalStatusUpdate(taskId, newStatus);
    }
  };


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
    };
    return map[status] || "Not Set";
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "READY_TO_START":
        return { bg: "#3982f62e", border: "#3B82F6", text: "#3B82F6" };
      case "IN_PROGRESS":
        return { bg: "#f59f0b40", border: "#F59E0B", text: "#F59E0B" };
      case "COMPLETED":
      case "DONE":
        return { bg: "#22c55e41", border: "#22C55E", text: "#22C55E" };
      case "PENDING_APPROVAL":
        return { bg: "#eab30833", border: "#eab308", text: "#eab308" };
      default:
        return { bg: "#e5e5e5", border: "#999", text: "#666" };
    }
  };


  // ⭐ Single Item Component
  const MobilizeItem = ({ item }) => {
    const statusStyle = getStatusStyles(item.status);

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("TaskDetails", {
            id: item.taskId,
            title: item.name,
            actualTimeline: item.actualTimeline,
            plannedTimeline: item.plannedTimeline,
          })
        }
      >
        <View style={styles.card}>

          {/* Title Row */}
          <View style={styles.row}>
            <Text style={[styles.title, { flexShrink: 1 }]} numberOfLines={2}>
              {item.name}
            </Text>

            <View style={styles.iconRow}>
              <TouchableOpacity style={styles.iconCirclePurple} onPress={openComments}>
                <IMAGE.MESSAGE width={25} height={25} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconCircleYellow} onPress={openUpload}>
                <IMAGE.FILE width={25} height={25} />
              </TouchableOpacity>
            </View>
          </View>


          {/* Actual */}
          <View style={styles.timelineRow}>
            <Feather name="calendar" size={18} color={Colors.textMedium} />
            <Text style={styles.timelineLabel}>Actual Timeline: </Text>
            <Text style={styles.timelineValue}>{formatRange(item.actualTimeline)}</Text>
          </View>

          {/* Planned */}
          <View style={styles.timelineRow}>
            <Feather name="calendar" size={18} color="#0d00ff" />
            <Text style={styles.linkText}>{formatRange(item.plannedTimeline)}</Text>
          </View>


          <View style={styles.divider} />

          {/* Status Button */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
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
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnFilled}>
              <Text style={styles.btnFilledText}>
                {item.status === "DONE" ? "Approved" : "Approve"}
              </Text>
              <Feather name="chevron-down" size={18} color="#fff" />
            </TouchableOpacity>
          </View>

        </View>
      </TouchableOpacity>
    );
  };


  // ⭐ Final Return UI
  return (
    <View>
      {/* Search */}
      <View style={styles.rowBetween}>
        <View style={styles.searchBox}>
          <Feather name="search" size={18} color="#666" />
          <TextInput
            style={[styles.searchInput, { color: "black" }]}
            placeholder="Search"
            placeholderTextColor={Colors.black}
          />
        </View>

        <TouchableOpacity style={styles.downloadBtn} onPress={openDownload}>
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
            onPress={() => setActiveTab(t.tabId)}
          >
            <Text style={[styles.tabText, activeTab === t.tabId && { color: Colors.primary }]}>
              {t.elevatorKey}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Assign */}
      <TouchableOpacity style={styles.assignBox}>
        <Feather name="plus-circle" size={25} color={Colors.primary} />
        <Text style={styles.assignText}>Assign Mechanic</Text>
      </TouchableOpacity>

      {/* List */}
      <FlatList
        data={tabDetails}
        keyExtractor={(i) => i._id}
        renderItem={({ item }) => <MobilizeItem item={item} />}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="small" color={Colors.primary} style={{ padding: 20 }} />
          ) : null
        }
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </View>
  );
};


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



assignBox: {
  marginHorizontal: moderateScale(12),
  marginTop: verticalScale(15),

  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",

  height: verticalScale(45),        // 🔥 FIXED PERFECT HEIGHT  
  paddingHorizontal: moderateScale(14),

  borderRadius: moderateScale(40),  // 🔥 Perfect pill shape
  borderWidth: moderateScale(1),
  borderColor: "#fe7c63",

  backgroundColor: Colors.primaryLight,
},

assignText: {
  marginLeft: moderateScale(8),
  color: "#fe694c",
  fontSize: fontScale(14),
  fontWeight: "600",
},

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
  borderRadius: moderateScale(Radius.md),

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
  borderRadius: moderateScale(Radius.md),
  backgroundColor: Colors.green,

  paddingHorizontal: moderateScale(10),
},

btnFilledText: {
  color: "#fff",
  fontSize: fontScale(13),
  marginRight: scale(6),
  fontWeight: "600",
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





//   import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Keyboard,
//   Platform,ScrollView
// } from "react-native";
// import { Modalize } from "react-native-modalize";
// import Feather from "react-native-vector-icons/Feather";
// import Colors from "../../constants/Colors";
// import D, {
//   moderateScale,
//   scale,
//   verticalScale,
//   fontScale,
//   Spacing,
//   Radius,
//   SCREEN_HEIGHT,
//   SCREEN_WIDTH,
// } from "../../constants/Dimmence";
// import api from "../../config/api";
// import { useSelector } from "react-redux";

// const Comments = React.forwardRef(({ taskId}, ref) => {

//   //const taskId ="6933df2e11813e6ca934c91a"
// console.log('taskid',taskId)

// const scrollRef = useRef(null);

// const scrollToBottom = () => {
//   if (scrollRef.current) {
//     scrollRef.current.scrollToEnd({ animated: true });
//   }
// };

//   const token = useSelector((state) => state.auth.token);
// const user = useSelector((state) => state.auth.user);

// const loggedInUser = useSelector(state => state.auth.user);
// const loggedInUserId = loggedInUser?._id;


//   const [comment, setComment] = useState("");
//   const [keyboardHeight, setKeyboardHeight] = useState(0);

//   const [comments, setComments] = useState([]);

//   const [loading, setLoading] = useState(false);

// console.log(comments)
//   const modalRef = useRef(null);

//   // ⭐ 1️⃣ API → GET All Comments
// const fetchComments = async () => {
//   if (!taskId) return;

//   try {
//     setLoading(true);

//     const res = await api.post(
//       "/scheduling/task-comment/read",
//       { taskId },
//       { headers: { authorization: `bearer ${token}` } }
//     );

//     const list = res?.data?.data?.comments || [];
//     setComments(list);

//     // 🔥 Auto Scroll after comments load
//     setTimeout(() => {
//       scrollToBottom();
//     }, 100);

//   } catch (err) {
//     console.log("GET COMMENTS ERROR:", err.response?.data || err.message);
//   } finally {
//     setLoading(false);
//   }
// };





//   // ⭐ Modal open hone par comments load karega
// useEffect(() => {
//   if (!ref?.current) return;

//   const originalOpen = ref.current.open;

//   ref.current.open = () => {
//     originalOpen(); 
// fetchComments();
  
//   };
// }, [taskId]);


//   // ⭐ Keyboard listener
//   useEffect(() => {
//     const showSub = Keyboard.addListener(
//       Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
//       (e) => setKeyboardHeight(e.endCoordinates.height)
//     );

//     const hideSub = Keyboard.addListener(
//       Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
//       () => setKeyboardHeight(0)
//     );

//     return () => {
//       showSub.remove();
//       hideSub.remove();
//     };
//   }, []);

//   // ⭐ 2️⃣ SEND COMMENT → POST API
//   const sendComment = async () => {
//   if (!comment.trim()) return;

//   const msg = comment;
//   setComment("");

//   try {
//     await api.post(
//       "/scheduling/task-comment",
//       {
//         taskId,
//         comment: msg,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `bearer ${token}`,
//         },
//       }
//     );

//     // 🔥 Backend se fresh comments load karo
//     fetchComments();

//   } catch (err) {
//     console.log("SEND COMMENT ERROR:", err.response?.data || err.message);
//   }
// };

// const getInitials = (name = "") => {
//   if (!name) return "U";

//   const parts = name.trim().split(" ");
  
//   if (parts.length === 1) {
//     return parts[0].charAt(0).toUpperCase();
//   }

//   return (
//     parts[0].charAt(0).toUpperCase() +
//     parts[parts.length - 1].charAt(0).toUpperCase()
//   );
// };

// const timeAgo = (dateString) => {
//   const now = new Date();
//   const messageTime = new Date(dateString);
//   const diffMs = now - messageTime;

//   const diffSec = Math.floor(diffMs / 1000);
//   const diffMin = Math.floor(diffSec / 60);
//   const diffHr = Math.floor(diffMin / 60);
//   const diffDay = Math.floor(diffHr / 24);
//   const diffWeek = Math.floor(diffDay / 7);

//   if (diffSec < 10) return "Just now";
//   if (diffSec < 60) return `${diffSec} sec ago`;
//   if (diffMin < 60) return `${diffMin} min ago`;
//   if (diffHr < 24) return `${diffHr} hrs ago`;
//   if (diffDay === 1) return "Yesterday";
//   if (diffDay < 7) return `${diffDay} days ago`;
//   if (diffWeek === 1) return "Last week";

//   return messageTime.toLocaleDateString();
// };

//   return (
//     <Modalize
//       ref={ref}
//       modalHeight={500}
//       modalStyle={styles.modal}
//       HeaderComponent={
//         <View style={styles.headerRow}>
//           <Text style={styles.heading}>Comments</Text>
//         </View>
//       }
//       FooterComponent={
//         <View style={styles.inputBox}>
//           <TextInput
//             placeholder="Add your comment"
//             value={comment}
//             onChangeText={setComment}
//             style={styles.input}
//             placeholderTextColor="#777"
//           />

//           <TouchableOpacity style={styles.sendBtn} onPress={sendComment}>
//             <Feather name="send" size={20} color="#fff" />
//           </TouchableOpacity>
//         </View>
//       }
//     >
// <ScrollView
//   ref={scrollRef}
//   onContentSizeChange={scrollToBottom}
//   style={{ paddingBottom: 150 }}
// >

//   {/* 1️⃣ LOADING → only skeleton show */}
//   {loading && (
//     <View style={{ padding: 20 }}>
//       {[1, 2, 3].map((i) => (
//         <View key={i} style={styles.skeletonItem}>
//           <View style={styles.skeletonAvatar} />
//           <View style={styles.skeletonLineBox}>
//             <View style={styles.skeletonLineShort} />
//             <View style={styles.skeletonLineLong} />
//           </View>
//         </View>
//       ))}
//     </View>
//   )}

//   {/* 2️⃣ EMPTY COMMENTS → only when NOT loading */}
//   {!loading && comments.length === 0 && (
//     <View style={styles.noCommentBox}>
//       <Feather name="message-circle" size={40} color="#999" />
//       <Text style={styles.noCommentText}>No comments yet</Text>
//       <Text style={styles.noCommentSub}>Be the first to add a comment</Text>
//     </View>
//   )}

//   {/* 3️⃣ COMMENTS LIST */}
//   {!loading && comments.length > 0 &&
//   comments.map((item) => {

//     // ⭐ CHECK: kya yeh comment logged-in user ka hai?
//     const isMe = item.userId === loggedInUserId;

//     return (
//       <View key={item._id} style={styles.commentRow}>

//         {/* Avatar & Name */}
//         <View style={styles.row}>
//           <View
//             style={[
//               styles.initialAvatar,
//               isMe ? styles.myAvatarBg : styles.otherAvatarBg
//             ]}
//           >
//             <Text style={styles.initialText}>
//               {getInitials(item.name)}
//             </Text>
//           </View>

//           <Text style={styles.name}>{item.name}</Text>
//         </View>

//         {/* Comment Bubble */}
//         <View style={styles.commentCard}>
//           <Text style={styles.msg}>{item.comment}</Text>
//         </View>

//         {/* Time */}
//         <Text style={styles.time}>{timeAgo(item.createdAt)}</Text>

//       </View>
//     );
//   })
// }


// </ScrollView>

//     </Modalize>
//   );
// });

// export default Comments;



// const styles = StyleSheet.create({
//   modal: {
//     paddingTop: verticalScale(5),
//     backgroundColor: "#ffffff",
//   },

//   headerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: moderateScale(15),
//     paddingVertical: verticalScale(12),
//     borderBottomWidth: 1,
//     borderColor: Colors.border,
//   },

//   heading: {
//     fontSize: fontScale(18),
//     fontWeight: "700",
//     color: "#000",
//   },

//   commentRow: {
//     marginBottom: verticalScale(5),
//     paddingHorizontal: moderateScale(15),
//   },

//   row: {
//     top:5,
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: verticalScale(1),
//   },

//   avatar: {
//     width: scale(35),
//     height: scale(35),
//     borderRadius: scale(20),
//     marginRight: moderateScale(10),
//   },

//   name: {
//     fontSize: fontScale(15),
//     fontWeight: "700",
//   },
// myAvatarBg: {
//   backgroundColor: "#4CAF50", // logged-in user
// },

// otherAvatarBg: {
//   backgroundColor: "#FD6339", // others
// },

//   commentCard: {
    
//     marginLeft: moderateScale(45),
//     backgroundColor: "#fff",
//     padding: moderateScale(15),
//     borderRadius: Radius.md,
//     borderWidth: 1,
//     borderColor: Colors.border,
//   },

//   msg: {
//     fontSize: fontScale(14),
//     color: "#333",
//   },

//   time: {
//     fontSize: fontScale(12),
//     color: "#777",
//     marginTop: verticalScale(5),
//     marginLeft: moderateScale(55),
//   },

//   // ⭐ BOTTOM INPUT (Keyboard Safe)
//   inputBox: {
//     //position: "absolute",
//     // left: moderateScale(10),
//     // right: moderateScale(10),
//     marginHorizontal:10,
//     backgroundColor: "#fff",
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: verticalScale(5),
//     paddingHorizontal: moderateScale(15),
//     borderRadius: Radius.md,
//     borderWidth: 1,
//     borderColor: Colors.border,
//     marginBottom: verticalScale(20),
//   },

//   input: {
//     flex: 1,
//     fontSize: fontScale(14),
//     color: "#000",
//     paddingRight: moderateScale(10),
//   },

//   sendBtn: {
//     width: scale(40),
//     height: scale(40),
//     backgroundColor: Colors.primary,
//     borderRadius: scale(20),
//     justifyContent: "center",
//     alignItems: "center",
//   },

// initialAvatar: {
//   width: 42,
//   height: 42,
//   borderRadius: 21,
//   justifyContent: "center",
//   alignItems: "center",
//   marginRight: 10,
// },

// myAvatarBg: {
//  // Logged-in user color
//   backgroundColor: "#FD6339",
// },

// otherAvatarBg: {
//    backgroundColor: "#4CAF50",  // Other user's color
// },

// initialText: {
//   color: "#fff",
//   fontSize: 16,
//   fontWeight: "700",
// },


// ///////
// noCommentBox: {
//   alignItems: "center",
//   justifyContent: "center",
//   marginTop: 50,
//   paddingHorizontal: 20,
// },

// noCommentText: {
//   fontSize: fontScale(16),
//   fontWeight: "700",
//   color: "#555",
//   marginTop: 10,
// },

// noCommentSub: {
//   fontSize: fontScale(13),
//   color: "#777",
//   marginTop: 5,
// },


// ////////////////

// skeletonItem: {
//   flexDirection: "row",
//   alignItems: "center",
//   marginBottom: 20,
// },

// skeletonAvatar: {
//   width: 40,
//   height: 40,
//   borderRadius: 20,
//   backgroundColor: "#e5e5e5",
//   marginRight: 10,
// },

// skeletonLineBox: {
//   flex: 1,
// },

// skeletonLineShort: {
//   width: "30%",
//   height: 10,
//   backgroundColor: "#e5e5e5",
//   borderRadius: 5,
//   marginBottom: 8,
// },

// skeletonLineLong: {
//   width: "80%",
//   height: 10,
//   backgroundColor: "#e5e5e5",
//   borderRadius: 5,
// },

// noCommentBox: {
//   alignItems: "center",
//   justifyContent: "center",
//   marginTop: 50,
// },

// noCommentText: {
//   fontSize: fontScale(16),
//   fontWeight: "700",
//   color: "#555",
//   marginTop: 10,
// },

// noCommentSub: {
//   fontSize: fontScale(13),
//   color: "#777",
//   marginTop: 5,
// },

// });
