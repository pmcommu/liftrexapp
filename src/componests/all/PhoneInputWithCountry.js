import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import CountryPicker, {
  FlagButton,
} from "react-native-country-picker-modal";
import Feather from "react-native-vector-icons/Feather";
import CustomInput from "./CustomInput";

const PhoneInputWithCountry = ({
  label = "Phone Number",
  value,
  onChangeText,
}) => {
  const [visible, setVisible] = useState(false);

  // ✅ documentation-style state
  const [countryCode, setCountryCode] = useState("IN");
  const [country, setCountry] = useState({
    cca2: "IN",
    callingCode: ["91"],
  });

  return (
    <View style={{ marginVertical: 10 }}>
      {/* Label */}
      <Text style={styles.label}>{label}</Text>

      <View style={styles.row}>
        {/* Country Selector */}
        <TouchableOpacity
          style={styles.countryBox}
          onPress={() => setVisible(true)}
          activeOpacity={0.7}
        >
          {/* ✅ FLAG (auto update) */}
          <FlagButton
            countryCode={countryCode}
            withEmoji
          />

          {/* Calling Code */}
          <Text style={styles.code}>
            +{country?.callingCode?.[0] ?? "Code"}
          </Text>

          <Feather name="chevron-down" size={16} color="#555" />
        </TouchableOpacity>

        {/* Phone Input */}
        <CustomInput
          placeholder="Enter phone number"
          value={value}
          onChangeText={onChangeText}
          keyboardType="phone-pad"
          containerStyle={{ flex: 1, marginLeft: 10 }}
        />
      </View>

      {/* Country Picker Modal */}
   <CountryPicker
  countryCode={countryCode}
  visible={visible}
  withFilter
  withFlag
  withCallingCode
  withEmoji
  placeholder=""
  renderFlagButton={() => null}   
  onSelect={(c) => {
    setCountryCode(c.cca2);
    setCountry({
      cca2: c.cca2,
      callingCode: c.callingCode,
    });
    setVisible(false);
  }}
  onClose={() => setVisible(false)}
/>

    </View>
  );
};

export default PhoneInputWithCountry;

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    marginBottom: 2,
    color: "#1b1b1b",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  countryBox: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderWidth: 1.4,
    borderColor: "#C7C7CD",
    borderRadius: 10,
    backgroundColor: "#fff",
    gap: 6,
  },
  code: {
    fontSize: 15,
    color: "#000",
  },
});
