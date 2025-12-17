import React, { useState,useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import CustomInput from "../../componests/all/CustomInput";
import CustomHeader from "../all/CustomHeader";

export default function CreateInquiry({ navigation }) {
  const [projectName, setProjectName] = useState("");
  const [mrl, setMrl] = useState("");
  const [traction, setTraction] = useState("");
  const [hydraulic, setHydraulic] = useState("");

  const [repName, setRepName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
const [isFocused, setIsFocused] = useState(false);
const phoneRef = useRef(null);

  const [sheetVisible, setSheetVisible] = useState(false);
const [selectedCountry, setSelectedCountry] = useState({
  code: "IN",
  dialCode: "91",
  flag: "🇮🇳"
});


  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>

      {/* HEADER */}
      <CustomHeader title="New Inquiry" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
      >
        {/* Subtitle */}
        <Text style={styles.subTitle}>
          Fill out the details to create a new project inquiry
        </Text>

        {/* Project Name */}
        <CustomInput
          label="Project Name"
          placeholder="Enter Project Name"
          value={projectName}
          onChangeText={setProjectName}
        />

        {/* Elevators Row */}
     
        <View style={styles.row}>
          <CustomInput
            label="MRL Elevators"
            placeholder="Enter"
            value={mrl}
            onChangeText={setMrl}
            containerStyle={styles.smallInput}
            inputStyle={styles.smallInputText}
          />

          <CustomInput
            label="Traction Elevators"
            placeholder="Enter"
            value={traction}
            onChangeText={setTraction}
            containerStyle={styles.smallInput}
            inputStyle={styles.smallInputText}
          />

          <CustomInput
            label="Hydraulic Elevators"
            placeholder="Enter"
            value={hydraulic}
            onChangeText={setHydraulic}
            containerStyle={styles.smallInput}
            inputStyle={styles.smallInputText}
          />
        </View>

        {/* Representative Name */}
        <CustomInput
          label="Representative's Full Name"
          placeholder="Enter Representative's Full Name"
          value={repName}
          onChangeText={setRepName}
        />

        {/* Company Name */}
        <CustomInput
          label="Company's Name"
          placeholder="Enter Company's Name"
          value={companyName}
          onChangeText={setCompanyName}
        />

        {/* Email */}
        <CustomInput
          label="Email"
          placeholder="Enter Email"
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
        />

        {/* Phone Number */}
        {/* <Text style={styles.label}>Phone Number</Text>
     
        
<PhoneInput
  defaultCode="IN"
  layout="second"           // ⭐ Required for flag visibility
  withShadow={false}
  withFlag={true}

  withDarkTheme={false}
  autoFocus={false}
  value={phone}
  onChangeFormattedText={(text) => setPhone(text)}
  containerStyle={{
    width: "100%",
    borderWidth: 1.2,
    borderColor: "#C7C7CD",
    borderRadius: 11,
    height: 52,
  }}
  textContainerStyle={{
    backgroundColor: "#fff",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    paddingVertical: 0,
  }}
  codeTextStyle={{
   
    fontSize: 16,
  }}
  textInputStyle={{
     right:20,
    fontSize: 15,
  }}
/> */}




        {/* Submit Button */}
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitText}>Submit Inquiry</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  subTitle: {
    color: "#1f1f1f",
    fontSize: 18,
    marginBottom: 15,
  },

  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
    marginTop: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  smallInput: {
    width: "31%",
  },

  smallInputText: {
    textAlign: "center",
  },

  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  flagBox: {
    height: 52,
    paddingHorizontal: 12,
    justifyContent: "center",
    borderWidth: 1.2,
    borderColor: "#C7C7CD",
    borderRadius: 10,
  },

  submitBtn: {
    backgroundColor: "#FF6A00",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 25,
    alignItems: "center",
  },

  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
