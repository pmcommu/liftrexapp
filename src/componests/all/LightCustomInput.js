import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../../constants/Colors";

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  keyboardType = "default",
  containerStyle,
  inputStyle,
  editable = true,
  clearable = true, // 👈 default true
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const showClear =
    clearable &&
    !secureTextEntry &&
    editable &&
    value !== undefined &&
    value !== null &&
    String(value).length > 0;

  return (
    <View style={[{ width: "100%", marginVertical: 10 }, containerStyle]}>
      {/* Label */}
      {label && (
        <Text
          style={{
            fontSize: 14,
            marginBottom: 6,
            color: isFocused ? "#fd63399" : "#313131",
          }}
        >
          {label}
        </Text>
      )}

      {/* Input Wrapper */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1.4,
          borderColor: error
            ? "red"
            : isFocused
            ? "#fd633991"
            : Colors.border,
          borderRadius: 10,
          paddingHorizontal: 12,
          height: 52,
          backgroundColor: editable ? "#fff" : "#f2f2f2",
        }}
      >
        {/* Left Icon */}
        {leftIcon && <View style={{ marginRight: 8 }}>{leftIcon}</View>}

        {/* Text Input */}
        <TextInput
          style={[{ flex: 1, fontSize: 16, color: "#000" }, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor="#999"
          secureTextEntry={secureTextEntry && !showPassword}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          editable={editable}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* Right Icons */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          {/* Clear Icon */}
          {showClear && (
            <TouchableOpacity
              onPress={() => onChangeText("")}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Feather name="x-circle" size={18} color="#999" />
            </TouchableOpacity>
          )}

          {/* Password Eye */}
          {secureTextEntry && (
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Feather
                name={showPassword ? "eye" : "eye-off"}
                size={20}
                color="#777"
              />
            </TouchableOpacity>
          )}

          {/* Custom Right Icon */}
          {!secureTextEntry && rightIcon && (
            <TouchableOpacity
              onPress={onRightIconPress}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Error Message */}
      {error && (
        <Text style={{ marginTop: 4, color: "red", fontSize: 12 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default CustomInput;
