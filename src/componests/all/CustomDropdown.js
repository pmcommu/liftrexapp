import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../../constants/Colors";
import {
  Radius,
  Spacing,
  fontScale,
  verticalScale,
} from "../../constants/Dimmence";

const CustomDropdown = ({
  label,
  data = [],
  value,
  onChange,
  placeholder = "Select",
  error,
  searchable = true,
  containerStyle,
  disabled = false,
  numericOnly = false,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && (
        <Text style={[styles.label, isFocus && { color: Colors.primary }]}>
          {label}
        </Text>
      )}

      <Dropdown
        style={[
          styles.dropdown,
          isFocus && styles.focusBorder,
          error && styles.errorBorder,
          disabled && styles.disabled,
        ]}
        data={data}
        search={searchable}
        maxHeight={260}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={value}
        disable={disabled}

        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}

        /** ✅ ONLY THIS SETS VALUE */
        onChange={(item) => {
          onChange(item.value); // always string
          setIsFocus(false);
        }}

        renderRightIcon={() => (
          <Feather
            name={isFocus ? "chevron-up" : "chevron-down"}
            size={20}
            color="#777"
          />
        )}

        selectedTextStyle={styles.selectedText}
        placeholderStyle={styles.placeholder}
        inputSearchStyle={[
          styles.searchInput,
          numericOnly && { keyboardType: "numeric" },
        ]}
      />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default CustomDropdown;




/* ================= STYLES ================= */

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginVertical: verticalScale(10),
  },

  label: {
    fontSize: fontScale(14),
    marginBottom: 6,
    color: "#313131",
  },

  dropdown: {
    height: 52,
    borderWidth: 1.4,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.sm,
    backgroundColor: "#fff",
  },

  focusBorder: {
    borderColor: Colors.primary,
  },

  errorBorder: {
    borderColor: "red",
  },

  disabled: {
    backgroundColor: "#f2f2f2",
  },

  placeholder: {
    fontSize: fontScale(15),
    color: "#999",
  },

  selectedText: {
    left:5,
    fontSize: fontScale(15),
    color: "#000",
    fontWeight: "300",
  },

  searchInput: {
    height: 40,
    fontSize: fontScale(14),
    borderRadius: Radius.sm,
  },

  error: {
    marginTop: 4,
    fontSize: 12,
    color: "red",
  },
});
