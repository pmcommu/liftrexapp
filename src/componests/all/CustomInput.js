import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  keyboardType = "default",
  containerStyle,
  inputStyle,
  editable = true,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[{ width: "100%", marginVertical: 10 }, containerStyle]}>
      
      {/* Label */}
      {label && (
        <Text
          style={{
            fontSize: 14,
            marginBottom: 6,
            color: isFocused ? "#FD6339" : "#ffffff",
          }}
        >
          {label}
        </Text>
      )}

      {/* Main Input Wrapper */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1.4,
          borderColor: error
            ? "red"
            : isFocused
            ? "#FD6339"
            : "#C7C7CD",
          borderRadius: 10,
          paddingHorizontal: 12,
          height: 52,
          backgroundColor: editable ? "#fff" : "#f2f2f2",
        }}
      >

        {/* Left Icon */}
        {leftIcon && (
          <View style={{ marginRight: 8 }}>
            {leftIcon}
          </View>
        )}

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

        {/* Right Icon or Password Eye */}
        {secureTextEntry ? (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              color="#777"
            />
          </TouchableOpacity>
        ) : rightIcon ? (
          <TouchableOpacity onPress={onRightIconPress}>
            {rightIcon}
          </TouchableOpacity>
        ) : null}
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
