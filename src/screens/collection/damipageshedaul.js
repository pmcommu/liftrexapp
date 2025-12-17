// import React, { useState ,useRef} from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   TextInput,
// } from "react-native";
// import CustomHeader from "../../componests/all/CustomHeader";
// import Feather from "react-native-vector-icons/Feather";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// import ProgressBar from "../../componests/all/ProgressBar";
// import {
//   moderateScale,
//   verticalScale,
//   Radius,
//   Spacing,
//   fontScale,
// } from "../../constants/Dimmence";
// import Colors from "../../constants/Colors";
// import * as IMAGE from "../../assets/svg/index";
// import MobilizeCard from '../../componests/scheduling/MobilizeCard';

// import BottomSheet from '../../componests/scheduling/BottomSheet'
// export default function SchedulingDetails({ navigation,route }) {

//    const { item } = route.params;
//  const bottomSheetRef = useRef(null);
// const [selectedAction, setSelectedAction] = useState("");

//   return (
//     <View style={styles.container}>
//       <CustomHeader
//         title="Scheduling Details"
//         onBackPress={() => navigation.goBack()}
        
//       />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 100 }}
//       >
//         {/* 🔶 HEADER CARD */}
//         <View style={styles.card}>
//          <View style={styles.cardHeader}>
  
//   {/* LEFT SIDE: Icon + (Code + Address) */}
//   <View style={styles.headerLeft}>
//     <IMAGE.FOLDER width={28} height={28} />

//     <View style={styles.headerTextBox}>
//       <Text style={styles.codeText}>{item.code}</Text>
//       <Text style={styles.address}>{item.address}</Text>
//     </View>
//   </View>

//   {/* Right: Menu Icon */}
//     <IMAGE.ARROW width={28} height={28} />
// </View>
// <View style={styles.addressSeparator} />
//           {/* Status */}
//           <View style={styles.statusHeader}>
//             <Text style={styles.statusLabel}>Status</Text>
//             <Text style={styles.statusText}>In Progress</Text>
//           </View>

  
//           <ProgressBar progress={0.65} />
//         </View>


//         {/* Checklist */}

//              <View style={styles.card}>
//        <View style={styles.sectionHeader}>
//         <Feather name="chevron-right" size={20} color="#555" />
//   <Text style={styles.sectionTitle}>Pre Installation Checklist</Text>
  
// </View>
// <View style={styles.addressSeparator} />

//         <View style={styles.checklistCard}>
//           {checkItem("Civil Work Readiness", true)}
//           {checkItem("Pit Conditions", true)}
//           {checkItem("Power & Electrical Requirements", false)}
//           {checkItem("Machine Room (MR/MRL) Readiness", false)}
//         </View>

// </View>
//         {/* Scheduling Tasks */}
//         <Text style={styles.taskTitle}>Scheduling Tasks</Text>

//         {/* Search + Download */}
     
//         {/* Tabs */}


// <MobilizeCard 
//    openSheet={() => bottomSheetRef.current.open()}
//    selectedAction={selectedAction}
// />

       

     

//       </ScrollView>

//         <BottomSheet
//   ref={bottomSheetRef}
//   title="Update Status"
//   options={[
//     "Ready to Start",
//     "In Progress",
//     "Done",
    
//   ]}
//   onSelect={(val) => {
//     setSelectedAction(val);  
//     console.log("Selected:", val);
//   }}
// />
//     </View>
//   );
// }

// /* Reusable checklist row */
// const checkItem = (label, checked) => (
//   <View style={styles.checkRow}>
// <MaterialIcons
//   name={checked ? "check-box" : "check-box-outline-blank"}
//   size={24}
//   color={checked ? Colors.primary : "#999"}
// />

//     <Text style={styles.checkText}>{label}</Text>
//   </View>
// );


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//   },

//     addressSeparator: {
  
//     height: 1,
//     backgroundColor: "#E5E5E5",
//     marginTop: moderateScale(6),
//     marginBottom: moderateScale(2),
   
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: Radius.lg,
//     marginVertical: Spacing.sm,
//     marginHorizontal:Spacing.md,
//     padding: Spacing.md,
//     borderWidth:0.8,
//     borderColor:Colors.border,
//   //  elevation: 3,
//   },
// cardHeader: {
//   flexDirection: "row",
//   justifyContent: "space-between",
//   alignItems: "flex-start",
// },

// headerLeft: {
//   flexDirection: "row",
//   alignItems: "flex-start",
//   flex: 1,
// },

// headerTextBox: {
//   marginLeft: 10,
//   flexShrink: 1,
// },

//   codeText: {
//     fontSize: fontScale(15),
//     fontWeight: "600",
//     //marginLeft: 8,
//   },

//   address: {
//     marginTop: 5,
//     fontWeight: "700",
//     fontSize: fontScale(14),
//   },

// statusHeader: {
//   flexDirection: "row",
//   justifyContent: "space-between",
//   alignItems: "center",
//   marginTop: 16,
//   marginVertical:Spacing.md
// },

// statusLabel: {
//   fontSize: 13,
//   color: "#333",
//   fontWeight: "500",
// },

// statusText: {
//   fontSize: 13,
//   fontWeight: "700",
//   color: "#2563EB",
//   textAlign: "right",
// },

// sectionHeader: {
//   flexDirection: "row",

//   alignItems: "center",
  
//   paddingVertical: Spacing.sm,
// },

//   sectionTitle: {
//     fontSize: fontScale(16),
//     fontWeight: "700",
//    // marginTop: 20,
//     marginLeft: Spacing.sm,
//   },

//   checklistCard: {
//     backgroundColor: "#fff",
//     margin: Spacing.md,
//     //padding: Spacing.md,
//     borderRadius: Radius.lg,
//   },

//   checkRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 6,
//   },

//   checkText: {
//     marginLeft: 10,
//     fontSize: fontScale(14),
//   },



//   ///------  /////// task schdual/////
//    taskTitle: {
//     fontSize: fontScale(19),
//     fontWeight: "500",
//    // marginTop: 20,
//     marginLeft: Spacing.md,
//   },

//   ////////------ rab row---------



// });




import React, { useState ,useRef,useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,FlatList,Animated
} from "react-native";
import CustomHeader from "../../componests/all/CustomHeader";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import ProgressBar from "../../componests/all/ProgressBar";
import {
  moderateScale,
  verticalScale,
  Radius,
  Spacing,
  fontScale
} from "../../constants/Dimmence";
import Colors from "../../constants/Colors";
import * as IMAGE from "../../assets/svg/index";
import MobilizeCard from '../../componests/scheduling/MobilizeCard';

import BottomSheet from '../../componests/scheduling/BottomSheet'
import SchedulDetailsModel from '../../componests/scheduling/SchedulDetailsModel'
import Comments from '../../componests/scheduling/comments'
import UploadPictureModal from '../../componests/scheduling/UploadPictureModal'
import DownloadDocuments from '../../componests/scheduling/DownloadDocuments'
import { useSelector } from "react-redux";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import api from "../../config/api";

export default function SchedulingDetails({ navigation, route }) {

  const token = useSelector(state => state.auth.token);

const reloadRef = useRef(null);


 const [schedulingdetails, setSchedulingDetails] = useState([]);
 const [checklistItems, setChecklistItems] = useState([]);

  const [loading, setLoading] = useState(true);
const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

console.log('chceklist',checklistItems)

//   const checklistItems = [
//   { label: "Civil Work Readiness", checked: true },
//   { label: "Pit Conditions", checked: true },
//   { label: "Power & Electrical Requirements", checked: true },
//   { label: "Machine Room Readiness", checked: true },
// ];

const allChecked = checklistItems.every(item => item.isChecked === true);



  // const { item } = route.params;
   const selected = useSelector(state => state.scheduling.selectedSchedule);


console.log('selected',selected)
   console.log('data',schedulingdetails)
  const bottomSheetRef = useRef(null);
const commentsRef = useRef(null);
const documentRef = useRef(null);



const [showUpload, setShowUpload] = useState(false);

  const [selectedAction, setSelectedAction] = useState("");

  const [showProjectModal, setShowProjectModal] = useState(false);
const [details, setDetails] = useState({});

  // Dummy list for Scheduling Tasks
  const taskList = [
    { id: "1", title: "Mobilize Team" },
   
  ];

  const [selectedCard, setSelectedCard] = useState(null);
  const statusUpdateRef = useRef(null); 

  console.log('selectcard',selectedCard)

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

const pickImage = () => {
  return new Promise((resolve) => {
    launchImageLibrary(
      { mediaType: "photo", quality: 0.9 },
      (res) => {
        if (!res.didCancel && !res.errorCode) {
          resolve(res.assets[0]); // return selected image
        } else {
          resolve(null);
        }
      }
    );
  });
};
const fetchDetails = async () => {
  if (isBottomSheetOpen) {
    console.log("⛔ Prevented API call because BottomSheet is open");
    return;
  }

  if (!selected?.id) {
    console.log("❌ No selected ID found");
    return;
  }

  try {
    const res = await api.get(
      `/scheduling/proposal/${selected.proposalId}/details`,
      {
        headers: { authorization: `bearer ${token}` },
      }
    );

    console.log("Details Response:", res.data);
    setSchedulingDetails(res.data?.data || {});
    setChecklistItems(res.data?.data.preInstallationChecklist || []);

  } catch (err) {
    console.log("DETAILS ERROR:", err.response?.data || err.message);
  } finally {
    setLoading(false);
  }
};



useEffect(() => {
  fetchDetails();
}, []);

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


const getColor = (value) => {
  if (value <= 0.3) return "#4472ef"; // Low
  if (value <= 0.7) return "#F59E0B"; // Medium
  return "#289626";                   // High
};


const STATUS_OPTIONS = [
  { label: "Ready to Start", value: "READY_TO_START" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Done", value: "DONE" }
];

const updateTaskStatus = (tabId, taskId, newStatus) => {
  setSchedulingDetails(prev => ({
    ...prev,
    tabs: prev.tabs.map(tab =>
      tab.tabId === tabId
        ? {
            ...tab,
            tasks: tab.tasks.map(task =>
              task.taskId === taskId
                ? { ...task, status: newStatus }
                : task
            )
          }
        : tab
    )
  }));

  // 🔥 UPDATE SELECTED.STATUS ALSO (Header status change)
  if (selected.taskId === taskId) {
    selected.status = newStatus; // (mutate small object ok)
  }
};


  return (
    <View style={styles.container}>
      <CustomHeader
        title="Scheduling Details"
        onBackPress={() => navigation.goBack()}
      />

      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 120 }}

        // ---------- Header Section ----------
        ListHeaderComponent={
          <>
            {/* Header Card */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.headerLeft}>

                  <IMAGE.FOLDER width={28} height={28} />
                  <View style={styles.headerTextBox}>
                    <Text style={styles.codeText}>{selected.code}</Text>
                    <Text style={styles.address}>{selected.address}</Text>
                  </View>
                </View>
<TouchableOpacity
  onPress={() => {
   setDetails(selected);
setShowProjectModal(true);

  }}
>

                <IMAGE.ARROW width={22} height={25} />
                </TouchableOpacity>
              </View>

              <View style={styles.addressSeparator} />

              <View style={styles.statusHeader}>
                <Text style={styles.statusLabel}>Status</Text>
                <Text style={[styles.statusText, { color: getColor(selected.progress) }]}>
  {selected.status}
</Text>

                {/* <Text style={styles.statusText}>{selected.status}</Text> */}
              </View>

              <ProgressBar progress={selected.progress} />
            </View>

            {/* Checklist */}
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
  <TouchableOpacity
    key={item._id}
    onPress={() => toggleCheckItem(item._id, item.isChecked)}
    activeOpacity={0.7}
  >
    {checkItem(item.title, item.isChecked)}
  </TouchableOpacity>
))}



      </View>
    </>
  )}
</View>



            {/* Section Title */}
            <Text style={styles.taskTitle}>Scheduling Tasks</Text>
          </>
        }

        // ---------- FlatList Row Render ----------
      renderItem={({ item }) => (
<MobilizeCard
  tabs={schedulingdetails.tabs}
  activeTabId={selectedCard?.tabId}  // ⭐ NEW
  onLocalStatusUpdate={(taskId, newStatus) => {
    updateTaskStatus(selectedCard.tabId, taskId, newStatus);
  }}
openSheet={(tabId, taskId, status) => {
  setSelectedCard({ tabId, taskId, currentStatus: status });
  setIsBottomSheetOpen(true);      // ⭐ mark as open
  bottomSheetRef.current.open();
}}


  navigation={navigation}
  reloadRef={reloadRef}
  openComments={() => commentsRef.current.open()}
  openUpload={() => setShowUpload(true)}
  openDownload={() => documentRef.current.open()}
/>




)}

      />

<BottomSheet
  ref={bottomSheetRef}
  title="Update Status"
  options={STATUS_OPTIONS}
  tabId={selectedCard?.tabId}
  onClose={() => setIsBottomSheetOpen(false)}
  taskId={selectedCard?.taskId}
  currentStatus={selectedCard?.currentStatus}   // ⭐ NEW
  onSelect={(obj) => {
    updateTaskStatus(selectedCard.tabId, selectedCard.taskId, obj.value);
  }}
  reloadRef={reloadRef}
/>



<Comments ref={commentsRef} />



      <SchedulDetailsModel
       visible={showProjectModal}
  onClose={() => setShowProjectModal(false)}
  data={details}
      />

<UploadPictureModal
  visible={showUpload}
  onClose={() => setShowUpload(false)}
  onUploadPress={pickImage}
  onSubmit={() => console.log("SUBMIT")}
/>

<DownloadDocuments
  ref={documentRef}
  onDownload={(label) => console.log("Downloading:", label)}
/>


    </View>
  );
}


/* Reusable checklist row */
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




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

    addressSeparator: {
  
    height: 1,
    backgroundColor: "#E5E5E5",
    marginTop: moderateScale(6),
    marginBottom: moderateScale(2),
   
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: Radius.lg,
    marginVertical: Spacing.sm,
    marginHorizontal:Spacing.md,
    padding: Spacing.md,
    borderWidth:0.8,
    borderColor:Colors.border,
   
  //  elevation: 3,
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

});
