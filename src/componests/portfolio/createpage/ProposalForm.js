import React, { useState ,useEffect} from "react";
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

const SCREEN_WIDTH = Dimensions.get("window").width;
export default function ProposalForm({ navigation,route }) {



   const { elevatorLabel, elevatorData, projectId } = route.params;

   const reqBody = elevatorData?.req_body || {};


   useEffect(() => {
  if (!reqBody) return;

  setOperation(reqBody.operation || "");
  setCapacity(String(reqBody.capacity || ""));
  setSpeedOfTravel(String(reqBody.speed_of_travel || ""));
  setHoistwayEntrance(reqBody.hoistway_entrance_size || "");
  setDoorSelection(reqBody.doorSelection || "");

  setFrontOpening(String(reqBody.front_openings || ""));
  setRearOpening(String(reqBody.rear_openings || ""));
  setSideOpening(String(reqBody.side_openings || ""));

  // Hoistway Width
  setHoistWidthFt(reqBody.hoistway_width_ft || 0);
  setHoistWidthIn(reqBody.hoistway_inches || 0);

  // Hoistway Depth
  setHoistDepthFt(reqBody.hoistway || 0);
  setHoistDepthIn(reqBody.hoistway_depth_inches || 0);

  // Door Size
  setDoorFt(reqBody.doorSize_feet || 0);
  setDoorIn(reqBody.door_size_in_inches || 0);

  // Cab Height
  setCabHeightFt(reqBody.cab_size_feet || 0);
  setCabHeightIn(reqBody.cab_size_inches || 0);

  // Controller Room Distance
  setControllerRoom(
    reqBody.is_controller_room_distant ? "yes" : "no"
  );
  setControllerDistFt(reqBody.distance_in_feet || 0);
  setControllerDistIn(reqBody.distance_in_inches || 0);

}, [elevatorData]);

 console.log('label',elevatorLabel); // "T1"
  console.log('datat',elevatorData);

  const [controllerRoom, setControllerRoom] = useState("yes");



// Select fields
const { elevatorLabel: initialLabel } = route.params;

const [selectedForm, setSelectedForm] = useState(initialLabel);
const [showFormList, setShowFormList] = useState(false);

const forms = ["M1", "M2", "M3"];


// Select fields
const [operation, setOperation] = useState("");
const [capacity, setCapacity] = useState("");
const [speedOfTravel, setSpeedOfTravel] = useState("");
const [hoistwayEntrance, setHoistwayEntrance] = useState("");
const [doorSelection, setDoorSelection] = useState("");
const [frontOpening, setFrontOpening] = useState("");
const [rearOpening, setRearOpening] = useState("");
const [sideOpening, setSideOpening] = useState("");


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



// Distance (only if Yes)
const [controllerDistFt, setControllerDistFt] = useState(0);
const [controllerDistIn, setControllerDistIn] = useState(0);


const [loading, setLoading] = useState(false);
const [errors, setErrors] = useState({});


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
  size={25}          // 👈 size thoda bada
  strokeWidth={3}    // 👈 IMPORTANT (bold feel)
  color="#FF6A00"
/> */}

  </TouchableOpacity>
</View>


{showFormList && (
  <View style={styles.smallDropdown}>
    {forms.map(item => (
      <TouchableOpacity
        key={item}
        style={styles.smallDropdownItem}
        onPress={() => {
          setSelectedForm(item);
          setShowFormList(false);
        }}
      >
        <Text
          style={[
            styles.smallDropdownText,
            selectedForm === item && { color: "#FF6A00", fontWeight: "600" },
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
)}

      <ScrollView contentContainerStyle={styles.content}>
        {/* TITLE */}
       

        {/* OPERATION */}
      <LightCustomInput
  label="Operation*"
  placeholder="Select"
  value={operation}
  onChangeText={text => {
    setOperation(text);
    setErrors(prev => ({ ...prev, operation: null }));
  }}
  error={errors.operation}
  rightIcon
   editable={false}      
/>


        {/* CAPACITY */}
       <LightCustomInput
  label="Capacity*"
  placeholder="Select"
  value={capacity}
  onChangeText={text => {
    setCapacity(text);
    setErrors(prev => ({ ...prev, capacity: null }));
  }}
  error={errors.capacity}
  rightIcon
   editable={false}      
/>


        {/* SPEED */}
       <LightCustomInput
  label="Speed of Travel*"
  placeholder="Select"
  value={speedOfTravel}
  onChangeText={text => {
    setSpeedOfTravel(text);
    setErrors(prev => ({ ...prev, speedOfTravel: null }));
  }}
  error={errors.speedOfTravel}
  rightIcon
   editable={false}      
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
  error={errors.hoistWidth}
   disabled    
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
  error={errors.hoistDepth}
   editable={false}     
    disabled     
/>


        {/* HOISTWAY ENTRANCE */}
<LightCustomInput
  label="Hoistway Entrance Size*"
  placeholder="Select"
  value={hoistwayEntrance}
  onChangeText={text => {
    setHoistwayEntrance(text);
    setErrors(prev => ({ ...prev, hoistwayEntrance: null }));
  }}
  error={errors.hoistwayEntrance}
  rightIcon
   editable={false}      
/>


        {/* DOOR SELECTION */}
<LightCustomInput
  label="Door Selection*"
  placeholder="Select"
  value={doorSelection}
  onChangeText={text => {
    setDoorSelection(text);
    setErrors(prev => ({ ...prev, doorSelection: null }));
  }}
  error={errors.doorSelection}
  rightIcon
   editable={false}      
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
  error={errors.doorSize}
   disabled    
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
  error={errors.cabHeight}
   disabled   
/>


        {/* FRONT OPENING */}
       <LightCustomInput
  label="Front Opening*"
  placeholder="Select"
  value={frontOpening}
  onChangeText={text => {
    setFrontOpening(text);
    setErrors(prev => ({ ...prev, frontOpening: null }));
  }}
  error={errors.frontOpening}
  rightIcon
   editable={false}      
/>


        {/* REAR OPENING */}
     <LightCustomInput
  label="Rear Opening*"
  placeholder="Select"
  value={rearOpening}
  onChangeText={text => {
    setRearOpening(text);
    setErrors(prev => ({ ...prev, rearOpening: null }));
  }}
  error={errors.rearOpening}
  rightIcon
   editable={false}      
/>


        {/* SIDE OPENING */}
<LightCustomInput
  label="Side Opening*"
  placeholder="Select"
  value={sideOpening}
  onChangeText={text => {
    setSideOpening(text);
    setErrors(prev => ({ ...prev, sideOpening: null }));
  }}
  error={errors.sideOpening}
  rightIcon
   editable={false}      
/>


        {/* CONTROLLER ROOM */}
      <Text style={styles.label}>Is controller room distant?</Text>


<View style={styles.radioRowSmall}>
  {/* YES */}
  <TouchableOpacity
    style={styles.radioItemSmall}
    onPress={() => setControllerRoom("yes")}
  >
    <Text style={styles.radioLabel}>Yes</Text>

    <View
      style={[
        styles.radioSquare,
        controllerRoom === "yes" && styles.radioSquareActive,
      ]}
    >
      {controllerRoom === "yes" && (
        <Feather name="check" size={14} color="#FF6A00" />
      )}
    </View>
  </TouchableOpacity>

  {/* NO */}
  <TouchableOpacity
    style={styles.radioItemSmall}
    onPress={() => setControllerRoom("no")}
  >
    <Text style={styles.radioLabel}>No</Text>

    <View
      style={[
        styles.radioSquare,
        controllerRoom === "no" && styles.radioSquareActive,
      ]}
    >
      {controllerRoom === "no" && (
        <Feather name="check" size={14} color="#FF6A00" />
      )}
    </View>
  </TouchableOpacity>
</View>



        {/* DISTANCE */}
     
      {controllerRoom === "yes" && (
          //  <Text style={styles.label}>Enter distance in ft*</Text>
  <FtInCounter
    ft={controllerDistFt}
    inch={controllerDistIn}
    onChangeFt={val => {
      setControllerDistFt(val);
      setErrors(prev => ({ ...prev, controllerDistance: null }));
    }}
    onChangeIn={val => {
      setControllerDistIn(val);
      setErrors(prev => ({ ...prev, controllerDistance: null }));
    }}
    error={errors.controllerDistance}
  />
)}


        {/* SUBMIT */}
      

        <View style={{ height: 40 }} />
      </ScrollView>
   
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
  borderRadius: 14,
  alignItems: "center",
  justifyContent: "center",
},

submitText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "600",
},



});

