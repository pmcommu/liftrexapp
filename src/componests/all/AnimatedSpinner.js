import React, { useRef, useEffect } from "react";
import { Animated, Easing } from "react-native";
import * as IMAGE from "../../assets/svg/index"; 
// 👆 yahin se tumhara SPINNER svg aa raha hai

/**
 * AnimatedSpinner
 * ----------------
 * Ye component SVG spinner ko continuously rotate (ghumata) hai,
 * kyunki React Native SVG ke andar ki animation support nahi karta.
 *
 * Isliye hum Animated API ka use karke pure SVG ko rotate karte hain.
 */
const AnimatedSpinner = ({ size = 23 }) => {
  // 🔹 Animated value (0 → 1)
  // Ye rotation progress ko represent karta hai
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 🔹 Infinite rotation loop
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,              // 0 se 1 tak jaayega
        duration: 900,           // 900ms me ek full round
        easing: Easing.linear,   // smooth constant speed
        useNativeDriver: true,   // performance ke liye
      })
    ).start();
  }, []);

  // 🔹 0–1 ko degree me convert karna
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={{
        transform: [{ rotate }], // 🔄 yahin actual rotation ho rahi hai
      }}
    >
      {/* Tumhara SVG spinner */}
      <IMAGE.SPINNER width={size} height={size} />
    </Animated.View>
  );
};

export default AnimatedSpinner;
