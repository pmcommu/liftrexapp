import React, { forwardRef, useState ,useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet,ToastAndroid, Platform, Alert } from "react-native";
import { Modalize } from "react-native-modalize";
import Colors from "../../constants/Colors";
import { Spacing, Radius } from "../../constants/Dimmence";
import Feather from "react-native-vector-icons/Feather";
import api from "../../config/api";
import { useSelector } from "react-redux";
import { RectButton } from "react-native-gesture-handler";
const BottomSheet = forwardRef(
  ({ title, options = [], onSelect, reloadRef, currentStatus ,onOpenUpload}, ref) => {

    const token = useSelector(state => state.auth.token);

    const { tabId, taskId,  } = useSelector(
  (state) => state.selectedTask
);

console.log('stats',tabId, taskId,)
    // ⭐ selected = current status from MobilizeCard
    const [selected, setSelected] = useState(null);

   
const showSuccessToast = (msg) => {
  if (Platform.OS === "android") {
    ToastAndroid.showWithGravity(
      msg,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  } else {
    Alert.alert("Success", msg);
  }
};

    // ⭐ Update Status API + UI Update
  const handleUpdate = async () => {
  if (!selected) return;

  // DONE → upload open
  if (currentStatus !== "DONE" && selected === "DONE") {
    onOpenUpload && onOpenUpload(tabId, taskId);
    ref.current?.close();
    return;
  }

  try {
    const res = await api.put(
      "/scheduling/proposal-tab/task-status",
      {
        tabId,
        taskId,
        status: selected,
      },
      {
        headers: { authorization: `bearer ${token}` },
      }
    );

    // ✅ SUCCESS TOAST
    showSuccessToast("Status updated successfully");

    const selectedOption = options.find(o => o.value === selected);
    onSelect && onSelect(selectedOption);

    reloadRef?.current && reloadRef.current(tabId);

    ref.current?.close();
  } catch (err) {
    console.log("STATUS UPDATE ERROR:", err.response?.data || err.message);
  }
};




    return (
     <Modalize
  ref={ref} 
  adjustToContentHeight
  withOverlay
  onOpened={() => {
   
    setSelected(currentStatus);
  }}
  onClosed={() => setSelected(null)} 
  modalStyle={styles.modal}
  handleStyle={styles.handle}
>

        <View style={styles.content}>
          
          {/* Title */}
          <Text style={styles.title}>{title}</Text>

          {/* OPTIONS LIST */}
  {options.map((item, index) => {
  const isActive = selected === item.value;

  return (
    <RectButton
      key={index}
      style={styles.option}
onPress={() => {
  if (item.value === "DONE") {
    onOpenUpload && onOpenUpload();

    // 🔥 BottomSheet close is REQUIRED
    setTimeout(() => {
      ref.current?.close();
    }, 150);

    return;
  }

  setSelected(item.value);
}}


    >
      <View
        style={[
          styles.radioOuter,
          isActive && styles.radioOuterActive,
        ]}
      >
        {isActive && <View style={styles.radioInner} />}
      </View>

      <Text
        style={[
          styles.optionText,
          isActive && styles.optionTextActive,
        ]}
      >
        {item.label}
      </Text>
    </RectButton>
  );
})}



          {/* Update Button */}
          <TouchableOpacity
            disabled={!selected}
            onPress={handleUpdate}
            style={[
              styles.updateBtn,
              !selected && styles.updateBtnDisabled,
            ]}
          >
            <Text
              style={[
                styles.updateText,
                !selected && styles.updateTextDisabled,
              ]}
            >
              Update Now
            </Text>
          </TouchableOpacity>

        </View>
      </Modalize>
    );
  }
);

export default BottomSheet;
const styles = StyleSheet.create({
  modal: {
    padding: Spacing.md,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    backgroundColor: Colors.white,
    
  },

  handle: {
    backgroundColor: "#ddd",
    width: 50,
    height: 5,
    borderRadius: 3,
    alignSelf: "center",
  },

  content: {
    paddingVertical: Spacing.md,
    marginBottom:1,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textDark,
    marginBottom: Spacing.md,
  },

  /* OPTION ROW */
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
   paddingHorizontal:20,
  },

  /* RADIO BUTTON OUTER */
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  radioOuterActive: {
    borderColor: Colors.primary,
  },

  /* RADIO INNER (active) */
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },

  /* OPTION TEXT */
  optionText: {
    fontSize: 16,
    color: Colors.textDark,
    fontWeight: "500",
  },

  optionTextActive: {
    color: Colors.primary,
  },

  /* UPDATE BUTTON */
  updateBtn: {
    marginTop: Spacing.lg,
    paddingVertical: 14,
    backgroundColor: Colors.primary,
    borderRadius: Radius.pill,
    alignItems: "center",
  },

  updateBtnDisabled: {
    backgroundColor: Colors.border,
  },

  updateText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  updateTextDisabled: {
    color: Colors.textLight,
  },
});






// import React, { forwardRef, useState ,useEffect} from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { Modalize } from "react-native-modalize";
// import Colors from "../../constants/Colors";
// import { Spacing, Radius } from "../../constants/Dimmence";
// import Feather from "react-native-vector-icons/Feather";
// import api from "../../config/api";
// import { useSelector,useDispatch  } from "react-redux";

// import { clearSelectedTask } from "../../redux/Slices/selectedTaskSlice";
// const BottomSheet = forwardRef(
//   ({ title, options = [], onSelect,  reloadRef, onOpenUpload}, ref) => {

//     const dispatch = useDispatch();

//     const token = useSelector(state => state.auth.token);
// const { tabId, taskId, status: currentStatus } = useSelector(
//   (state) => state.selectedTask
// );

// console.log('status',tabId, taskId,  currentStatus)

//     // ⭐ selected = current status from MobilizeCard
//     const [selected, setSelected] = useState(null);

   
//     // useEffect(() => {
//     //   if (currentStatus) {
//     //     setSelected(currentStatus);
//     //   } else {
//     //     setSelected(null);
//     //   }
//     // }, [currentStatus]);

//     // ⭐ Update Status API + UI Update
//    const handleUpdate = async () => {
//   if (!selected) return;


//   if (currentStatus !== "DONE" && selected === "DONE") {
  
//     onOpenUpload && onOpenUpload(tabId, taskId);
//     ref.current?.close();
//     return;
//   }

//   try {
//     await api.put(
//       "/scheduling/proposal-tab/task-status",
//       {
//         tabId,
//         taskId,
//         status: selected,
//       },
//       {
//         headers: { authorization: `bearer ${token}` },
//       }
//     );

//     const selectedOption = options.find(o => o.value === selected);
//     onSelect && onSelect(selectedOption);

//     reloadRef?.current && reloadRef.current(tabId);

//     ref.current?.close();
//   } catch (err) {
//     console.log("STATUS UPDATE ERROR:", err.response?.data || err.message);
//   }
// };

// const effectiveSelected = selected ?? currentStatus;

//     return (
// <Modalize
//   ref={ref}
//   adjustToContentHeight
//   withOverlay
//   onOpened={() => {
//    // setSelected(currentStatus); // ⭐ Redux status se set
//   }}
//   onClosed={() => {
//     setSelected(null);
//    // dispatch(clearSelectedTask()); // ⭐ cleanup
//   }}
//   modalStyle={styles.modal}
//   handleStyle={styles.handle}
// >


//         <View style={styles.content}>
          
//           {/* Title */}
//           <Text style={styles.title}>{title}</Text>

//           {/* OPTIONS LIST */}
//   {options.map((item, index) => {
// const isActive = selected === item.value;

//   return (
//     <TouchableOpacity
//       key={index}
//       style={styles.option}
//     onPress={() => {
//           setSelected(item.value);

//           if (item.value === "DONE" && currentStatus !== "DONE") {
//             onOpenUpload && onOpenUpload(tabId, taskId);
//             ref.current?.close();
//           }
//         }}
//     >
//       <View
//         style={[
//           styles.radioOuter,
//           isActive && styles.radioOuterActive,
//         ]}
//       >
//         {isActive && <View style={styles.radioInner} />}
//       </View>

//       <Text
//         style={[
//           styles.optionText,
//           isActive && styles.optionTextActive,
//         ]}
//       >
//         {item.label}
//       </Text>
//     </TouchableOpacity>
//   );
// })}



//           {/* Update Button */}
//           <TouchableOpacity
//             disabled={!selected}
//             onPress={handleUpdate}
//             style={[
//               styles.updateBtn,
//               !selected && styles.updateBtnDisabled,
//             ]}
//           >
//             <Text
//               style={[
//                 styles.updateText,
//                 !selected && styles.updateTextDisabled,
//               ]}
//             >
//               Update Now
//             </Text>
//           </TouchableOpacity>

//         </View>
//       </Modalize>
//     );
//   }
// );

// export default BottomSheet;
// const styles = StyleSheet.create({
//   modal: {
//     padding: Spacing.md,
//     borderTopLeftRadius: 22,
//     borderTopRightRadius: 22,
//     backgroundColor: Colors.white,
//     paddingHorizontal:20,
//   },

//   handle: {
//     backgroundColor: "#ddd",
//     width: 50,
//     height: 5,
//     borderRadius: 3,
//     alignSelf: "center",
//   },

//   content: {
//     paddingVertical: Spacing.md,
//     marginBottom:1,
//   },

//   title: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: Colors.textDark,
//     marginBottom: Spacing.md,
//   },

//   /* OPTION ROW */
//   option: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 14,
   
//   },

//   /* RADIO BUTTON OUTER */
//   radioOuter: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: Colors.border2,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },

//   radioOuterActive: {
//     borderColor: Colors.primary,
//   },

//   /* RADIO INNER (active) */
//   radioInner: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: Colors.primary,
//   },

//   /* OPTION TEXT */
//   optionText: {
//     fontSize: 16,
//     color: Colors.textDark,
//     fontWeight: "500",
//   },

//   optionTextActive: {
//     color: Colors.primary,
//   },

//   /* UPDATE BUTTON */
//   updateBtn: {
//     marginTop: Spacing.lg,
//     paddingVertical: 14,
//     backgroundColor: Colors.primary,
//     borderRadius: Radius.pill,
//     alignItems: "center",
//   },

//   updateBtnDisabled: {
//     backgroundColor: Colors.border,
//   },

//   updateText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },

//   updateTextDisabled: {
//     color: Colors.textLight,
//   },
// });
