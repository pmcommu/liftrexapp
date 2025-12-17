import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  ToastAndroid,
  PanResponder,TouchableOpacity
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/Slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../../constants/Colors";
import {
  fontScale,
  verticalScale,
} from "../../constants/Dimmence";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DeviceInfo from "react-native-device-info";


const { width, height } = Dimensions.get("window");

export default function Sidebar({ visible, onClose, navigation }) {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const slideAnim = useRef(new Animated.Value(-width)).current;
  const [mounted, setMounted] = useState(visible);

  /* ================= PAN RESPONDER ================= */
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) =>
        Math.abs(g.dx) > Math.abs(g.dy) && Math.abs(g.dx) > 20,

      onPanResponderMove: (_, g) => {
        if (g.dx < 0) {
          slideAnim.setValue(Math.max(g.dx, -width));
        }
      },

      onPanResponderRelease: (_, g) => {
        if (g.dx < -width * 0.3) {
          Animated.timing(slideAnim, {
            toValue: -width,
            duration: 220,
            useNativeDriver: false,
          }).start(() => onClose());
        } else {
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 220,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  /* ================= OPEN / CLOSE ================= */
  useEffect(() => {
    if (visible) setMounted(true);

    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -width,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      if (!visible) setMounted(false);
    });
  }, [visible]);

  if (!mounted) return null;

  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    try {
      dispatch(logout());
      await AsyncStorage.multiRemove(["token", "user"]);
      ToastAndroid.show("Logged out successfully", ToastAndroid.SHORT);
    } catch {
      ToastAndroid.show("Logout failed", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.wrapper}>
      {/* OVERLAY */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      {/* SIDEBAR */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.sidebar,
          {
            transform: [{ translateX: slideAnim }],
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        {/* ================= PROFILE ================= */}
        <View style={styles.profileBox}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Text style={styles.role}>{user?.roleName}</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>

          <TouchableOpacity >
  <View style={styles.profileIcon}>
    <Icon name="user" size={22} color={Colors.primary} />
  </View>
</TouchableOpacity>

        </View>

        {/* ================= OPTIONS ================= */}
        <MenuItem
          icon="user"
          label="Account Details"
          onPress={() => {
            onClose();
            navigation.navigate("AccountDetails");
          }}
        />

        <MenuItem
          icon="shield"
          label="Permission & Access"
          onPress={() => {
            onClose();
            navigation.navigate("PermissionAccess");
          }}
        />

        {/* <MenuItem
          icon="info"
          label="System Information"
          onPress={() => {
            onClose();
            navigation.navigate("SystemInfo");
          }}
        /> */}

        {/* ================= LOGOUT ================= */}
        <View style={styles.logoutBox}>
          <MenuItem
            icon="log-out"
            label="Logout"
            danger
            onPress={handleLogout}
          />
        </View>

        {/* ================= FOOTER ================= */}
      <View
  style={[
    styles.footer,
    { bottom: insets.bottom + 12 } // ✅ SAFE & DYNAMIC
  ]}
>
  <Text style={styles.footerText}>
    App Version: {DeviceInfo.getVersion()}
  </Text>
</View>


      </Animated.View>
    </View>
  );
}

/* ================= MENU ITEM ================= */
const MenuItem = ({ icon, label, onPress, danger }) => (
  <RectButton rippleColor="#00000020" onPress={onPress}>
    <View style={styles.row}>
      <Icon
        name={icon}
        size={20}
        color={danger ? "red" : Colors.primary}
      />
      <Text
        style={[
          styles.rowText,
          danger && { color: "red" },
        ]}
      >
        {label}
      </Text>
    </View>
  </RectButton>
);

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width,
    height,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
sidebar: {
  position: "absolute",
  width: width * 0.85,
  height: "100%",
  backgroundColor: "#fff",
  elevation: 8,
  paddingBottom: 70, // 👈 footer ke liye space
},


  profileBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    margin: 12,
    borderRadius: 12,
    backgroundColor: "#f7f7f7",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginLeft: 12,
  },
  profileIcon: {
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: "#ffffff",
  alignItems: "center",
  justifyContent: "center",
},

  name: {
    fontSize: fontScale(16),
    fontWeight: "700",
    color: Colors.black,
  },
  role: {
    fontSize: fontScale(13),
    color: Colors.primary,
    marginTop: 2,
  },
  email: {
    fontSize: fontScale(12),
    color: Colors.grey,
    marginTop: 2,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  rowText: {
    marginLeft: 14,
    fontSize: fontScale(14),
    color: Colors.black,
  },

  logoutBox: {
    borderTopWidth: 0.6,
    borderTopColor: "#ddd",
    marginTop: 10,
  },

footer: {
  position: "absolute",
  left: 0,
  right: 0,
  marginBottom:50,
  paddingVertical: 12,
  borderTopWidth: 0.6,
  borderTopColor: "#ddd",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fff",
},


footerText: {
  fontSize: fontScale(14),
  color: Colors.grey,
  textAlign: "center",
},

});
