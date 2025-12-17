import React, { useState, useRef,useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,Modal
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../../constants/Colors";
import D, {
  moderateScale,
  scale,
  verticalScale,
  fontScale,
  Spacing,
  Radius,
} from "../../constants/Dimmence";
import CustomHeader from "../all/CustomHeader";
import DatePicker from "react-native-date-picker";
import moment from "moment";
// RICH EDITOR
import { RichEditor, RichToolbar, actions } from "react-native-pell-rich-editor";
import DownloadDocuments from "./DownloadDocuments";
import Comments from "./comments";
import api from "../../config/api";
import { useSelector } from "react-redux";
export default function TaskDetails({ navigation,route }) {

   const token = useSelector((state) => state.auth.token);
   const user = useSelector((state) => state.auth.user);
const isAdmin = user?.roleName === "admin";


  const { titlename,tabId, taskId ,actualTimeline,plannedTimeline, docs} = route.params;

  console.log('data',tabId, taskId ,actualTimeline,plannedTimeline,titlename)

    const commentsRef = useRef(null);
    const documentRef = useRef(null);

  const [title, setTitle] = useState("");
  const editorRef = useRef(); // IMPORTANT FIX ✔️


// Actual
const [actualStart, setActualStart] = useState(null); // Date object
const [actualEnd, setActualEnd] = useState(null);
const [plannedStart, setPlannedStart] = useState(null);
const [plannedEnd, setPlannedEnd] = useState(null);


// Picker
const [openPicker, setOpenPicker] = useState(false);
const [currentType, setCurrentType] = useState("");
const [tempDate, setTempDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
useEffect(() => {
  if (titlename) {
    setTitle(titlename);
  }

  if (actualTimeline?.startDate) {
    setActualStart(new Date(actualTimeline.startDate));
    setActualEnd(
      actualTimeline.endDate
        ? new Date(actualTimeline.endDate)
        : null
    );
  }

  if (plannedTimeline?.startDate) {
    setPlannedStart(new Date(plannedTimeline.startDate));
    setPlannedEnd(
      plannedTimeline.endDate
        ? new Date(plannedTimeline.endDate)
        : null
    );
  }
}, []);
// ✅ sirf screen load par


const updateActualTimeline = async () => {
 if (!plannedStart || !plannedEnd) {
  alert("Please select start and end date");
  return;
}

  try {
    setLoading(true);

    const res = await api.put(
      "/scheduling/proposal-tab/task-timeline",
      {
        tabId,
        taskId,
         startDate: moment(plannedStart).format("YYYY-MM-DD"),
  endDate: moment(plannedEnd).format("YYYY-MM-DD"),
      },
      {
        headers: {
          authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("TIMELINE UPDATED ✅", res.data);

    // ✅ Optional: success message
    // ToastAndroid.show("Timeline updated", ToastAndroid.SHORT);

    // ✅ Go back OR refresh previous screen
    navigation.goBack();

  } catch (err) {
    console.log(
      "TIMELINE UPDATE ERROR:",
      err.response?.data || err.message
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.container}>
      <CustomHeader title="Task Details" 
       onBackPress={() => navigation.goBack()}/>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Title */}
        <Text style={styles.label}>Title</Text>
        <TextInput
          placeholder="Enter Title"
          placeholderTextColor={Colors.black}
          style={styles.inputBox}
          value={title}
          onChangeText={setTitle}
        />

        {/* TIMELINES ROW */}
       <View style={styles.rowBetween}>

  {/* ACTUAL TIMELINE */}
{/* ACTUAL TIMELINE (READ ONLY) */}
<View style={{ flex: 1, marginRight: 10 }}>
  <Text style={styles.label}>Actual Timeline</Text>

  <View style={[styles.dateBox, { backgroundColor: "#f2f2f2" }]}>
    <Feather name="calendar" size={18} color="#999" />
    <Text style={[styles.dateText, { color: "#999" }]}>
      {actualStart && actualEnd
        ? `${moment(actualStart).format("DD MMM")} - ${moment(actualEnd).format("DD MMM")}`
        : "N/A"}
    </Text>
  </View>
</View>


  {/* PLANNED TIMELINE */}
 <View style={{ flex: 1, marginLeft: 10 }}>
  <Text style={styles.label}>Planned Timeline</Text>

  <TouchableOpacity
    style={[
      styles.dateBox,
      !isAdmin && { backgroundColor: "#f2f2f2" } // 👁 read-only look
    ]}
    activeOpacity={isAdmin ? 0.7 : 1}
    disabled={!isAdmin} // 🔒 mechanic ke liye disable
    onPress={() => {
      if (!isAdmin) return;

      setCurrentType("planned-start");
      setTempDate(plannedStart || new Date());
      setOpenPicker(true);
    }}
  >
    <Feather
      name="calendar"
      size={18}
      color={isAdmin ? "#444" : "#999"}
    />

    <Text
      style={[
        styles.dateText,
        !isAdmin && { color: "#999" }
      ]}
    >
      {plannedStart && plannedEnd
        ? `${moment(plannedStart).format("DD MMM")} - ${moment(plannedEnd).format("DD MMM")}`
        : "Select Date"}
    </Text>
  </TouchableOpacity>

  {/* 👇 Optional helper text for mechanic */}
</View>


</View>


        {/* DESCRIPTION */}
      
<Text style={styles.label}>Description</Text>

{/* FIXED HEIGHT EDITOR CONTAINER */}
<View style={styles.editorWrapper}>
  
  <RichEditor
    ref={editorRef}
    placeholder="Write description..."
    androidHardwareAccelerationDisabled={true}
    style={styles.richEditor}
    initialHeight={150}    // FIX HEIGHT HERE
  />
<RichToolbar
  editor={editorRef}
  actions={[
    actions.setBold,
    actions.setItalic,
    actions.setUnderline,
    actions.insertBulletsList,
    actions.alignLeft,
    actions.alignCenter,
    actions.alignRight,
  ]}
  iconMap={{
    [actions.setBold]: () => <Feather name="bold" size={18} color="#444" />,
    [actions.setItalic]: () => <Feather name="italic" size={18} color="#444" />,
    [actions.setUnderline]: () => (
      <Feather name="underline" size={18} color="#444" />
    ),
    [actions.insertBulletsList]: () => (
      <Feather name="list" size={18} color="#444" />
    ),
    [actions.alignLeft]: () => (
      <Feather name="align-left" size={18} color="#444" />
    ),
    [actions.alignCenter]: () => (
      <Feather name="align-center" size={18} color="#444" />
    ),
    [actions.alignRight]: () => (
      <Feather name="align-right" size={18} color="#444" />
    ),
  }}
  style={styles.richToolbar}
/>
</View>

{/* Toolbar */}




        {/* BUTTON ROW */}
    <View style={styles.bottomRow}>

  {/* COMMENTS BUTTON */}
  <TouchableOpacity
    style={styles.rowBtn}
    onPress={() => commentsRef.current?.open()}
  >
    <View style={styles.iconCirclePurple}>
      <Feather name="message-square" size={22} color="#7D4CFF" />
    </View>
    <Text style={styles.rowLabel}>View Comments</Text>
  </TouchableOpacity>

  {/* DOCUMENTS BUTTON */}
  <TouchableOpacity
    style={styles.rowBtn}
    onPress={() => documentRef.current?.open()}
  >
    <View style={styles.iconCircleYellow}>
      <Feather name="file-text" size={22} color="#F5A623" />
    </View>
    <Text style={styles.rowLabel}>View Documents</Text>
  </TouchableOpacity>

</View>


      </ScrollView>

      {/* SAVE BUTTON */}
<TouchableOpacity
  style={[
    styles.saveBtn,
    !isAdmin && { opacity: 0.4 }
  ]}
  disabled={!isAdmin}
  onPress={updateActualTimeline}
>
  <Text style={styles.saveText}>Save Changes</Text>
</TouchableOpacity>

<Modal
  visible={openPicker}
  transparent
  animationType="fade"
  onRequestClose={() => setOpenPicker(false)}  // Android back button close
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalBox}>

      {/* CLOSE BUTTON */}
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => setOpenPicker(false)}
      >
        <Feather name="x" size={22} color="#333" />
      </TouchableOpacity>

      {/* TITLE */}
      <Text style={styles.modalLabel}>
        {currentType.includes("start") ? "Select Start Date" : "Select End Date"}
      </Text>

      {/* DATE PICKER */}
 <View style={styles.pickerWrapper}>
  <DatePicker
    mode="date"
    date={tempDate}
    onDateChange={setTempDate}
    textColor="#000"
    fadeToColor="transparent"
    theme="light"
    androidVariant="nativeAndroid"
  />
</View>



      {/* SELECT BUTTON */}
      <TouchableOpacity
        style={styles.modalBtn}
        onPress={() => {

          // ACTUAL START
          if (currentType === "actual-start") {
            setActualStart(tempDate);
            setCurrentType("actual-end");
            setTempDate(actualEnd || new Date());
            return;
          }

          // ACTUAL END
          if (currentType === "actual-end") {
            setActualEnd(tempDate);
            setOpenPicker(false);
            return;
          }

          // PLANNED START
          if (currentType === "planned-start") {
            setPlannedStart(tempDate);
            setCurrentType("planned-end");
            setTempDate(plannedEnd || new Date());
            return;
          }

          // PLANNED END
          if (currentType === "planned-end") {
            setPlannedEnd(tempDate);
            setOpenPicker(false);
            return;
          }
        }}
      >
        <Text style={styles.modalBtnText}>Select</Text>
      </TouchableOpacity>

    </View>
  </View>
</Modal>


<Comments ref={commentsRef}
tabId={tabId}
taskId={taskId}   

/>
<DownloadDocuments
  ref={documentRef}
  docs={docs}
  onDownload={(label) => console.log("Downloading:", label)}
/>

    </View>
  );
}

// ----------------- STYLES -------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: verticalScale(20),
  },

  label: {
    fontSize: fontScale(14),
    fontWeight: "500",
    marginLeft: moderateScale(15),
    marginTop: verticalScale(10),
    color: "#333",
  },

  inputBox: {
    marginHorizontal: moderateScale(15),
    marginTop: verticalScale(5),
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    padding: moderateScale(12),
    backgroundColor: "#fff",
  },
rowBetween: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  paddingHorizontal: moderateScale(15),
  marginTop: verticalScale(12),
  gap: moderateScale(12), // spacing between columns
},

timelineColumn: {
  flex: 1,                    // equal column width
  alignItems: "flex-start",
},

dateBox: {
  flexDirection: "row",
  alignItems: "center",
  borderWidth: moderateScale(1),
  borderRadius: moderateScale(Radius.md),
  borderColor: Colors.border,

  height: verticalScale(45),

  // ⭐ BEST FIXED-RESPONSIVE WIDTH
  //width: scale(165),

  paddingHorizontal: moderateScale(10),
  backgroundColor: "#fff",
},

dateText: {
  fontSize: fontScale(14),
  fontWeight: "500",
  color: "#000",

  marginLeft: moderateScale(10),
  flexShrink: 1,                 // text wrap protection
},

bottomRow: {
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  marginTop: verticalScale(20),
  paddingHorizontal: moderateScale(15),
},

rowBtn: {
  flexDirection: "row",
  alignItems: "center",
  gap: moderateScale(8),
},

rowLabel: {
  fontSize: fontScale(14),
  fontWeight: "500",
  color: "#333",
},


  iconCirclePurple: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#efdbff",
  },

  iconCircleYellow: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff4d9",
  },

saveBtn: {
  position: "absolute",
  left: moderateScale(15),
  right: moderateScale(15),
  bottom: verticalScale(15),

  height: verticalScale(50),           // 🔥 perfect responsive button height
  backgroundColor: Colors.primary,

  justifyContent: "center",
  alignItems: "center",

  borderRadius: moderateScale(30),     // 🔥 perfect pill shape
  elevation: 6,
},

saveText: {
  color: "#fff",
  fontSize: fontScale(15),
  fontWeight: "700",
},


  editorWrapper: {
    marginHorizontal: moderateScale(15),
    marginTop: verticalScale(5),
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    height: verticalScale(250),
    overflow: "hidden",
    backgroundColor: "#fff",
    paddingBottom: verticalScale(10),
  },

  richEditor: {
    flex: 1,
    padding: moderateScale(10),
  },

  richToolbar: {
    marginHorizontal: moderateScale(15),
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    marginTop: verticalScale(8),
    paddingVertical: verticalScale(5),
  },

  ////// MODAL ///////
modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.4)",
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: moderateScale(20),
},

modalBox: {
  width: "100%",
  maxWidth: scale(340),                        // 🔥 modal max width for tablets
  backgroundColor: "#fff",
  padding: moderateScale(20),
  borderRadius: moderateScale(Radius.md),
  maxHeight: "85%",                            // 🔥 prevents content cut
  justifyContent: "flex-start",
},

closeBtn: {
  position: "absolute",
  top: moderateScale(10),
  right: moderateScale(10),
  padding: moderateScale(6),
  zIndex: 10,
},

modalLabel: {
  fontSize: fontScale(17),
  fontWeight: "700",
  color: "#333",
  textAlign: "center",
  marginTop: verticalScale(5),
  marginBottom: verticalScale(15),
},

modalBtn: {
  backgroundColor: Colors.primary,
  paddingVertical: verticalScale(10),
  borderRadius: moderateScale(Radius.md),
  alignItems: "center",
  justifyContent: "center",
  marginTop: verticalScale(25),
  width: "100%",
},

modalBtnText: {
  color: "#fff",
  fontSize: fontScale(16),
  fontWeight: "700",
},
pickerWrapper: {
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff",
  paddingVertical: verticalScale(10),
  borderRadius: moderateScale(12),
}

});
