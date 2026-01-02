// import React, { useEffect, useRef } from "react";
// import { View, StyleSheet, Animated } from "react-native";
// import {
//   moderateScale,
//   verticalScale,
//   Radius,
// } from "../../constants/Dimmence";

// const ProgressBar = ({
//   progress = 0.5,       // 0 to 1
//   height = verticalScale(10),   // Proper height here
//   borderRadius = Radius.md,     // From Dimmence
// }) => {
//   const animation = useRef(new Animated.Value(0)).current;

//   // 🚀 Animate width change smoothly
//   useEffect(() => {
//     Animated.timing(animation, {
//       toValue: progress,
//       duration: 600,
//       useNativeDriver: false,
//     }).start();
//   }, [progress]);

//   // 🎨 3-type color logic
//   const getColor = () => {
//     if (progress <= 0.3) return "#4472ef"; // Low
//     if (progress <= 0.7) return "#F59E0B"; // Medium
//     return "#289626";                      // High
//   };

//   // 📏 Interpolate animated width
//   const fillWidth = animation.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["0%", "100%"],
//   });

//   return (
//     <View
//       style={[
//         styles.background,
//         {
//           height: height,
//           borderRadius: borderRadius,
//         },
//       ]}
//     >
//       <Animated.View
//         style={{
//           width: fillWidth,
//           height: "100%",              // 🔥 FIXED → bar fits perfectly
//           backgroundColor: getColor(),
//           borderRadius: borderRadius,
//         }}
//       />
//     </View>
//   );
// };

// export default ProgressBar;

// const styles = StyleSheet.create({
//   background: {
//     width: "100%",
//     overflow: "hidden",
//     backgroundColor: "#E5E7EB",
//   },
// });



import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import {
  moderateScale,
  verticalScale,
  Radius,
} from "../../constants/Dimmence";

const ProgressBar = ({
  label,
  value,
  progress = 0.5,
  height = verticalScale(10),
  borderRadius = Radius.md,
  color, // 👈 NEW (optional override)
}) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: progress,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  /* 🎨 DEFAULT AUTO COLOR (fallback) */
  const getAutoColor = () => {
    if (progress <= 0.3) return "#4472EF"; // Low
    if (progress <= 0.7) return "#F59E0B"; // Medium
    return "#289626"; // High
  };

  // ✅ FINAL COLOR DECISION
  const activeColor = color || getAutoColor();

  const fillWidth = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View>
      {/* 🔹 LABEL + VALUE */}
      {(label || value) && (
        <View style={styles.topRow}>
          <Text style={[styles.label, { color: activeColor }]}>
            {label}
          </Text>
          <Text style={[styles.value, { color: activeColor }]}>
            {value}
          </Text>
        </View>
      )}

      {/* 🔹 PROGRESS BAR */}
      <View
        style={[
          styles.background,
          { height, borderRadius },
        ]}
      >
        <Animated.View
          style={{
            width: fillWidth,
            height: "100%",
            backgroundColor: activeColor,
            borderRadius,
          }}
        />
      </View>
    </View>
  );
};

export default ProgressBar;
const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(6),
  },
  label: {
    fontSize: moderateScale(14),
    fontWeight: "500",
  },
  value: {
    fontSize: moderateScale(14),
    fontWeight: "700",
  },
  background: {
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#E5E7EB",
  },
});
