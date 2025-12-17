// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import Login from '../screens/authstack/Login';
// import Home from '../screens/homestack/Home';
// import Splash from '../screens/homestack/Splash'
// import TabNavigation from './TabNavigation';
// import Scheduling from '../screens/collection/Scheduling'
// import SchedulingDetails from '../screens/collection/SchedulingDetails'
// import TaskDetails from '../componests/scheduling/TaskDetails'
// import Portfolio from '../screens/collection/Portfolio'
// import CreateInquiry from '../componests/portfolio/CreateInquiry'
// import OtpVerify from '../screens/authstack/OtpVerify'
// const Stack = createNativeStackNavigator();

// export default function RootNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="Splash" component={Splash} />
//         <Stack.Screen name="Login" component={Login} />
//            <Stack.Screen name="OtpVerify" component={OtpVerify} />
//         <Stack.Screen name="Home" component={TabNavigation} />
//          <Stack.Screen name="Scheduling" component={Scheduling} />
//           <Stack.Screen name="SchedulingDetails" component={SchedulingDetails} />
//            <Stack.Screen name="TaskDetails" component={TaskDetails} />
//              <Stack.Screen name="Portfolio" component={Portfolio} />
//             <Stack.Screen name="CreateInquiry" component={CreateInquiry} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }



import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";

import { setAuth, logout } from "../redux/Slices/authSlice";

import AuthStack from "./AuthStack";
import HomeStack from "./HomeStack";
import Splash from "../screens/homestack/Splash";

export default function RootNavigator() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restore = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const storedUser = await AsyncStorage.getItem("user");

        if (storedToken && storedUser) {
          dispatch(setAuth({ token: storedToken, user: JSON.parse(storedUser) }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    restore();
  }, []);

  return (
    <NavigationContainer>
      {loading ? (
        <Splash />
      ) : token ? (
        <HomeStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}