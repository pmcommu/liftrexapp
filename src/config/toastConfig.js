import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Feather from "react-native-vector-icons/Feather";

const BaseToast = ({ icon, bg, text1, text2 }) => (
  <View style={[styles.container, { backgroundColor: bg }]}>
    <View style={styles.iconBox}>{icon}</View>

    <View style={styles.textBox}>
      <Text style={styles.title}>{text1}</Text>
      {text2 ? <Text style={styles.message}>{text2}</Text> : null}
    </View>
  </View>
);

export const toastConfig = {
  success: ({ text1, text2 }) => (
    <BaseToast
      bg="#2ecc70"
      icon={<Feather name="check" size={18} color="#2ecc71" />}
      text1={text1}
      text2={text2}
    />
  ),

  error: ({ text1, text2 }) => (
    <BaseToast
      bg="#e74c3c"
      icon={<Feather name="alert-circle" size={18} color="#e74c3c" />}
      text1={text1}
      text2={text2}
    />
  ),

  info: ({ text1, text2 }) => (
    <BaseToast
      bg="#3498db"
      icon={<Feather name="info" size={18} color="#3498db" />}
      text1={text1}
      text2={text2}
    />
  ),
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginHorizontal: 16,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  textBox: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  message: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 12,
    marginTop: 2,
  },
});
