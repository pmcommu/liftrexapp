import React, { useState, useRef ,useEffect} from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  ToastAndroid,
  Platform,
} from "react-native";
import Colors from "../../constants/Colors";
import D, {
  moderateScale,
  scale,
  verticalScale,
  fontScale,
  Spacing,
  Radius,SCREEN_HEIGHT,SCREEN_WIDTH
} from "../../constants/Dimmence";
import AnimatedButton from "../../componests/all/AnimatedButton";
import api from "../../config/api";
import DeviceInfo from "react-native-device-info";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import {
  setAuth,
  setFirstLogin,
  setLoading as setGlobalLoading,
} from "../../redux/Slices/authSlice";

const OTP_LENGTH = 6;

const OtpVerify = ({ route }) => {
  const dispatch = useDispatch();
  const { email } = route?.params || {};

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [otpError, setOtpError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);

  const RESEND_TIME = 60;

const [timer, setTimer] = useState(RESEND_TIME);
const [canResend, setCanResend] = useState(false);


useEffect(() => {
  if (timer === 0) {
    setCanResend(true);
    return;
  }

  const interval = setInterval(() => {
    setTimer(prev => prev - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [timer]);


const handleResendOtp = async () => {
  if (!canResend) return;

  try {
    setTimer(RESEND_TIME);
    setCanResend(false);

    await api.post("/user/resend-otp", { email });

    showToast("OTP resent successfully");
  } catch (err) {
    showToast("Failed to resend OTP");
  }
};

  const showToast = (msg) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      alert(msg);
    }
  };

  /* ================= OTP HANDLER ================= */
  const handleOtpChange = (text, index) => {
    if (!/^\d*$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  /* ================= VERIFY OTP ================= */
  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");

    if (otpValue.length < OTP_LENGTH) {
      setOtpError("Please enter valid OTP");
      showToast("Please enter valid OTP");
      return;
    }

    setOtpError("");
    setLoading(true);
    dispatch(setGlobalLoading(true));

    try {
      const payload = { email, otp: otpValue };
      const { data } = await api.post("user/verify-otp", payload);

      if (data?.statusCode === 200 && data?.data?.access_token) {
        const userData = data.data;

        await AsyncStorage.setItem("token", userData.access_token);
        await AsyncStorage.setItem("user", JSON.stringify(userData));

        dispatch(
          setAuth({
            user: userData,
            token: userData.access_token,
            isFirstLogin: true,
          })
        );

        dispatch(setFirstLogin(true));
        showToast(data?.message || "OTP verified successfully!");
        return;
      }

      showToast(data?.message || "OTP verification failed");
    } catch (err) {
      const apiError = err?.response?.data;
      const message =
        apiError?.message || "OTP verification failed. Please try again.";
      setOtpError(message);
      showToast(message);
    } finally {
      setLoading(false);
      dispatch(setGlobalLoading(false));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Text style={styles.title}>OTP Verification</Text>

          <Text style={styles.subtitle}>
            Enter the OTP sent to{" "}
            <Text style={styles.emailText}>{email}</Text>
          </Text>

          {/* ========== OTP BOXES ========== */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={[
                  styles.otpBox,
                  otpError && { borderColor: "red" },
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(text) =>
                  handleOtpChange(text, index)
                }
                autoFocus={index === 0}
              />
            ))}
          </View>

          {otpError ? (
            <Text style={styles.errorText}>{otpError}</Text>
          ) : null}

          <View style={{ marginTop: verticalScale(22) }}>
            <AnimatedButton
              title="Verify OTP"
              loading={loading}
              onPress={handleVerifyOtp}
            />
          </View>

          <View style={styles.timerContainer}>
  {!canResend ? (
    <Text style={styles.timerText}>
      Resend OTP in{" "}
      <Text style={styles.timerCount}>{timer}s</Text>
    </Text>
  ) : (
    <Text style={styles.resendText} onPress={handleResendOtp}>
      Resend OTP
    </Text>
  )}
</View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OtpVerify;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
   // paddingHorizontal: scale(24),
  },

  container: {
    backgroundColor: "#fff",
    padding: scale(24),
    borderRadius: moderateScale(14),
  
  },

  title: {
    fontSize: fontScale(22),
    fontWeight: "700",
    color: Colors.textDark,
    textAlign: "center",
  },

  subtitle: {
    marginTop: verticalScale(8),
    fontSize: fontScale(14),
    color: "#666",
    textAlign: "center",
  },

  emailText: {
    fontWeight: "600",
    color: Colors.primary,
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(22),
  },

  otpBox: {
    width: scale(46),
    height: verticalScale(52),
    borderWidth: moderateScale(1.5),
    borderColor: Colors.border,
    borderRadius: moderateScale(8),
    textAlign: "center",
    fontSize: fontScale(18),
    fontWeight: "600",
    color: Colors.textDark,
    backgroundColor: "#fff",
    marginHorizontal: scale(1),
  },

  errorText: {
    marginTop: verticalScale(10),
    color: "red",
    fontSize: fontScale(13),
    textAlign: "center",
  },

  timerContainer: {
    marginTop: verticalScale(10),
    alignItems: "center",
  },

  timerText: {
    fontSize: fontScale(13),
    color: "#666",
  },

  timerCount: {
    color: Colors.primary,
    fontWeight: "600",
    fontSize: fontScale(13),
  },

  resendText: {
    marginTop:5,
    fontSize: fontScale(14),
    color: Colors.primary,
    fontWeight: "600",
  },
});
