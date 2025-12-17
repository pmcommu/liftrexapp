import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet ,ToastAndroid,KeyboardAvoidingView,StatusBar,ScrollView} from "react-native";
import CustomInput from "../../componests/all/CustomInput";
import * as IMAGE from "../../assets/svg/index"
import Colors from "../../constants/Colors";
import D, {
  moderateScale,
  scale,
  verticalScale,
  fontScale,
  Spacing,
  Radius,SCREEN_HEIGHT,SCREEN_WIDTH
} from "../../constants/Dimmence";
import AnimatedButton from '../../componests/all/AnimatedButton'
import api from '../../config/api'
const Login = ({ navigation }) => {

  const [email, setEmail] = useState('');
const [emailError, setEmailError] = useState('');
const [password, setPassword] = useState('');
const [passwordError, setPasswordError] = useState('');
  const [loading, setLocalLoading] = useState(false);

 


const handleLogin = async () => {
  let valid = true;

  // Email validation
  if (!email.includes("@")) {
    setEmailError("Invalid email address");
    valid = false;
  } else {
    setEmailError("");
  }

  // Password validation
  if (password.length < 6) {
    setPasswordError("Password must be at least 6 characters");
    valid = false;
  } else {
    setPasswordError("");
  }

  if (!valid) return;

  try {
    setLocalLoading(true);

    const payload = { email, password };
    const { data } = await api.post("user/login", payload);

    console.log("Login Response:", data);

    // Clean message from backend (fixes space issue)
    const cleanMessage = data?.message?.trim();

    // 🔥 OTP Sent successfully
    if (data?.statusCode === 200 && cleanMessage === "OTP Sent successfully") {
      ToastAndroid.show("OTP Sent successfully", ToastAndroid.SHORT);

      const otpEmail = data?.data?.email || email;

      navigation.navigate("OtpVerify", { email: otpEmail });
      return;
    }

    // ❌ Invalid password
    if (cleanMessage === "Invalid password") {
      setPasswordError("Invalid password");
      ToastAndroid.show("Invalid password", ToastAndroid.SHORT);
      return;
    }

    // ❌ User not found
    if (cleanMessage === "User not found") {
      setEmailError("User not found");
      ToastAndroid.show("User not found", ToastAndroid.SHORT);
      return;
    }

    // ❌ NEW: Password doesn't match (with space in API)
    if (cleanMessage === "Password doesnt match") {
      setPasswordError("Password doesn't match");
      ToastAndroid.show("Password doesn't match", ToastAndroid.SHORT);
      return;
    }

    // Default error
    ToastAndroid.show(cleanMessage || "Login failed", ToastAndroid.SHORT);

  } catch (err) {
    const apiError = err?.response?.data;
    console.log("LOGIN ERROR:", apiError || err.message);

    const cleanMessage = apiError?.message?.trim();

    // ❌ Password mismatch
    if (cleanMessage === "Password doesnt match") {
      setPasswordError("Password doesn't match");
      ToastAndroid.show("Password doesn't match", ToastAndroid.SHORT);
      return;
    }

    // ❌ Invalid password
    if (cleanMessage === "Invalid password") {
      setPasswordError("Invalid password");
      ToastAndroid.show("Invalid password", ToastAndroid.SHORT);
      return;
    }

    // ❌ User not found
    if (cleanMessage === "User not found") {
      setEmailError("User not found");
      ToastAndroid.show("User not found", ToastAndroid.SHORT);
      return;
    }

    ToastAndroid.show(cleanMessage || "Login failed. Please try again.", ToastAndroid.SHORT);

  } finally {
    setLocalLoading(false);
  }
};



  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar  backgroundColor="#242098" barStyle="light-content"/>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.logoWrapper}>
            <IMAGE.LOGO width={250} height={100} />
          </View>

          <Text style={styles.title}>EMPLOYEE LOGIN</Text>

<CustomInput
  label="Email ID"
  placeholder="Enter Email Id"
  value={email}
  onChangeText={text => {
    setEmail(text);
    if (emailError) setEmailError(''); // clear error while typing
  }}
 // required
  error={emailError}
/>

<CustomInput
  label="Password"
  placeholder="Enter Password"
  value={password}
  onChangeText={text => {
    setPassword(text);
    if (passwordError) setPasswordError('');
  }}
  secureTextEntry
  //required
  error={passwordError}
/>
        <View style={{ marginTop: verticalScale(18) }}>
  <AnimatedButton
    title="Get OTP"
    loading={loading}
    onPress={handleLogin}
  />
</View>


          {/* <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity> */}
{/* 
         <Text style={styles.subText}>
  Don't have an account?{' '}
  <Text
    style={styles.linkText}
    onPress={() => navigation.navigate('CreateProfile')} // 👈 navigate or handle action
  >
    Create Workspace
  </Text>
</Text> */}

        </View>

        <View style={styles.bottomAgreement}>
  <Text style={styles.agreementText}>
    By continuing, you're agreeing to our{' '}
    <Text style={styles.link} onPress={() => console.log('Main Services')}>
      main services agreement
    </Text>
    ,{' '}
    <Text style={styles.link} onPress={() => console.log('User Terms')}>
      user terms of service
    </Text>{' '}
    and{' '}
    <Text style={styles.link} onPress={() => console.log('Supplemental Terms')}>
      lIftrex supplemental Terms
    </Text>
    . Additional disclosures are available in our{' '}
    <Text style={styles.link} onPress={() => console.log('Privacy Policy')}>
      privacy policy
    </Text>
    .
  </Text>
</View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
   flex: {
    flex: 1,
    backgroundColor: "#242098",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  container: {
    flex: 1,
   
  },
  logoWrapper: {
    alignItems: 'center',
    marginTop:SCREEN_HEIGHT * 0.05,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.white,
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#0066FF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  link: {
    marginTop: 15,
    textAlign: "center",
    color: "#0066FF",
    fontSize: 15,
  },
  bottomAgreement: {
    marginTop: 30,
    paddingBottom: 20,
  },
  agreementText: {
   
    color: Colors.white,
    
    textAlign: 'center',
    lineHeight: 18,
    },
  link: {
  color: Colors.primary,
 
 // textDecorationLine: 'underline',
},
});

export default Login;







// const handleLogin = async () => {
//   let valid = true;

//   // Basic Validation
//   if (!email.includes("@")) {
//     setEmailError("Invalid email address");
//     valid = false;
//   } else setEmailError("");

//   if (password.length < 6) {
//     setPasswordError("Password must be at least 6 characters");
//     valid = false;
//   } else setPasswordError("");

//   if (!valid) return;

//   try {
//     setLocalLoading(true);
//     dispatch(setLoading(true));

//     const payload = { email, password };
//     const { data } = await api.post("/login", payload);

//     console.log("Login Response:", data);

//     // -----------------------------------------------------
//     // ✅ SUCCESS LOGIN
//     // -----------------------------------------------------
//     if (data?.success === 0 && data?.data?.token) {
//       const user = data.data;

//       await AsyncStorage.setItem("token", user.token);
//       await AsyncStorage.setItem("user", JSON.stringify(user));
//       await AsyncStorage.setItem("isFirstLogin", "true");

//       dispatch(setToken(user.token));
//       dispatch(setUser(user));
//       dispatch(setFirstLogin(true));

//       ToastAndroid.show(data?.message || "Login successful!", ToastAndroid.SHORT);
//       navigation.navigate("Welcome");
//       return;
//     }

//     // -----------------------------------------------------
//     // ❌ INVALID PASSWORD (success = 2 AND password_check = 1)
//     // -----------------------------------------------------
//     if (
//       data?.success === 2 &&
//       data?.error?.password_check === 1
//     ) {
//       setPasswordError("Invalid password");
//       ToastAndroid.show("Invalid password", ToastAndroid.SHORT);
//       return;
//     }

//     // -----------------------------------------------------
//     // ❌ USER NOT FOUND (success = 2 BUT NO password_check)
//     // -----------------------------------------------------
//     if (
//       data?.success === 2 &&
//       data?.message === "User not found"
//     ) {
//       setEmailError("User not found");
//       ToastAndroid.show("User not found", ToastAndroid.SHORT);
//       return;
//     }

//     // -----------------------------------------------------
//     // ❌ Fallback
//     // -----------------------------------------------------
//     ToastAndroid.show(data?.message || "Login failed", ToastAndroid.SHORT);

//  } catch (err) {
//   const apiError = err?.response?.data;

//   console.log("LOGIN ERROR:", apiError || err.message);

//   // 👇 If invalid password error came from catch
//   if (apiError?.message === "Invalid password") {
//     setPasswordError("Invalid password");
//     ToastAndroid.show("Invalid password", ToastAndroid.SHORT);
//     return;
//   }

//   // 👇 If user not found came from catch
//   if (apiError?.message === "User not found") {
//     setEmailError("This email is not registered");
//     ToastAndroid.show("User not found", ToastAndroid.SHORT);
//     return;
//   }

//   // 👇 Fallback
//   const message = apiError?.message || "Login failed. Please try again.";
//   ToastAndroid.show(message, ToastAndroid.SHORT);
// }
//  finally {
//     setLocalLoading(false);
//     dispatch(setLoading(false));
//   }
// };