import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";

import Home from "./../screens/homestack/Home";
import Projects from "./../screens/homestack/Projects";
import TaskRoom from "./../screens/homestack/TaskRoom";
import Payments from "./../screens/homestack/Payment";
import More from "./../screens/homestack/More";

import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const user = useSelector((state) => state.auth.user);

  // ✅ only FULL ACCESS modules
  const fullAccessModules =
    user?.permissions
      ?.filter(p => p.isFullAccess === true)
      .map(p => p.module) || [];

  const hasAccess = (module) => fullAccessModules.includes(module);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 80,
          paddingBottom: 8,
          paddingTop: 6,
          backgroundColor: "#fff",
        },
        tabBarActiveTintColor: "#F15A24",
        tabBarInactiveTintColor: "#6B7280",

        tabBarIcon: ({ color }) => {
          if (route.name === "Home") {
            return <MaterialCommunityIcons name="home-outline" size={28} color={color} />;
          }
          if (route.name === "Projects") {
            return <Feather name="copy" size={25} color={color} />;
          }
          if (route.name === "Task Room") {
            return <MaterialCommunityIcons name="layers-outline" size={22} color={color} />;
          }
          if (route.name === "Payments") {
            return <Feather name="file-text" size={22} color={color} />;
          }
          if (route.name === "More") {
            return <Octicons name="kebab-horizontal" size={22} color={color} />;
          }
        },

        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 2,
        },
      })}
    >
      {/* ✅ Home usually default hota hai */}
      <Tab.Screen name="Home" component={Home} />

      {hasAccess("PROJECT") && (
        <Tab.Screen name="Projects" component={Projects} />
      )}

      {hasAccess("TASK_ROOM") && (
        <Tab.Screen name="Task Room" component={TaskRoom} />
      )}

      {hasAccess("PAYMENT") && (
        <Tab.Screen name="Payments" component={Payments} />
      )}

      {/* ✅ More generally allowed */}
      <Tab.Screen name="More" component={More} />
    </Tab.Navigator>
  );
}
