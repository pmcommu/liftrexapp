import React, { useState ,useMemo ,useEffect} from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,Animated, Dimensions
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import CustomHeader from "../../../componests/all/CustomHeader";
import LightCustomInput from "../../../componests/all/LightCustomInput";
import FtInCounter from "../../../componests/all/FtInCounter";
import { useSelector ,useDispatch} from "react-redux";
import CustomDropdown from "../../all/CustomDropdown";
import { Radius } from "../../../constants/Dimmence";
import api from "../../../config/api";
import {
  calculateStart,
  calculateSuccess,
  calculateFail,
} from "../../../redux/Slices/calculateCostSlice";
import Toast from "react-native-toast-message";
const SCREEN_WIDTH = Dimensions.get("window").width;
export default function H_ProposalForm({ navigation ,route}) {

  
  
const CAPACITY_OPTIONS = [
  1000,  2000,
  3500, 4000,
].map(item => ({
  label: String(item),
  value: String(item),
}));


const SPEED_OPTIONS = [
  { label: "30", value: "30" },
  { label: "75", value: "75" },
  { label: "90", value: "90" },
  { label: "100", value: "100" },
];

const DOOR_TYPE_OPTIONS = [
  { label: "Vertical Bi-Parti", value: "Vertical Bi-Parti" },
  { label: "Side-Slide", value:  "Side-Slide" },
  { label: "Freight Power", value: "Freight Power" },
  { label: "Two-Speed", value: "Two-Speed" },
  { label: "Center-Opening", value: "Center-Opening" },
];


const OPERATION_OPTIONS = [
  { label: "Simplex", value: "simplex" },
  { label: "Duplex", value: "duplex" },
  { label: "Triplex", value: "triplex" },
];

const JACK_OPTIONS = [
  {
    label: "Holeless Dual Telescopic",
    value: "Holeless Dual Telescopic",
  },
  {
    label: "Holeless Dual Single Stage",
    value: "Holeless Dual Single Stage",
  },
  {
    label: "Holeless Telescopic Cantilever Rear",
    value: "Holeless Telescopic Cantilever Rear",
  },
  {
    label: "Standard Under Car",
    value: "Standard Under Car",
  },
  {
    label: "Holeless Dual Roped Hydraulic",
    value: "Holeless Dual Roped Hydraulic",
  },
  {
    label: "Holeless Roped Hydraulic Cantilever Side",
    value: "Holeless Roped Hydraulic Cantilever Side",
  },
];

const ELEVATOR_TYPE_OPTIONS = [
  { label: "Passenger", value: "Passenger Hydraulic" },
  { label: "Fright", value: "Fright Hydraulic" },
  { label: "Car Lift", value: "Auto Hydraulic" },
];


const HOISTWAY_ENTRANCE_OPTIONS = [
  { label: `3'6" × 8'0"`, value: "42 X 84" },
  { label: `3'6" × 7'0"`, value: `3'6" x 7'0"` },
  { label: "Winder Entrance", value: "Winder Entrance" },
];

const DOOR_SELECTION_OPTIONS = [
  {
    label: "All Floors: Powder Coated",
    value: "All Floors: Powder Coated",
  },
  {
    label: "All Floors: Stainless Steel",
    value: "All Floors: Stainless Steel",
  },
  {
    label: "Main floor: Stainless Steel and Rest floors: Powder Coated",
    value: "Main floor: Stainless Steel and Rest floors: Powder Coated",
  },
];


const DOOR_SPEED_OPTIONS = [
  { label: "1 Speed", value: "1_speed" },
  { label: "2 Speed", value: "2_speed" },
  { label: "3 Speed", value: "3_speed" },
];

const DOOR_CLEARANCE_OPTIONS = [
  { label: 'Less than 12"', value: 'Less than 12' },
  { label: 'Less than 12" and more than 18"', value: 'Less than 12" and more than 18' },
  { label: 'More than 18"', value: 'More than 18' },
];


const POWER_OPTIONS = [
  { label: "208 AC", value: "208 AC" },
  { label: "220 AC", value: "220 AC" },
  { label: "415 AC", value: "415 AC" },
];

const CONTROLLER_OPTIONS = [
  { label: "Microprocessor", value: "Microprocessor" },
  { label: "PLC Controller", value: "PLC Controller" },
  { label: "Relay Based", value: "Relay Based" },
];

 const inquiry = useSelector(
    (state) => state.selectedInquiry.inquiry
  );



// ✅ DEPENDENCIES CORRECT



      const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);


   const { elevatorLabel, elevatorData, projectId } = route.params;

   const reqBody = elevatorData?.req_body || {};


  // const { elevatorLabel, isEdit } = route.params;
const { elevatorLabel: initialLabel } = route.params;

const [selectedForm, setSelectedForm] = useState(initialLabel);

    const costData = useSelector(
  state => state.calculateCost.resultsByForm[selectedForm]
);

const isEdit = !!costData;

console.log("COST DATA:", costData);



useEffect(() => {
  // ❌ Edit mode nahi → reset
  

  // 🟢 Data present → fill form
  setElevatorName(reqBody.elevator_name || "");
  setTotalStops(String(reqBody.landings ?? ""));

  setOperation(reqBody.operation || "");
  setCapacity(String(reqBody.capacity ?? ""));
  setSpeedOfTravel(String(reqBody.customSpeedOfTravel ?? reqBody.speed_of_travel ?? ""));

  // Hoistway
  setHoistWidthFt(reqBody.hoistway_width_ft ?? 0);
  setHoistWidthIn(reqBody.hoistway_inches ?? 0);
  setHoistDepthFt(reqBody.hoistway ?? 0);
  setHoistDepthIn(reqBody.hoistway_depth_inches ?? 0);
  setHoistwayEntrance(reqBody.hoistway_entrance_size || "");

  // Door
  setDoorFt(reqBody.door_size ?? reqBody.doorSize_feet ?? 0);
  setDoorIn(reqBody.door_size_in_inches ?? 0);
  setDoorSelection(reqBody.doorSelection || "");
  setDoorSpeed(reqBody.door_speed || "");
  setDoorClearance(reqBody.door_clearance || "");

  // Cab
  setCabHeightFt(reqBody.cab_size_feet ?? 0);
  setCabHeightIn(reqBody.cab_size_inches ?? 0);

  // Openings
  setFrontOpening(String(reqBody.front_openings ?? ""));
  setRearOpening(String(reqBody.rear_openings ?? ""));
  setSideOpening(String(reqBody.side_openings ?? ""));

  // Travel
  setTotalTravelFt(String(reqBody.ft_of_travel ?? ""));
  setTotalTravelIn(String(reqBody.feet_in_inches ?? ""));

  // Overhead & Pit
  setOverheadFt(String(reqBody.minimumOverhead_feet ?? ""));
  setOverheadIn(String(reqBody.minimumOverhead_inches ?? ""));
  setPitDepthFt(String(reqBody.minimumPitDepth_feet ?? ""));
  setPitDepthIn(String(reqBody.minimumPitDepth_inches ?? ""));

  // Controller
  setController(reqBody.controller || "");
  setControllerRoom(!!reqBody.is_controller_room_distant);
  setControllerDistFt(reqBody.distance_in_feet ?? 0);
  setControllerDistIn(reqBody.distance_in_inches ?? 0);

  // Hydraulic specific
  setElevatorType(reqBody.hydraulic_elevator_type ?? "");
  setJackType(reqBody.typeofPiston ?? "");
  setPackageCost(String(reqBody.package_cost ?? ""));

  // Power & compliance
  setPower(reqBody.power || "");
  setIsAdaCompliant(reqBody.is_controller_room_distant ?? true);
  setIsStretcherCompliant(reqBody.stracherCompliant ?? true);

}, [isEdit, reqBody]);




   console.log(isEdit)
  const prefix = elevatorLabel?.charAt(0); // "M"

const [elevatorName, setElevatorName] = useState("");


   console.log("elevatorLabel, elevatorData",elevatorLabel)
const [controllerRoom, setControllerRoom] = useState(false);




// Select fields
 

useEffect(() => {
  setSelectedForm(elevatorLabel);
}, [elevatorLabel]);

  const [showFormList, setShowFormList] = useState(false);

console.log('tye',selectedForm)

const getElevatorType = (formLabel = "") => {
    if (formLabel.startsWith("M")) return "MRL";
    if (formLabel.startsWith("T")) return "TE";
    if (formLabel.startsWith("H")) return "HE";
    return "";
  };

  // ✅ ADD THIS HERE
  const toNumber = (value) => {
    if (value === "" || value === null || value === undefined) return 0;
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  };
console.log(getElevatorType)
const [totalStops, setTotalStops] = useState("");


// Select fields
const [operation, setOperation] = useState("");
const [capacity, setCapacity] = useState("");
const [speedOfTravel, setSpeedOfTravel] = useState("");
const [hoistwayEntrance, setHoistwayEntrance] = useState("");
const [doorSelection, setDoorSelection] = useState("");
const [frontOpening, setFrontOpening] = useState("");
const [rearOpening, setRearOpening] = useState("");
const [sideOpening, setSideOpening] = useState("");


console.log('',capacity)

// Hoistway Width
const [hoistWidthFt, setHoistWidthFt] = useState(0);
const [hoistWidthIn, setHoistWidthIn] = useState(0);

// Hoistway Depth
const [hoistDepthFt, setHoistDepthFt] = useState(0);
const [hoistDepthIn, setHoistDepthIn] = useState(0);

// Door Size
const [doorFt, setDoorFt] = useState(0);
const [doorIn, setDoorIn] = useState(0);

// Cab Height
const [cabHeightFt, setCabHeightFt] = useState(0);
const [cabHeightIn, setCabHeightIn] = useState(0);

// Door Speed
const [doorSpeed, setDoorSpeed] = useState("");

// Door Clearance
const [doorClearance, setDoorClearance] = useState("");

// Distance (only if Yes)
const [controllerDistFt, setControllerDistFt] = useState(0);
const [controllerDistIn, setControllerDistIn] = useState(0);

// Power
const [power, setPower] = useState("");

// Total Travel
const [totalTravelFt, setTotalTravelFt] = useState("");
const [totalTravelIn, setTotalTravelIn] = useState("");

// Minimum Overhead
const [overheadFt, setOverheadFt] = useState("");
const [overheadIn, setOverheadIn] = useState("");

// Minimum Pit Depth
const [pitDepthFt, setPitDepthFt] = useState("");
const [pitDepthIn, setPitDepthIn] = useState("");

// Controller
const [controller, setController] = useState("");

//Jacktype
const [jackType, setJackType] = useState("");

/// Elevator
const [elevatorType, setElevatorType] = useState("");


///PAckage Cost

const [packageCost, setPackageCost] = useState("");
//.door tyep

const [doorType, setDoorType] = useState("");

//// true flase
const [isAdaCompliant, setIsAdaCompliant] = useState(true);
const [isStretcherCompliant, setIsStretcherCompliant] = useState(true);


const [loading, setLoading] = useState(false);
const [errors, setErrors] = useState({});





  const forms = useMemo(() => {
    if (!prefix || !inquiry) return [];

    if (prefix === "M") {
      return Array.from(
        { length: inquiry.noOfMRL },
        (_, i) => `M${i + 1}`
      );
    }

    if (prefix === "T") {
      return Array.from(
        { length: inquiry.noOfTraction },
        (_, i) => `T${i + 1}`
      );
    }

    if (prefix === "H") {
      return Array.from(
        { length: inquiry.noOfHydrolic },
        (_, i) => `H${i + 1}`
      );
    }

    return [];
  }, [prefix, inquiry]);

const getHeaderTitle = (form) => {
  if (!form) return "Proposal Form";

  if (form.startsWith("M")) return "Machine Room-Less Elevator";
  if (form.startsWith("T")) return "Traction Elevator";
  if (form.startsWith("H")) return "Hydraulic Elevator";

  return "Proposal Form";
};


  return (
    <View style={styles.container}>
      <CustomHeader
        title={getHeaderTitle(selectedForm)}
        onBackPress={() => navigation.goBack()}
      />
<View style={styles.titleRow}>
  <Text style={styles.title}>Select Data Form</Text>

  <TouchableOpacity
    activeOpacity={0.8}
    onPress={() => setShowFormList(prev => !prev)}
    style={styles.tagToggle}
  >
    <Text style={styles.tag}>{selectedForm}</Text>

    {/* <Feather
      name={showFormList ? "chevron-up" : "chevron-down"}
      size={25}
      color="#FF6A00"
    /> */}
  </TouchableOpacity>
</View>
{/* 
{showFormList && (
  <View style={styles.smallDropdown}>
    {forms.map(item => (
      <TouchableOpacity
        key={item}
        style={styles.smallDropdownItem}
      onPress={() => {
  setShowFormList(false);

  navigation.setParams({
    elevatorLabel: item,
  });

  setSelectedForm(item);
}}

      >
        <Text
          style={[
            styles.smallDropdownText,
            selectedForm === item && {
              color: "#FF6A00",
              fontWeight: "600",
            },
          ]}
        >
          {item}
        </Text>

        {selectedForm === item && (
          <Feather name="check" size={14} color="#FF6A00" />
        )}
      </TouchableOpacity>
    ))}
  </View>
)} */}

      <ScrollView contentContainerStyle={styles.content}>
        {/* TITLE */}
       

        {/* OPERATION */}
    <LightCustomInput
  label="Elevator Name*"
  placeholder="Enter elevator name"
  value={elevatorName}
  onChangeText={text => {
    setElevatorName(text);
    setErrors(prev => ({ ...prev, elevatorName: null }));
  }}
  error={errors.elevatorName}
  rightIcon
 editable={false}     
/>

<CustomDropdown
  label="Elevator Type*"
  data={ELEVATOR_TYPE_OPTIONS}
  value={elevatorType}
  placeholder="Select elevator type"
  searchable={false}
  onChange={(val) => {
    setElevatorType(val);
    setErrors(prev => ({ ...prev, elevatorType: null }));
  }}
  error={errors.elevatorType}
   disabled    
/>

<CustomDropdown
  label="Jack Type*"
  data={JACK_OPTIONS}
  value={jackType}
  placeholder="Select jack type"
  searchable={false}
  onChange={(val) => {
    setJackType(val);
    setErrors(prev => ({ ...prev, jackType: null }));
  }}
  error={errors.jackType}
   disabled    
/>



        {/* CAPACITY */}
<CustomDropdown
  label="Capacity*"
  data={CAPACITY_OPTIONS}
  value={capacity}
  placeholder="Type or search capacity"
  searchable
  numericOnly
  onChange={(val) => {
    // 🔑 object aaye to value lo
    const finalValue =
      typeof val === "object" ? val.value : val;

    setCapacity(finalValue);
    setErrors(prev => ({ ...prev, capacity: null }));
  }}
  error={errors.capacity}
   disabled    
/>



        {/* SPEED */}
<CustomDropdown
  label="Speed of Travel*"
  data={SPEED_OPTIONS}
  value={speedOfTravel}
  placeholder="Select speed"
  searchable
  onChange={(val) => {
    const finalValue =
      typeof val === "object" ? val.value : val;

    setSpeedOfTravel(finalValue);
    setErrors(prev => ({ ...prev, speedOfTravel: null }));
  }}
  error={errors.speedOfTravel}
   disabled    
/>

<CustomDropdown
  label="Door Type*"
  data={DOOR_TYPE_OPTIONS}
  value={doorType}
  placeholder="Select door type"
  searchable={false}
  onChange={(val) => {
    setDoorType(val);
    setErrors(prev => ({ ...prev, doorType: null }));
  }}
  error={errors.doorType}
   disabled    
/>

        {/* HOISTWAY WIDTH */}
       
        <Text style={styles.label}>Hoistway Width*</Text>
<FtInCounter
  ft={hoistWidthFt}
  inch={hoistWidthIn}
  onChangeFt={val => {
    setHoistWidthFt(val);
    setErrors(prev => ({ ...prev, hoistWidth: null }));
  }}
  onChangeIn={val => {
    setHoistWidthIn(val);
    setErrors(prev => ({ ...prev, hoistWidth: null }));
  }}
  error={errors.hoistWidth} disabled
/>



        {/* HOISTWAY DEPTH */}
        <Text style={styles.label}>Hoistway Depth*</Text>
      <FtInCounter
  ft={hoistDepthFt}
  inch={hoistDepthIn}
  onChangeFt={val => {
    setHoistDepthFt(val);
    setErrors(prev => ({ ...prev, hoistDepth: null }));
  }}
  onChangeIn={val => {
    setHoistDepthIn(val);
    setErrors(prev => ({ ...prev, hoistDepth: null }));
  }}
  error={errors.hoistDepth}  disabled    
/>


        {/* HOISTWAY ENTRANCE */}
<CustomDropdown
  label="Hoistway Entrance Size*"
  data={HOISTWAY_ENTRANCE_OPTIONS}
  value={hoistwayEntrance}
  placeholder="Select entrance size"
  searchable={false}   // 👈 fixed options hain
  onChange={(val) => {
    setHoistwayEntrance(val);
    setErrors(prev => ({ ...prev, hoistwayEntrance: null }));
  }}
  error={errors.hoistwayEntrance}  disabled    
/>




        {/* DOOR SIZE */}
        <Text style={styles.label}>Door Size*</Text>
       <FtInCounter
  ft={doorFt}
  inch={doorIn}
  onChangeFt={val => {
    setDoorFt(val);
    setErrors(prev => ({ ...prev, doorSize: null }));
  }}
  onChangeIn={val => {
    setDoorIn(val);
    setErrors(prev => ({ ...prev, doorSize: null }));
  }}
  error={errors.doorSize}  disabled    
/>


        {/* CAB HEIGHT */}
        <Text style={styles.label}>Cab Height*</Text>
      <FtInCounter
  ft={cabHeightFt}
  inch={cabHeightIn}
  onChangeFt={val => {
    setCabHeightFt(val);
    setErrors(prev => ({ ...prev, cabHeight: null }));
  }}
  onChangeIn={val => {
    setCabHeightIn(val);
    setErrors(prev => ({ ...prev, cabHeight: null }));
  }}
  error={errors.cabHeight}  disabled    
/>





<LightCustomInput
  label="Total Amount of Stops*"
  placeholder="Enter total stops"
  value={totalStops}
  onChangeText={text => {
    setTotalStops(text);
    setErrors(prev => ({ ...prev, totalStops: null }));
  }}
  error={errors.totalStops}
  rightIcon
  keyboardType="number-pad"  editable={false}     
/>


        {/* FRONT OPENING */}
<LightCustomInput
  label="Package Cost*"
  placeholder="Enter Package Cost"
  value={frontOpening}
  keyboardType="number-pad"
  rightIcon
  onChangeText={text => {
    // 🔑 allow only numbers
    const cleaned = text.replace(/[^0-9]/g, "");

    setFrontOpening(cleaned);
    setErrors(prev => ({ ...prev, frontOpening: null }));
  }}
  error={errors.frontOpening}  editable={false}       
/>


   <Text style={styles.label}>Total Travel*</Text>
<FtInCounter
  ft={totalTravelFt}
  inch={totalTravelIn}
  onChangeFt={val => {
    setTotalTravelFt(val);
    setErrors(prev => ({ ...prev, totalTravel: null }));
  }}
  onChangeIn={val => {
    setTotalTravelIn(val);
    setErrors(prev => ({ ...prev, totalTravel: null }));
  }}
  error={errors.totalTravel}  disabled    
/>


<Text style={styles.label}>Minimum Overhead*</Text>
<FtInCounter
  ft={overheadFt}
  inch={overheadIn}
  onChangeFt={val => {
    setOverheadFt(val);
    setErrors(prev => ({ ...prev, overhead: null }));
  }}
  onChangeIn={val => {
    setOverheadIn(val);
    setErrors(prev => ({ ...prev, overhead: null }));
  }}
  error={errors.overhead}  disabled    
/> 


   <Text style={styles.label}>Minimum Pit Depth*</Text>

<FtInCounter
  ft={pitDepthFt}
  inch={pitDepthIn}
  onChangeFt={val => {
    setPitDepthFt(val);
    setErrors(prev => ({ ...prev, pitDepth: null }));
  }}
  onChangeIn={val => {
    setPitDepthIn(val);
    setErrors(prev => ({ ...prev, pitDepth: null }));
  }}
  error={errors.pitDepth}  disabled    
/>


        {/* REAR OPENING */}
     <LightCustomInput
  label="Rear Opening*"
  placeholder="Enter rear openings"
  value={rearOpening}
  onChangeText={text => {
    setRearOpening(text);
    setErrors(prev => ({ ...prev, rearOpening: null }));
  }}
  error={errors.rearOpening}
  rightIcon
  keyboardType="number-pad" 
  editable={false}     
/>


        {/* SIDE OPENING */}
<LightCustomInput
  label="Side Opening*"
  placeholder="Enter side opning"
  value={sideOpening}
  onChangeText={text => {
    setSideOpening(text);
    setErrors(prev => ({ ...prev, sideOpening: null }));
  }}
  error={errors.sideOpening}
  rightIcon
  keyboardType="number-pad"
  editable={false}     
/>

<CustomDropdown
  label="Power*"
  data={POWER_OPTIONS}
  value={power}
  placeholder="Select power"
  searchable={false}
  onChange={(val) => {
    setPower(val);
    setErrors(prev => ({ ...prev, power: null }));
  }}
  error={errors.power}  disabled    
/>


<CustomDropdown
  label="Controller*"
  data={CONTROLLER_OPTIONS}
  value={controller}
  placeholder="Select controller"
  searchable={false}
  onChange={(val) => {
    setController(val);
    setErrors(prev => ({ ...prev, controller: null }));
  }}
  error={errors.controller}  disabled    
/>

<LightCustomInput
  label="Package Cost*"
  placeholder="Enter package cost"
  value={packageCost}
  onChangeText={text => {
    setPackageCost(text);
    setErrors(prev => ({ ...prev, packageCost: null }));
  }}
  error={errors.packageCost}
  rightIcon
  keyboardType="number-pad"
  editable={false}     
/>

<Text style={styles.label}>ADA Compliant?</Text>

<View style={styles.radioRowSmall}>
  {/* YES */}
  <TouchableOpacity
    style={[
      styles.radioItemSmall,
      isEdit && { opacity: 0.5 },
    ]}
    disabled={isEdit}
    onPress={() => setIsAdaCompliant(true)}
  >
    <Text style={styles.radioLabel}>Yes</Text>

    <View
      style={[
        styles.radioSquare,
        isAdaCompliant === true && styles.radioSquareActive,
      ]}
    >
      {isAdaCompliant === true && (
        <Feather name="check" size={14} color="#FF6A00" />
      )}
    </View>
  </TouchableOpacity>

  {/* NO */}
  <TouchableOpacity
    style={[
      styles.radioItemSmall,
      isEdit && { opacity: 0.5 },
    ]}
    disabled={isEdit}
    onPress={() => setIsAdaCompliant(false)}
  >
    <Text style={styles.radioLabel}>No</Text>

    <View
      style={[
        styles.radioSquare,
        isAdaCompliant === false && styles.radioSquareActive,
      ]}
    >
      {isAdaCompliant === false && (
        <Feather name="check" size={14} color="#FF6A00" />
      )}
    </View>
  </TouchableOpacity>
</View>



<Text style={styles.label}>Stretcher Compliant?</Text>

<View style={styles.radioRowSmall}>
  {/* YES */}
  <TouchableOpacity
    style={[
      styles.radioItemSmall,
      isEdit && { opacity: 0.5 },
    ]}
    disabled={isEdit}
    onPress={() => setIsStretcherCompliant(true)}
  >
    <Text style={styles.radioLabel}>Yes</Text>

    <View
      style={[
        styles.radioSquare,
        isStretcherCompliant === true && styles.radioSquareActive,
      ]}
    >
      {isStretcherCompliant === true && (
        <Feather name="check" size={14} color="#FF6A00" />
      )}
    </View>
  </TouchableOpacity>

  {/* NO */}
  <TouchableOpacity
    style={[
      styles.radioItemSmall,
      isEdit && { opacity: 0.5 },
    ]}
    disabled={isEdit}
    onPress={() => setIsStretcherCompliant(false)}
  >
    <Text style={styles.radioLabel}>No</Text>

    <View
      style={[
        styles.radioSquare,
        isStretcherCompliant === false && styles.radioSquareActive,
      ]}
    >
      {isStretcherCompliant === false && (
        <Feather name="check" size={14} color="#FF6A00" />
      )}
    </View>
  </TouchableOpacity>
</View>







        {/* SUBMIT */}
      

        <View style={{ height: 40 }} />
      </ScrollView>
    {/* <View style={styles.bottomBar}>
    <TouchableOpacity
      style={[
        styles.submitBtn,
        loading && { opacity: 0.7 },
      ]}
      disabled={loading}
      onPress={handleSubmit}
      activeOpacity={0.8}
    >
      {loading ? (
        <Text style={styles.submitText}>Submitting...</Text>
      ) : (
        <Text style={styles.submitText}>Submit</Text>
      )}
    </TouchableOpacity>
  </View> */}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  content: {
    paddingBottom:110,
    padding: 20,
  },


  /////////Toggle styles///////////
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal:15,
    //marginBottom: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  tag: {
    fontSize:16,
    color: "#FF6A00",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    fontWeight: "900",
  },
  tagToggle: {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
},

smallDropdown: {
  position: "absolute",
  right: 20,          // 👈 right aligned
  top: 120,           // 👈 adjust according to header height
  width: 90,          // 👈 small width
  backgroundColor: "#fff",
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#EEE",
  elevation: 5,       // Android shadow
  shadowColor: "#000", // iOS shadow
  shadowOpacity: 0.1,
  shadowRadius: 8,
  zIndex: 100,
},

smallDropdownItem: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: 10,
  paddingHorizontal: 12,
},

smallDropdownText: {
  fontSize: 14,
  color: "#333",
},


////////////////input otehr lablels ...////////////

  label: {
    fontSize: 14,
    marginBottom: 6,
    marginTop: 12,
    color: "#333",
  },

radioRowSmall: {
  flexDirection: "row",
  gap: 24,
  marginVertical: 10,
},

radioItemSmall: {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
},

radioLabel: {
  fontSize: 14,
  color: "#333",
},

radioSquare: {
  width: 20,
  height: 20,
  borderRadius: 4,          // 👈 square with slight round
  borderWidth: 1.5,
  borderColor: "#FF6A00",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fff",
},

radioSquareActive: {
  backgroundColor: "#FFF4EC",
},

bottomBar: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: 16,
  backgroundColor: "#fff",
  borderTopWidth: 1,
  borderTopColor: "#EEE",
},

submitBtn: {
  backgroundColor: "#FF6A00",
  height: 54,
  borderRadius: Radius.pill,
  alignItems: "center",
  justifyContent: "center",
},

submitText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "600",
},



});

