import React ,{useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,StatusBar,Alert
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
import * as IMAGE from "../../assets/svg/index"
import DeviceInfo from "react-native-device-info";

import Feather from "react-native-vector-icons/Feather";
import AlertCarousel from "../../componests/home/AlertCarousel";
import Collections from "../../componests/home/Collections"
import PortfolioCard from "../../componests/home/PortfolioCard"
import TaskCard from "../../componests/home/TaskCard"
import ProcurementCard from "../../componests/home/ProcurementCard"
import { SafeAreaView ,useSafeAreaInsets} from "react-native-safe-area-context";
import { useSelector ,useDispatch} from "react-redux";
import Icon from "react-native-vector-icons/Feather";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../../redux/Slices/authSlice";
import Sidebar from '../../componests/all/Sidebar'
const Home = ({navigation}) => {

const user = useSelector((state) => state.auth.user);
const token = useSelector((state) => state.auth.token);
const dispatch = useDispatch();

const [sidebarVisible, setSidebarVisible] = useState(false);

console.log('userData',user)
console.log('Token',token)

const handleProfilePress = () => {
  setSidebarVisible(true);
};


  const deviceId = DeviceInfo.getUniqueId();
  console.log(deviceId)
     const insets = useSafeAreaInsets();
const [showMenu, setShowMenu] = useState(false);

const toggleMenu = () => {
  setShowMenu(!showMenu);
};


     const handleLogout = async () => {
  try {
    // 1️⃣ Storage Clear
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");

    // 2️⃣ Redux Clear
    dispatch(logout());

    // 3️⃣ RootNavigator automatically Login screen show karega
  } catch (error) {
    console.log("Logout Error:", error);
  }
};

const handleProfileClick = () => {
  Alert.alert(
    "Logout",
    "Are you sure you want to logout?",
    [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: handleLogout }
    ]
  );
};

  return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
         {/* Header */}
          <StatusBar
                 translucent
                 backgroundColor="rgba(0, 0, 0, 0)"
                 barStyle="dark-content"
               />
     <View style={styles.header}>
  
<IMAGE.LOGO width={140} height={50} style={styles.logo}/>
  <View style={styles.headerRight}>
    {/* Notification Icon */}
    {/* <Feather
      name="bell"
      size={moderateScale(24)}
      color={Colors.textDark}
    /> */}
<IMAGE.NOTIFICATION width={40} height={30} />
    {/* Profile Image */}
<TouchableOpacity onPress={handleProfilePress}>
  <View style={styles.profileImage}>
    <Icon name="user" size={22} color="#fff" />
  </View>
</TouchableOpacity>





  </View>
</View>

    <ScrollView  
    showsVerticalScrollIndicator={false} 
    contentContainerStyle={styles.content}>
      
    
      {/* Urgent Card */}
      <AlertCarousel />
      {/* Collections */}

      <Collections navigation={navigation}/>
    
      {/* <PortfolioCard/>

      <TaskCard/>

      <ProcurementCard /> */}

    </ScrollView>

    {showMenu && (
  <View style={styles.menuPopup}>
    <TouchableOpacity onPress={handleProfileClick} style={styles.menuButton}>
      <Text style={styles.menuText}>Logout</Text>
    </TouchableOpacity>
  </View>
)}

<Sidebar navigation={navigation} visible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    
  },


  // ---- Header ----
  header: {
    marginHorizontal:10,
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom:5,
  alignItems: "center",
},

logo: {
  marginLeft:5,
  fontSize: moderateScale(28),
  fontWeight: "800",
  color: Colors.primary,
},

headerRight: {
  flexDirection: "row",
  alignItems: "center",
  gap: moderateScale(15),
},

profileImage: {
  width: moderateScale(37),
  height: moderateScale(37),
  borderRadius: moderateScale(40) / 2,
  backgroundColor: Colors.bgLight,
},

profileImage: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: Colors.primary, // icon bg
  alignItems: "center",
  justifyContent: "center",
},
  // ---- Alert ----
 content: {
    //marginHorizontal: 15,                  
    paddingBottom: 50,           
  },

  // ---- Collections ----
  collectionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: verticalScale(10),
  },
  collectionItem: {
    width: "25%",
    alignItems: "center",
    marginVertical: verticalScale(10),
  },
  collectionIcon: {
    width: moderateScale(45),
    height: moderateScale(45),
    borderRadius: Radius.md,
    backgroundColor: Colors.bgLight,
    marginBottom: moderateScale(5),
  },
  collectionLabel: {
    fontSize: moderateScale(12),
    color: Colors.textDark,
    textAlign: "center",
  },

  // ---- Section ----


  // ---- Cards ----
  card: {
    backgroundColor: Colors.white,
    padding: moderateScale(15),
    marginTop: moderateScale(15),
    borderRadius: Radius.md,
    borderWidth: D.onePixel,
    borderColor: Colors.border,
  },
  cardTitle: {
    fontSize: moderateScale(14),
    fontWeight: "700",
  },
  cardSub: {
    color: Colors.textMedium,
    marginTop: moderateScale(5),
    fontSize: moderateScale(12),
  },
  badgesRow: { flexDirection: "row", marginTop: moderateScale(10) },
  badge: {
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(10),
    borderRadius: Radius.sm,
  },
  badgeText: { fontSize: moderateScale(11), color: Colors.white },
  cardFooter: {
    marginTop: verticalScale(10),
    fontSize: moderateScale(12),
    color: Colors.textLight,
  },

  // ---- Task Card ----
  taskCard: {
    padding: moderateScale(15),
    borderRadius: Radius.md,
    borderWidth: D.onePixel,
    borderColor: Colors.border,
    marginTop: moderateScale(15),
  },
  taskTitle: { fontSize: moderateScale(16), fontWeight: "700" },
  taskSub: { fontSize: moderateScale(12), color: Colors.textMedium },

  redBtn: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
    backgroundColor: Colors.primary,
    borderRadius: Radius.sm,
    marginTop: verticalScale(10),
    alignSelf: "flex-start",
  },
  redBtnText: { color: Colors.white, fontSize: moderateScale(12) },

  // ---- Proc Card ----
  procCard: {
    padding: moderateScale(15),
    borderWidth: D.onePixel,
    borderRadius: Radius.md,
    borderColor: Colors.border,
    marginTop: moderateScale(15),
  },
  procTitle: { fontSize: moderateScale(15), fontWeight: "700" },

  menuPopup: {
  position: "absolute",
  top: 100,
  right: 10,
  backgroundColor: "#fff",
  padding: 12,
  borderRadius: 10,
  elevation: 5,
  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 2 },
},
menuButton: {
  paddingVertical: 6,
},
menuText: {
  fontSize: 16,
  color: "red",
  fontWeight: "600",
},

});

export default Home;
