import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import Colors from "../../constants/Colors";
const Splash = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

 useEffect(() => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 1200,
    useNativeDriver: true,
  }).start();
}, []);


  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.logo, { opacity: fadeAnim }]}>
        LIFTREX
      </Animated.Text>

      {/* <Animated.Text style={[styles.tagline, { opacity: fadeAnim }]}>
        Elevating Reliability
      </Animated.Text> */}
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",  // Your brand color
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    fontSize: 45,
    fontWeight: "bold",
    letterSpacing: 2,
   color: Colors.primary,
  },

  tagline: {
    fontSize: 14,
    marginTop: 10,
    color: "#555",
  },
});
