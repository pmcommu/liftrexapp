import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import D, {
  verticalScale,
  fontScale,
  Spacing,
  Radius,
} from "../../constants/Dimmence";
import Colors from "../../constants/Colors";

export default function FtInCounter({
  ft,
  inch,
  onChangeFt,
  onChangeIn,
  error,
  containerStyle,
  disabled = false,   // 👈 NEW PROP
}) {

  // 🔹 Inch increment with auto-carry
const incInch = () => {
  if (disabled) return;

  if (inch < 11) {
    onChangeIn(inch + 1);
  } else {
    onChangeIn(0);
    onChangeFt(ft + 1);
  }
};

const decInch = () => {
  if (disabled) return;

  if (inch > 0) {
    onChangeIn(inch - 1);
  } else if (ft > 0) {
    onChangeFt(ft - 1);
    onChangeIn(11);
  }
};

  const hasError = Boolean(error);

  return (
    <View style={containerStyle}>
      {/* COUNTER ROW */}
      <View style={styles.container}>
        {/* FT BOX */}
      <View
  style={[
    styles.box,
    hasError && styles.errorBorder,
    disabled && styles.disabledBox,   // 👈 ADD
  ]}
>

          <Text style={styles.value}>{ft} Ft</Text>

          <View style={styles.spinner}>
           <TouchableOpacity
  disabled={disabled}
  onPress={() => onChangeFt(ft + 1)}
>
  <Feather
    name="chevron-up"
    size={14}
    color={disabled ? "#999" : "#000"}
  />
</TouchableOpacity>

<TouchableOpacity
  disabled={disabled}
  onPress={() => onChangeFt(Math.max(0, ft - 1))}
>
  <Feather
    name="chevron-down"
    size={14}
    color={disabled ? "#999" : "#000"}
  />
</TouchableOpacity>

          </View>
        </View>

        {/* IN BOX */}
     <View
  style={[
    styles.box,
    hasError && styles.errorBorder,
    disabled && styles.disabledBox,   // 👈 ADD
  ]}
>

          <Text style={styles.value}>{inch} In</Text>

          <View style={styles.spinner}>
<TouchableOpacity disabled={disabled} onPress={incInch}>
  <Feather
    name="chevron-up"
    size={14}
    color={disabled ? "#999" : "#000"}
  />
</TouchableOpacity>

<TouchableOpacity disabled={disabled} onPress={decInch}>
  <Feather
    name="chevron-down"
    size={14}
    color={disabled ? "#999" : "#000"}
  />
</TouchableOpacity>

          </View>
        </View>
      </View>

      {/* ERROR MESSAGE (same as CustomInput) */}
      {hasError && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(6),
  },

  box: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.4,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingVertical: verticalScale(10),
    paddingHorizontal: Spacing.sm,
    backgroundColor: "#fff",
  },

  errorBorder: {
    borderColor: "red",
  },

  value: {
    fontSize: fontScale(14),
    fontWeight: "600",
    color: Colors.textPrimary,
  },

  spinner: {
    justifyContent: "space-between",
    height: verticalScale(28),
  },

  errorText: {
    marginTop: 4,
    marginLeft: 4,
    fontSize: 12,
    color: "red",
  },
  disabledBox: {
  backgroundColor: "#F2F2F2",
  borderColor: "#DDD",
},

});
