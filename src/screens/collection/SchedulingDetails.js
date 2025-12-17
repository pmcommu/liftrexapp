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
  TextInput,FlatList,Animated,Platform, ToastAndroid, Alert,PermissionsAndroid
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
import AssignMechanicModal from '../../componests/scheduling/AssignMechanicModal'
import { RectButton } from "react-native-gesture-handler";
import ApprovalRejectModal from '../../componests/scheduling/ApprovalRejectModal'
import SchedulingUpload from '../../componests/scheduling/SchedulingUpload';

import { clearSelectedTask } from "../../redux/Slices/selectedTaskSlice";
import SiteManagerModal from '../../componests/scheduling/AssignSiteManagerModal'
export default function SchedulingDetails({ navigation, route }) {


  ////////////// permisssion for anmdoridc//////////////////



  const requestCameraPermission = async () => {
  if (Platform.OS !== "android") return true;

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
    {
      title: "Camera Permission",
      message: "App needs camera access to take pictures",
      buttonPositive: "OK",
      buttonNegative: "Cancel",
    }
  );

  return granted === PermissionsAndroid.RESULTS.GRANTED;
};



  const token = useSelector(state => state.auth.token);
const { tabId, taskId, status: currentStatus } = useSelector(
  (state) => state.selectedTask
);


const reloadRef = useRef(null);

const hasFetchedRef = useRef(false);

 
 const [checklistItems, setChecklistItems] = useState([]);

const [uploadKey, setUploadKey] = useState(0);
const [selectedImage, setSelectedImage] = useState(null);
const [showUpload, setShowUpload] = useState(false);

const [schedulUpload, setSchedulUpload] = useState(false);

   const selected = useSelector(state => state.scheduling.selectedSchedule);


console.log('selected',selected)

  const bottomSheetRef = useRef(null);
const commentsRef = useRef(null);
const documentRef = useRef(null);
const assignRef = useRef(null);
const siteassignRef = useRef(null);
const approveRejectRef = useRef(null);


const [mechanics, setMechanics] = useState([]);
const [mechanicLoading, setMechanicLoading] = useState(false);



  const [showProjectModal, setShowProjectModal] = useState(false);
const [details, setDetails] = useState({});

  // Dummy list for Scheduling Tasks
  const taskList = [
    { id: "1", title: "Mobilize Team" },
   
  ];


  // ⭐ Scheduling level upload open
const openSchedulingUpload = (tabId) => {
  setSelectedCard({ tabId });      // sirf scheduling context
  setSelectedImage(null);          // fresh image
  setSchedulUpload(true);             // SchedulingUpload modal
};


  const [selectedCard, setSelectedCard] = useState(null);

console.log('selectedcard',selectedCard)
const pickImage = () => {
  return new Promise((resolve) => {
    launchImageLibrary({ mediaType: "photo", quality: 0.9 }, (res) => {
      if (!res.didCancel && !res.errorCode) {
        setSelectedImage(res.assets[0]);   // ⭐ save image
        resolve(res.assets[0]);
      } else {
        resolve(null);
      }
    });
  });
};

const pickImageFromGallery = () => {
  return new Promise((resolve) => {
    launchImageLibrary(
      { mediaType: "photo", quality: 0.9 },
      (res) => {
        if (!res.didCancel && !res.errorCode && res.assets?.length) {
          setSelectedImage(res.assets[0]);
          resolve(res.assets[0]);
        } else {
          resolve(null);
        }
      }
    );
  });
};

const pickImageFromCamera = async () => {
  const hasPermission = await requestCameraPermission();
  if (!hasPermission) return null;

  return new Promise((resolve) => {
    launchCamera(
      {
        mediaType: "photo",
        cameraType: "back",
        quality: 0.9,
        saveToPhotos: true,
      },
      (res) => {
        if (!res?.didCancel && !res?.errorCode && res.assets?.length) {
          setSelectedImage(res.assets[0]);
          resolve(res.assets[0]);
        } else {
          resolve(null);
        }
      }
    );
  });
};

const pickoptionImage = async (type) => {
  // 1️⃣ Modal close
 // setShowUpload(false);

  // 2️⃣ Modal animation finish hone do
  setTimeout(async () => {
    if (type === "camera") {
      await pickImageFromCamera();
    } else {
      await pickImageFromGallery();
    }
  }, 400); // ⏱️ MUST
};



const openTaskUpload = () => {
  console.log("UPLOAD OPEN", showUpload);
  setShowUpload(true);
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



const showToast = (message) => {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert("Message", message);
  }
};


const fetchMechanics = async () => {
  try {
    setMechanicLoading(true);

    const res = await api.get("/user/registered-users", {
      headers: { authorization: `bearer ${token}` },
    });

    let list =
      res.data?.data?.users ||
      res.data?.data?.items ||
      res.data?.data?.results ||
      (Array.isArray(res.data?.data) ? res.data.data : []) ||
      [];

    setMechanics(list);
  } catch (err) {
    console.log("MECHANIC FETCH ERROR:", err.response?.data || err.message);
  } finally {
    setMechanicLoading(false);
  }
};


useEffect(() => {
  fetchMechanics();
}, []);

const handleDocSubmit = async (image) => {
  if (!image) return;

  try {
    console.log("Selected Image:", image);

    const docUrl = image.uri;
    console.log("Final DocURL:", docUrl);

    // 1️⃣ Upload document
    const res = await api.post(
      "/scheduling/proposal-tab/task-doc",
      {
        tabId: tabId,
        taskId: taskId,
        docUrl: docUrl,
      },
      {
        headers: { authorization: `bearer ${token}` },
      }
    );

    console.log("DOC UPLOADED ✔", res.data);

    // 2️⃣ Update task status → PENDING_APPROVAL
    await api.put(
      "/scheduling/proposal-tab/task-status",
      {
        tabId: tabId,
        taskId: taskId,
        status: "PENDING_APPROVAL",
      },
      {
        headers: { authorization: `bearer ${token}` },
      }
    );

    // ✅ Success Toast
    showToast("Document uploaded & sent for approval");

    // ✅ Cleanup UI
    setShowUpload(false);
    setSelectedImage(null);

    // ✅ Reload task list
    reloadRef.current?.(tabId);

  } catch (err) {
    console.log("UPLOAD DOC ERROR:", err.response?.data || err.message);

    // ❌ Error Toast
    showToast(
      err.response?.data?.message || "Document upload failed ❌"
    );
  }
};


const handleApprove = async () => {
  try {
    const res = await api.put(
      "/scheduling/proposal-tab/task-doc/approve-reject",
      {
        tabId: selectedCard.tabId,
        taskId: selectedCard.taskId,
        docId: selectedCard.docId,
        action: "APPROVE",
      },
      {
        headers: { authorization: `bearer ${token}` },
      }
    );

    console.log("APPROVED ✔", res.data);

    showToast("Document approved successfully");

    reloadRef.current?.(selectedCard.tabId);

  } catch (err) {
    console.log("APPROVE ERROR:", err.response?.data || err.message);

    showToast(
      err.response?.data?.message || "Approval failed ❌"
    );
  }
};

const handleReject = async () => {
  try {
    const res = await api.put(
      "/scheduling/proposal-tab/task-doc/approve-reject",
      {
        tabId: selectedCard.tabId,
        taskId: selectedCard.taskId,
        docId: selectedCard.docId,
        action: "REJECT",
      },
      {
        headers: { authorization: `bearer ${token}` },
      }
    );

    console.log("REJECTED ✔", res.data);

    showToast("Document rejected successfully ❌");

    reloadRef.current?.(selectedCard.tabId);

  } catch (err) {
    console.log("REJECT ERROR:", err.response?.data || err.message);

    showToast(
      err.response?.data?.message || "Rejection failed ❌"
    );
  }
};


const handleSchedulingDrawingUpload = async (image) => {
  if (!image) return;

  try {
    const docUrl = image.uri;

    const res = await api.post(
      "/scheduling/doc",
      {
        schedulingId: selected?.id || selected?._id,
        target: "drawings",
        docUrl: docUrl,
      },
      {
        headers: { authorization: `bearer ${token}` },
      }
    );

    console.log("DRAWING UPLOADED ✔", res.data);

    // ✅ Success Toast
    showToast("Drawing uploaded successfully");

    // ✅ Cleanup
    setSelectedImage(null);
    setSchedulUpload(false);

  } catch (err) {
    console.log(
      "SCHEDULING DRAWING ERROR:",
      err.response?.data || err.message
    );

    // ❌ Error Toast
    showToast(
      err.response?.data?.message || "Drawing upload failed ❌"
    );
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
<RectButton
  rippleColor="#d1d1d1"
  onPress={() => {
    setDetails(selected);
    setShowProjectModal(true);
  }}
  style={styles.iconWrapper}  // ⭐ big touch area
>
  <IMAGE.ARROW width={22} height={25} />
</RectButton>

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

         



            {/* Section Title */}
            {/* <Text style={styles.taskTitle}>Scheduling Tasks</Text> */}
          </>
        }

        // ---------- FlatList Row Render ----------
      renderItem={({ item }) => (
<MobilizeCard
  navigation={navigation}
  reloadRef={reloadRef}

  openSheet={(tabId, taskId, status) => {
    bottomSheetRef.current.open();
   ///setSelectedCard({ tabId, taskId, currentStatus: status });
    
  }}

openApproveReject={(tabId, task, pendingDoc) => {
  setSelectedCard({
    tabId,
    taskId: task.taskId,
    docId: pendingDoc._id,     
    taskName: task.name,
    docs: task.docs
  });

  approveRejectRef.current?.open();
}}



openComments={(tabId, taskId) => {
  setSelectedCard({ tabId, taskId });
    commentsRef.current?.open();

}}


 openUpload={(tabId, taskId) => {
  // setSelectedCard({ tabId, taskId });
  // setSelectedImage(null);        // ✅ clear image
  // setUploadKey(prev => prev + 1); // ✅ FORCE RESET
  setShowUpload(true);
}}

openSchedulingUpload={(tabId) => {
    openSchedulingUpload(tabId);
  }}


 openDownload={(tabId, task) => {
  setSelectedCard({
    tabId: tabId,
    taskId: task.taskId,
    docs: task.docs || [],
    taskName: task.name
  });

  documentRef.current?.open(); 
}}

  openAssignMechanic={(tabId) => {
     setSelectedCard({ tabId });      // ⭐ store tabId safely
  assignRef.current?.open();  
  }}

  openAssignSiteManager={() => {
    //  setSelectedCard({ tabId });      // ⭐ store tabId safely
  siteassignRef.current?.open();  
  }}


  onLocalStatusUpdate={(taskId, newStatus) => {
    setSelectedCard(selectedCard?.tabId, taskId, newStatus);
  }}
/>




)}

      />

<BottomSheet
  ref={bottomSheetRef}
  title="Update Status"
  options={STATUS_OPTIONS}
  reloadRef={reloadRef}
  onOpenUpload={() => {
    openTaskUpload();   // 👈 no args
  }}
/>


<ApprovalRejectModal
  ref={approveRejectRef}
  onApprove={handleApprove}
  onReject={handleReject}
/>



<Comments ref={commentsRef} 

taskId={selectedCard?.taskId}
tabId={selectedCard?.tabId}
/>



      <SchedulDetailsModel
       visible={showProjectModal}
  onClose={() => setShowProjectModal(false)}
  data={details}
      />

<UploadPictureModal
  visible={showUpload}
  key={uploadKey}
  image={selectedImage}
  onUploadPress={(type) => pickoptionImage(type)}   // 🔥 UPDATE
  onSubmit={handleDocSubmit}
  onRemoveImage={() => setSelectedImage(null)}
  onClose={() => {
    setShowUpload(false);
    setSelectedImage(null);
  }}
/>


<SchedulingUpload
  visible={schedulUpload}
  image={selectedImage}

  onSchedulPress={pickImage}                 // ⭐ renamed
  onSubmit={handleSchedulingDrawingUpload}   // ⭐ NEW API
  onRemoveImage={() => setSelectedImage(null)}

  onClose={() => {
    setSchedulUpload(false);
    setSelectedImage(null);
  }}
/>



<DownloadDocuments
  ref={documentRef}
  onDownload={(label) => console.log("Downloading:", label)}
  taskId={selectedCard?.taskId}
tabId={selectedCard?.tabId}
docs={selectedCard?.docs}
/>


<AssignMechanicModal
  ref={assignRef}
   tabId={selectedCard?.tabId}
    mechanics={mechanics}
  loading={mechanicLoading}
  onAssign={(selectedMechanics) => {
    console.log("Assigned Mechanic IDs:", selectedMechanics);
    assignRef.current.close();
  }}
/>


<SiteManagerModal
  ref={siteassignRef}
   tabId={selectedCard?.tabId}
    mechanics={mechanics}
  loading={mechanicLoading}
  onAssign={(selectedMechanics) => {
    console.log("Assigned Mechanic IDs:", selectedMechanics);
    siteassignRef.current.close();
  }}
/>

    </View>
  );
}



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

  iconWrapper: {
  paddingBottom: 12, 
  paddingLeft:10,                 // ⭐ increases touch area
             // smooth rounded feeling
 // justifyContent: "center",
  //alignItems: "center",
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
