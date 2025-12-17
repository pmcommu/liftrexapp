import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { moderateScale } from "../../constants/Dimmence";
import Colors from "../../constants/Colors";
import * as IMAGE from "../../assets/svg/index"
import { useSelector } from "react-redux";
const Collections = () => {
  const navigation = useNavigation();


  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const allowedModules = user?.permissions?.map(p => p.module) || [];

  console.log('userData',user)



  // 🔥 Simple Collection Array (inside component)
const fullAccessModules =
  user?.permissions
    ?.filter(p => p.isFullAccess === true)
    .map(p => p.module) || [];

const collections = [
  { label: "Portfolio", icon: IMAGE.PORTFOLIO, screen: "Portfolio", module: "PROPOSAL" },
  { label: "Inventory", icon: IMAGE.INVENTORY, screen: "InventoryScreen", module: "INVENTORY" },
  { label: "Maintenance", icon: IMAGE.MAINTEN, screen: "MaintenanceScreen", module: "MAINTENANCE" },
  { label: "Chat Room", icon: IMAGE.CHATROOM, screen: "ChatRoomScreen", module: "CHAT_ROOM" },
  { label: "Finance", icon: IMAGE.FINANCE, screen: "FinanceScreen", module: "ACCOUNTS" },
  { label: "Procurement", icon: IMAGE.PROCUREMENT, screen: "ProcurementScreen", module: "PROCUREMENT" },
  { label: "Scheduling", icon: IMAGE.SCHEDULING, screen: "Scheduling", module: "SCHEDULING" },
  { label: "Careers", icon: IMAGE.CAREERS, screen: "CareersScreen", module: "ADMIN" },
];

// ✅ filter by full access
const filteredCollections = collections.filter(item =>
  fullAccessModules.includes(item.module)
);


  return (
    <View style={{ marginTop: 15,marginHorizontal:10, }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", color: Colors.textDark }}>
        Collections
      </Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 12 }}>
     {filteredCollections.map((item, index) => (
  <TouchableOpacity
    key={index}
    style={{
      width: "25%",
      alignItems: "center",
      marginVertical: 12,
    }}
    onPress={() => navigation.navigate(item.screen)}
    activeOpacity={0.7}
  >
    <View
      style={{
        width: moderateScale(52),
        height: moderateScale(52),
        borderRadius: moderateScale(16),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
      }}
    >
      <item.icon width={35} height={35} />
    </View>

    <Text
      style={{
        fontSize: moderateScale(12),
        color: Colors.textDark,
        marginTop: 6,
        textAlign: "center",
        fontWeight: '500',
      }}
    >
      {item.label}
    </Text>
  </TouchableOpacity>
))}

      </View>
    </View>
  );
};

export default Collections;
