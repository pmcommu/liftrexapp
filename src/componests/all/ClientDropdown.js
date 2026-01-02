import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../../constants/Colors";
import {
  Radius,
  Spacing,
  fontScale,
  verticalScale,
} from "../../constants/Dimmence";
import api from "../../config/api";

const ClientDropdown = ({
  label,
  value,
  onSelect,   // 👈 NEW
  error,
  containerStyle,
}) => {

  const [isFocus, setIsFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // 🔍 API SEARCH
const fetchClients = async (search = "") => {
  try {
    setLoading(true);

    const res = await api.get(
      `client/getClients?search=${search}`
    );

    // ✅ EXACT ARRAY LOCATION
    const rawList = res?.data?.data?.results || [];

    if (!Array.isArray(rawList)) {
      console.log("CLIENT LIST NOT ARRAY", res?.data);
      setData([]);
      return;
    }

    // ✅ MAP WITH CORRECT KEYS
    const list = rawList.map((item) => ({
      label: item.clientName,     // 👈 SHOW NAME
      value: item.clientName,     // 👈 SELECTED VALUE
      raw: item,                  // 👈 FULL OBJECT (future use)
    }));

    setData(list);
  } catch (e) {
    console.log("CLIENT SEARCH ERROR", e);
    setData([]);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchClients("");
  }, []);

  return (
    <View style={[{ marginVertical: 10 }, containerStyle]}>
      {/* LABEL */}
      {label && (
        <Text
          style={{
            fontSize: fontScale(14),
            marginBottom: 6,
            color: isFocus ? Colors.primary : "#313131",
          }}
        >
          {label}
        </Text>
      )}

   <Dropdown
  style={{
    height: 52,
    borderWidth: 1.4,
    borderColor: error
      ? "red"
      : isFocus
      ? Colors.primary
      : Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.sm,
    backgroundColor: "#fff",
  }}
  placeholderStyle={{
    fontSize: fontScale(15),
    color: "#999",
  }}
  selectedTextStyle={{
    fontSize: fontScale(15),
    color: "#000",
    fontWeight: "400",
  }}
  inputSearchStyle={{
    height: 40,
    fontSize: fontScale(14),
  }}
  data={data}
  search
  maxHeight={260}
  labelField="label"
  valueField="value"
  placeholder="Select company"
  searchPlaceholder="Search company..."
  value={value}
  onFocus={() => setIsFocus(true)}
  onBlur={() => setIsFocus(false)}
  onChange={(item) => {
    onSelect(item.raw);
    setIsFocus(false);
  }}
  onChangeSearchText={(text) => {
    fetchClients(text);   // ✅ FIX
  }}
  renderRightIcon={() =>
    loading ? (
      <ActivityIndicator size="small" />
    ) : (
      <Feather
        name={isFocus ? "chevron-up" : "chevron-down"}
        size={20}
        color="#777"
      />
    )
  }
/>


      {/* ERROR */}
      {error && (
        <Text style={{ marginTop: 4, color: "red", fontSize: 12 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default ClientDropdown;
