import React, {
  forwardRef,
  useState,
  useMemo,
  useImperativeHandle,
  useRef,useEffect
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,Animated
} from "react-native";
import { Modalize } from "react-native-modalize";
import Feather from "react-native-vector-icons/Feather";
import { useSelector,useDispatch } from "react-redux";
import * as IMAGE from "../../../assets/svg/index"
import Colors from "../../../constants/Colors";
import { setPaymentTerms } from "../../../redux/Slices/paymentTermsSlice";
import { useNavigation } from "@react-navigation/native";
const CreatePaymentTermsModal = forwardRef((props, ref) => {

const dispatch = useDispatch();
const navigation = useNavigation();

  const rotateAnim = useRef(new Animated.Value(0)).current;

  const { project } = useSelector(
    (state) => state.projectDetails
  );


  const projectdetails = project?.proposalDetails;


 const paymentDetails =
  project?.proposalDetails?.paymentDetails;

const isExistingPaymentTerms =
  paymentDetails?.groupData?.length > 0;

  const modalRef = useRef(null);

  /* ================= STATE ================= */
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [groupedTypes, setGroupedTypes] = useState([]);
  const [isGroupCreated, setIsGroupCreated] = useState(false);
  const [isGroupExpanded, setIsGroupExpanded] =
    useState(false);

  /* ================= REF ================= */
  useImperativeHandle(ref, () => ({
    open: () => modalRef.current?.open(),
    close: () => modalRef.current?.close(),
  }));

  /* ================= ELEVATORS ================= */
  const parsedCostHistory = React.useMemo(() => {
  try {
    return project?.proposalDetails?.costHistoryJson
      ? JSON.parse(project.proposalDetails.costHistoryJson)
      : null;
  } catch (e) {
    console.log("JSON parse error", e);
    return null;
  }
}, [project]);



const elevators = useMemo(() => {
  if (!parsedCostHistory?.input_details) return [];

  return Object.entries(parsedCostHistory.input_details).map(
    ([key, value]) => ({
      key,
      label: key,

      // 🔑 SAME SOURCE AS PROPOSAL CARD
      price:
        value?.dataArray?.[1]?.["Final Price"] ??
        value?.dataArray?.[0]?.["Final Price"] ??
        value?.totalCost ??
        0,
    })
  );
}, [parsedCostHistory]);

const singleSelectedPrice = useMemo(() => {
  if (selectedTypes.length !== 1) return 0;

  const found = elevators.find(
    e => e.key === selectedTypes[0]
  );

  return Number(found?.price) || 0;
}, [selectedTypes, elevators]);


const finalPrice = useMemo(() => {
 
  if (isGroupCreated) {
    return groupedPrice;
  }

 
  if (selectedTypes.length === 1) {
    return singleSelectedPrice;
  }

 
  return 0;
}, [
  isGroupCreated,
  groupedPrice,
  selectedTypes,
  singleSelectedPrice,
]);



  console.log('',elevators)

  /* ================= SELECT ================= */
  const toggleType = (key) => {
  setSelectedTypes((prev) =>
    prev.includes(key)
      ? prev.filter((i) => i !== key)
      : [...prev, key]
  );
};


  /* ================= GROUP ================= */


 const groupedPrice = useMemo(() => {
  return groupedTypes.reduce((sum, key) => {
    const found = elevators.find(e => e.key === key);
    return sum + (found?.price || 0);
  }, 0);
}, [groupedTypes, elevators]);

const totalPrice = useMemo(() => {
  return selectedTypes.reduce((sum, key) => {
    const found = elevators.find(e => e.key === key);
    return sum + (found?.price || 0);
  }, 0);
}, [selectedTypes, elevators]);

// const finalPrice = isGroupCreated
//   ? groupedPrice
//   : totalPrice;

const handleUngroup = (key) => {
  setSelectedTypes(prev => {
    const updated = prev.filter(k => k !== key);

    if (updated.length <= 1) {
      setIsGroupCreated(false);
      setGroupedTypes([]);
      setIsGroupExpanded(false);
    } else {
      setGroupedTypes(updated);
    }

    return updated;
  });
};


const toggleGroupExpand = () => {
  Animated.timing(rotateAnim, {
    toValue: isGroupExpanded ? 0 : 1,
    duration: 200,
 useNativeDriver: false,
  }).start();

  setIsGroupExpanded(prev => !prev);
};
const rotate = rotateAnim.interpolate({
  inputRange: [0, 1],
  outputRange: ["0deg", "180deg"],
});

const buildPaymentTermsPayload = () => {
  let groupIndex = 1;
  const groupData = [];

  // 1️⃣ GROUPED ELEVATORS (M1+M2)
  if (isGroupCreated && groupedTypes.length > 0) {
    const groupCost = groupedTypes.reduce((sum, key) => {
      const found = elevators.find(e => e.key === key);
      return sum + (found?.price || 0);
    }, 0);

    groupData.push({
      index: groupIndex++,
      name: groupedTypes.join("+"),
      includeElevator: groupedTypes,
      totalGcost: groupCost,
      phases: [], 
    });
  }

  // 2️⃣ SINGLE ELEVATORS (T1, T2 etc)
  const groupedSet = new Set(groupedTypes);

  elevators.forEach(e => {
    if (!groupedSet.has(e.key)) {
      groupData.push({
        index: groupIndex++,
        name: e.key,
        includeElevator: [e.key],
        totalGcost: e.price,
        phases: [], 
      });
    }
  });

  // 3️⃣ TOTAL COST
  const totalCost = groupData.reduce(
    (sum, g) => sum + g.totalGcost,
    0
  );

  return {
    projectId: project?.projectData?._id,
    proposalId: project?.proposalDetails?._id,
    costHistoryId: project?.proposalDetails?.costHistoryId,

    totalCost,
    totalDue: totalCost,
    totalPaidAmount: 0,

    

    groupData, // ✅ THIS is key change
  };
};



// const handleSavePaymentTerms = () => {
//   // 1️⃣ build payload
//   const payload = buildPaymentTermsPayload();

//   // 2️⃣ save in redux
//   dispatch(setPaymentTerms(payload));
//   console.log("✅ Payment terms saved in Redux", payload);

//   // 3️⃣ close modal
//   modalRef.current?.close();

//   // 4️⃣ navigate to next screen
//   navigation.navigate("CreatePaymentPhases");
// };
const handleSavePaymentTerms = () => {
  // 1️⃣ build payload
  const payload = buildPaymentTermsPayload();

  // 2️⃣ save in redux
  dispatch(setPaymentTerms(payload));
  console.log("✅ Payment terms saved in Redux", payload);

  // 3️⃣ close modal
  modalRef.current?.close();

  // 4️⃣ CONDITIONAL NAVIGATION
  if (project?.proposalDetails?.paymentTermsCreated) {
    // ✅ already created → update flow
    navigation.navigate("UpdatePaymentPhases");
  } else {
    // ❌ not created → create flow
    navigation.navigate("CreatePaymentPhases");
  }
};


const existingPaymentDetails =
  project?.proposalDetails?.paymentDetails;

  useEffect(() => {
  if (!existingPaymentDetails?.groupData?.length) return;

  // 🔹 agar group bana hua hai
  const grouped = existingPaymentDetails.groupData.find(
    g => g.includeElevator.length > 1
  );

  if (grouped) {
    setIsGroupCreated(true);
    setGroupedTypes(grouped.includeElevator);
    setSelectedTypes(grouped.includeElevator);
    setIsGroupExpanded(false);
  } else {
    // 🔹 sirf single elevators
    const singles = existingPaymentDetails.groupData.flatMap(
      g => g.includeElevator
    );
    setSelectedTypes(singles);
  }
}, [existingPaymentDetails]);

const formatAmount = (value) => {
  if (!value) return "0.00";

  return Number(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};


  /* ================= UI ================= */


  return (
    <Modalize
      ref={modalRef}
      modalHeight={520}   
     // adjustToContentHeight
      handleStyle={{ opacity: 0 }}
      modalStyle={styles.modal}
    >


 <View style={styles.sheet}>

  {/* HEADER */}
  <View style={styles.header}>
    <Text style={styles.headerTitle}>Create Payment Terms</Text>
    <TouchableOpacity onPress={() => modalRef.current?.close()}>
      <Feather name="x" size={22} color="#111" />
    </TouchableOpacity>
  </View>

  {/* CLIENT + ELEVATORS */}
  <View style={styles.infoRow}>
    <View style={styles.infoItem}>
       <IMAGE.USER_CHECK width={40} height={30} />
      <View>
        <Text style={styles.infoLabel}>Client</Text>
        <Text style={styles.infoValue}>{projectdetails?.client_name}</Text>
      </View>
    </View>

    <View style={styles.infoItem}>
       <IMAGE.FLEX width={40} height={30} />
      <View>
        <Text style={styles.infoLabel}>No. of Elevators</Text>
        <Text style={styles.infoValue}>{projectdetails?.no_of_elevator}</Text>
      </View>
    </View>
  </View>

  {/* FINAL PRICE */}
  <View style={styles.finalPriceBox}>
  <Text style={styles.finalPriceLabel}>Final Price</Text>
<Text style={styles.finalPriceValue}>
  $ {formatAmount(project?.proposalDetails?.total_billed)}
</Text>

</View>


  {/* LOCATION + GROUP */}
  <View style={styles.locationBox}>
    <View style={styles.locationHeader}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Feather name="map-pin" size={16} color="#111" />
        <Text style={styles.locationText}>
          Târgu Jiu, Romania
        </Text>
      </View>

<TouchableOpacity
  activeOpacity={0.6}
  disabled={isGroupCreated || selectedTypes.length <= 1}
  onPress={() => {
    setIsGroupCreated(true);
    setGroupedTypes(selectedTypes);
    setIsGroupExpanded(false);
  }}
>
  <Text
    style={[
      styles.groupLink,
      (isGroupCreated || selectedTypes.length <= 1) && {
        color: "#AAA",        // inactive look
      },
    ]}
  >
    Group
  </Text>
</TouchableOpacity>


    </View>

    {/* TABLE HEADER */}
    <View style={styles.tableHeader}>
      <Text style={styles.tableLabel}>Elevators</Text>
      <Text style={styles.tableLabel}>Total Contract</Text>
    </View>






    {/* GROUP CHILDREN */}
{/* GROUP ROW */}
{isGroupCreated && (
 <TouchableOpacity
  style={styles.listRow}
  activeOpacity={0.8}
  onPress={toggleGroupExpand}
>
  <View style={styles.listRowLeft}>
    

    <Text style={styles.listRowTitle}>
      {groupedTypes.join(" + ")}
    </Text>

    <Animated.View
      style={{ transform: [{ rotate }], marginLeft: 6 }}
    >
      <Feather
        name="chevron-down"
        size={18}
        color="#5A4BFF"
      />
    </Animated.View>
  </View>

  <Text style={styles.listRowValue}>
    ₹ {groupedPrice.toFixed(2)}
  </Text>
</TouchableOpacity>

)}


{isGroupCreated && isGroupExpanded &&
  groupedTypes.map(key => {
    const item = elevators.find(e => e.key === key);

    return (
      <TouchableOpacity
        key={key}
        style={styles.subRow}
        onPress={() => handleUngroup(key)}
      >
      <View style={styles.checkboxActive}>
  <Feather
    name="check"
    size={12}
    color="#FFFFFF"
  />
</View>

        <Text style={styles.rowText}>{item.label}</Text>
        <Text style={styles.rowPrice}>
          ₹ {item.price.toFixed(2)}
        </Text>
      </TouchableOpacity>
    );
  })}




{/* NORMAL ROWS */}
{elevators
  .filter(e => !groupedTypes.includes(e.key))
  .map(item => {
    const checked = selectedTypes.includes(item.key);

    return (
      <TouchableOpacity
        key={item.key}
        style={styles.listRow}
        activeOpacity={0.8}
        onPress={() => toggleType(item.key)}
      >
        {/* LEFT */}
        <View style={styles.listRowLeft}>
         <View
  style={
    checked
      ? styles.checkboxActive
      : styles.checkboxInactive
  }
>
  {checked && (
    <Feather
      name="check"
      size={12}
      color="#FFFFFF"
    />
  )}
</View>


          <Text style={styles.listRowTitle}>
            {item.label}
          </Text>

          {/* ICON PLACEHOLDER (for alignment) */}
          <View style={styles.iconPlaceholder} />
        </View>

        {/* RIGHT */}
        <Text style={styles.listRowValue}>
          ₹ {item.price.toFixed(2)}
        </Text>
      </TouchableOpacity>
    );
  })}



  </View>

  {/* SAVE */}
<TouchableOpacity
  style={styles.saveBtn}
  onPress={handleSavePaymentTerms}
>
  <Text style={styles.saveText}>Save</Text>
</TouchableOpacity>



</View>

    </Modalize>
  );
});

export default CreatePaymentTermsModal;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  modal: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
sheet: {
  padding: 16,
},

header: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
},

headerTitle: {
  fontSize: 18,
  fontWeight: "700",
},

infoRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 16,
  marginHorizontal:10,
  paddingVertical:10,
},

infoItem: {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
},

infoLabel: {
  fontSize: 12,
  color: "#8A8A8A",
},

infoValue: {
  fontSize: 14,
  fontWeight: "600",
},

finalPriceBox: {
 
  borderRadius: 12,
  padding: 14,
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 16,
},

finalPriceLabel: {
  fontSize: 14,
  color: "#FF5A1F",
  fontWeight: "600",
},

finalPriceValue: {
  fontSize: 16,
  fontWeight: "700",
  color: "#FF5A1F",
},

locationBox: {
  borderWidth: 1,
  borderColor: "#E6E6E6",
  borderRadius: 14,
  padding: 14,
},


//////////////////.  loadtion HEDAER /////////
locationHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 12,
},

locationText: {
  marginLeft: 6,
  fontSize: 14,
  fontWeight: "600",
},

groupLink: {
  color: "#5A4BFF",
  fontWeight: "600",
},

tableHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 8,
},

tableLabel: {
  fontSize: 12,
  color: "#777",
  fontWeight: "600",
},

row: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 10,
},
row: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingVertical: 10,
},

leftGroup: {
  flexDirection: "row",
  alignItems: "center",
},


subRow: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 8,
  paddingLeft: 28,
},

rowText: {
  flex: 1,
  fontSize: 14,
  fontWeight: "600",
},

rowPrice: {
  fontSize: 14,
  fontWeight: "600",
},

checkbox: {
  width: 18,
  height: 18,
  borderRadius: 4,
  borderWidth: 1,
  borderColor: "#999",
  marginRight: 10,
},

checkboxChecked: {
  width: 18,
  height: 18,
  borderRadius: 4,
  backgroundColor: "#FF5A1F",
  marginRight: 10,
},

saveBtn: {
  backgroundColor: "#FF5A1F",
  borderRadius: 28,
  paddingVertical: 14,
  alignItems: "center",
  marginTop: 20,
},

saveText: {
  color: "#FFF",
  fontSize: 16,
  fontWeight: "700",
},



///////////

listRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingVertical: 12,
  paddingHorizontal: 4,
},

listRowLeft: {
  flexDirection: "row",
  alignItems: "center",
  flexShrink: 1,
},
checkboxInactive: {
  width: 18,
  height: 18,
  borderRadius: 4,
  borderWidth: 1.5,
  borderColor: "#C7C7CC",   // soft gray
  backgroundColor: "#FFF",
  marginRight: 10,
},
checkboxActive: {
  width: 18,
  height: 18,
  borderRadius: 4,
  backgroundColor: "#FF5A1F",  // primary
  alignItems: "center",
  justifyContent: "center",
  marginRight: 10,
},



listRowTitle: {
  fontSize: 14,
  fontWeight: "600",
  color: "#111",
},

listRowValue: {
  fontSize: 14,
  fontWeight: "700",
  color: "#111",
},

});


    {/* GROUP ROW */}
    {/* {isGroupCreated && (
      <TouchableOpacity
        style={styles.row}
        onPress={() => setIsGroupExpanded(p => !p)}
      >
        <View style={styles.checkboxChecked} />
        <Text style={styles.rowText}>
          {groupedTypes.join(" + ")}
        </Text>
        <Text style={styles.rowPrice}>
          ${groupedPrice.toFixed(2)}
        </Text>
      </TouchableOpacity>
    )} */}
      {/* {isGroup && (
    <TouchableOpacity
      style={styles.row}
      onPress={() =>
        setIsGroupExpanded(prev => !prev)
      }
      activeOpacity={0.8}
    >
      <View style={styles.checkboxChecked} />

      <Text style={styles.rowText}>
        {selectedTypes.join(" + ")}
      </Text>

      <Text style={styles.rowPrice}>
        ₹ {groupedPrice.toFixed(2)}
      </Text>

      <Feather
        name={
          isGroupExpanded
            ? "chevron-up"
            : "chevron-down"
        }
        size={18}
        color="#5A4BFF"
        style={{ marginLeft: 6 }}
      />
    </TouchableOpacity>
  )} */}

  {/* GROUP DROPDOWN */}







// const createPaymentTerms = async () => {
//   try {
//     const payload = {
//       projectId: project?.projectData?.project_id,
//       proposalId: project?.proposalDetails?._id,
//       costHistoryId: project?.proposalDetails?.costHistoryId,
//       phaseDivision: 9,

//       totalCost: groupedPrice,
//       totalDue: groupedPrice,
//       totalPaidAmount: 0,

//       groupData: buildGroupData(),
//     };

//     console.log("API PAYLOAD 👉", payload);

//     const res = await api.post(
//       "/payment/create-details",
//       payload
//     );

//     if (res?.statusCode === 200) {
//       console.log("SUCCESS RESPONSE ✅", res.data);

//       // optional
//       modalRef.current?.close();
//     }
//   } catch (err) {
//     console.log("Payment create error ❌", err);
//   }
// };