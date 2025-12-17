import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/authstack/Login";
import OtpVerify from '../screens/authstack/OtpVerify'
import Splash from '../screens/homestack/Splash'
const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
     {/* <Stack.Screen name="Splash" component={Splash} /> */}
        <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="OtpVerify" component={OtpVerify} />
    </Stack.Navigator>
  );
}
