import React, { useRef } from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import Colors from "../../constants/Colors";

import D, {
  moderateScale,
  scale,
  verticalScale,
  fontScale,
  Spacing,
  Radius,SCREEN_HEIGHT,SCREEN_WIDTH
} from "../../constants/Dimmence";
import * as IMAGE from "../../assets/svg/index"


const AnimatedButton = ({ title = 'Confirm', loading = false, onPress }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
    if (!loading && onPress) onPress();
  };

  return (
    <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
        {loading ? (
          <View style={styles.loaderWrapper}>
            <ActivityIndicator color="#fff" size="small" />
            <Text style={[styles.buttonText, { marginLeft: 8 }]}>Loading...</Text>
          </View>
        ) : (
          <Text style={styles.buttonText}>{title}</Text>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default AnimatedButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary, // your brand color
    paddingVertical: SCREEN_HEIGHT * 0.015,
    borderRadius: SCREEN_WIDTH * 0.023,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
   
  },
  loaderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
