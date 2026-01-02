// import React from "react";
// import { View, StyleSheet } from "react-native";
// import Blocks from "../../assets/svg/blocks"; // ✅ animated svg

// const FullScreenLoader = () => {
//   return (
//     <View style={styles.overlay}>
//       <Blocks width={100} height={100} />
//     </View>
//   );
// };

// export default FullScreenLoader;

// const styles = StyleSheet.create({
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(255,255,255,0.9)", // soft white
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 9999,
//   },
// });

import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const FullScreenLoader = () => {
  return (
    <View style={styles.overlay}>
      <LottieView
        source={require("../../assets/loader/Loader.json")}
        autoPlay
        loop
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
};

export default FullScreenLoader;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
});

