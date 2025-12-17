import { createNativeStackNavigator } from "@react-navigation/native-stack";



import Splash from '../screens/homestack/Splash'
import TabNavigation from './TabNavigation';
import Scheduling from '../screens/collection/Scheduling'
import SchedulingDetails from '../screens/collection/SchedulingDetails'
import TaskDetails from '../componests/scheduling/TaskDetails'
import Portfolio from '../screens/collection/Portfolio'
import CreateInquiry from '../componests/portfolio/CreateInquiry'
import PermissionAccess from '../screens/homestack/PermissionAccess'
import NewComments from '../componests/scheduling/NewComments'
const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      {/* MAIN HOME */}
     {/* <Stack.Screen name="Splash" component={Splash} /> */}
      
          
         <Stack.Screen name="Home" component={TabNavigation} />
          <Stack.Screen name="Scheduling" component={Scheduling} />
           <Stack.Screen name="SchedulingDetails" component={SchedulingDetails} />           
           <Stack.Screen name="TaskDetails" component={TaskDetails} />
              <Stack.Screen name="Portfolio" component={Portfolio} />
             <Stack.Screen name="CreateInquiry" component={CreateInquiry} />
               <Stack.Screen name="NewComments" component={NewComments} />
                   <Stack.Screen name="PermissionAccess" component={PermissionAccess} />

    </Stack.Navigator>
  );
}
