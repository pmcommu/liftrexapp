import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../../constants/Colors";
import { moderateScale } from "../../constants/Dimmence";

const CustomHeader = ({ title, onBackPress, rightIcon, onRightPress }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 2 }]}>

      {/* Status Bar Transparent */}
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={styles.row}>
        
        {/* LEFT */}
        <TouchableOpacity onPress={onBackPress} style={styles.leftBtn}>
          <Feather name="arrow-left" size={24} color={Colors.textDark} />
        </TouchableOpacity>

        {/* TITLE */}
        <Text style={styles.title}>{title}</Text>

        {/* RIGHT */}
        <TouchableOpacity onPress={onRightPress} style={styles.rightBtn}>
          {rightIcon && (
            <Feather name={rightIcon} size={24} color={Colors.textDark} />
          )}
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingBottom: moderateScale(10),
    width: "100%",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(14),
  },

  leftBtn: { paddingRight: 10 },

  title: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    color: Colors.textDark,
    flex: 1, // 🔥 keeps layout stable
  },

  rightBtn: { marginLeft: 10 },
});
