import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,Alert
} from "react-native";
import LightCustomInput from "../../all/LightCustomInput";
import CustomHeader from "../../all/CustomHeader";
import PhoneInputWithCountry from "../../all/PhoneInputWithCountry";
import ElevatorCounter from '../../all/ElevatorCounter'
import CustomDropdown from "../../all/CustomDropdown";
import ClientDropdown from "../../all/ClientDropdown";
import { Radius } from "../../../constants/Dimmence";
import api from "../../../config/api";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";

export default function CreateInquiry({ navigation }) {


  const token = useSelector((state) => state.auth.token);


  
  const [projectName, setProjectName] = useState("");
  const [mrl, setMrl] = useState("0");
  const [traction, setTraction] = useState("0");
  const [hydraulic, setHydraulic] = useState("0");
  const [repName, setRepName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* ================= VALIDATION ================= */
  const validate = () => {
    const newErrors = {};

    if (!projectName.trim()) {
      newErrors.projectName = "Project name is required";
    }

    if (!repName.trim()) {
      newErrors.repName = "Representative name is required";
    }

    if (!companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (
      Number(mrl) + Number(traction) + Number(hydraulic) === 0
    ) {
      newErrors.elevators =
        "At least one elevator quantity is required";
    }

    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
  if (!validate()) return;

  try {
    setLoading(true);

    Toast.show({
      type: "info",
      text1: "Creating Inquiry",
      text2: "Please wait...",
    });

    const payload = {
      clientName: repName,
      companyRepresentative: companyName,
      email: email ? [email] : [],
      phoneNumber: phone,
      projectName,
      noOfMRL: Number(mrl),
      noOfTraction: Number(traction),
      noOfHydrolic: Number(hydraulic),
      lat: 19.076,
      long: 72.8777,
    };

    const res = await api.post(
      "/proposal/web/generate",
      payload
    );

    // ✅ SUCCESS TOAST
    Toast.show({
      type: "success",
      text1: "Inquiry Created",
      text2: "Inquiry created successfully",
    });

    // 🔙 Go back after short delay
    setTimeout(() => {
      navigation.goBack();
    }, 600);

  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2:
        error.response?.data?.message ||
        "Something went wrong",
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.container}>
      <CustomHeader
        title="New Inquiry"
        onBackPress={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.subTitle}>
            Fill out the details to create a new project inquiry
          </Text>

          {/* Project */}
          <LightCustomInput
            label="Project Name"
            placeholder="Enter project name"
            value={projectName}
            onChangeText={setProjectName}
            error={errors.projectName}
          />

          {/* Elevator Counters */}
          <Text style={styles.sectionTitle}>
            Elevator Details
          </Text>

        

          <View style={styles.row}>
            <ElevatorCounter
              label="MRL"
              value={mrl}
              onChange={setMrl}
            />
            <ElevatorCounter
              label="Traction"
              value={traction}
              onChange={setTraction}
            />
            <ElevatorCounter
              label="Hydraulic"
              value={hydraulic}
              onChange={setHydraulic}
            />

          </View>
  {errors.elevators && (
            <Text style={styles.ErrorText}>
              {errors.elevators}
            </Text>
          )}
          {/* Representative */}
          <LightCustomInput
            label="Representative Name"
            placeholder="Enter representative name"
            value={repName}
            onChangeText={setRepName}
            error={errors.repName}
          />




          {/* Company Dropdown */}
          <ClientDropdown
            label="Company Name"
            value={companyName}
            error={errors.companyName}
            onSelect={(client) => {
              setCompanyName(client.clientName);
              setPhone(client.phoneNumber || "");
              setErrors(prev => ({ ...prev, companyName: null }));
            }}
          />

          {/* Email */}
          <LightCustomInput
            label="Email Address"
            placeholder="Enter email address"
            value={email}
            keyboardType="email-address"
            onChangeText={setEmail}
            error={errors.email}
          />

          {/* Phone */}
          <PhoneInputWithCountry
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            error={errors.phone}
          />

          <View style={{ height: 120 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* SUBMIT */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitText}>
            {loading ? "Submitting..." : "Submit Inquiry"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  content: {
    padding: 20,
  },

  subTitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    marginTop: 10,
    marginBottom: 8,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  smallInput: {
    width: "31%",
  },

  smallInputText: {
    textAlign: "center",
  },

  footer: {
    paddingVertical: 10,
    paddingHorizontal:10,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },

  submitBtn: {
    backgroundColor: "#FF6A00",
    paddingVertical: 16,
    borderRadius: Radius.pill,
    alignItems: "center",
  },

  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  ErrorText: {
  color: "#DC2626",       // red
  fontSize: 13,

  marginBottom: 6,
  marginTop: 2,
},

});
