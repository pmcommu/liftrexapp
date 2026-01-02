import { createNativeStackNavigator } from "@react-navigation/native-stack";



import Splash from '../screens/homestack/Splash'
import TabNavigation from './TabNavigation';
import Scheduling from '../screens/collection/Scheduling'
import SchedulingDetails from '../screens/collection/SchedulingDetails'
import TaskDetails from '../componests/scheduling/TaskDetails'
import Portfolio from '../screens/collection/Portfolio'

import PermissionAccess from '../screens/homestack/PermissionAccess'
import NewComments from '../componests/scheduling/NewComments'

//////. Portfilio////

import CreateInquiry  from "../componests/portfolio/createpage/CreateInquiry";
import ProjectDashboard from "../componests/portfolio/ProjectDashboard"
import ProjectDetails from "../componests/portfolio/ProjectDetails";
import CreateProposal from "../componests/portfolio/createpage/CreateProposal"
import H_CreateProposal from "../componests/portfolio/createpage/H_CreateProposal"
import ProposalForm from "../componests/portfolio/createpage/ProposalForm"
import H_ProposalForm from "../componests/portfolio/createpage/H_ProposalForm"
import FinalPricing from "../componests/portfolio/FinalPricing"
import CreatePaymentPhases from '../componests/portfolio/CreatePaymentPhases';
import UpdatePaymentPhases from '../componests/portfolio/UpdatePaymentPhases';
import ViewFinalPricing from "../componests/portfolio/ViewFinalPricing"
import EditFinalPricing from "../componests/portfolio/EditFinalPricing"
import EditProjectDetails from "../componests/portfolio/EditProjectDetails";
const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
   <Stack.Navigator
  screenOptions={{
    headerShown: false,

   animation: "slide_from_right", // 🔥 smooth slide
   animationDuration: 280,        // optional
   gestureEnabled: true,          // iOS swipe back
  }}
>

      
      {/* MAIN HOME */}
     {/* <Stack.Screen name="Splash" component={Splash} /> */}
      
          
         <Stack.Screen name="Home" component={TabNavigation} />
          <Stack.Screen name="Scheduling" component={Scheduling} />
           <Stack.Screen name="SchedulingDetails" component={SchedulingDetails} />           
           <Stack.Screen name="TaskDetails" component={TaskDetails} />
              <Stack.Screen name="Portfolio" component={Portfolio} />
            
               <Stack.Screen name="NewComments" component={NewComments} />
                   <Stack.Screen name="PermissionAccess" component={PermissionAccess} />

                   {/* //////////   //////. Portfilio//// /////////////////*/}

                    <Stack.Screen name="CreateInquiry" component={CreateInquiry} />
                     <Stack.Screen name="ProjectDashboard" component={ProjectDashboard} />
                      <Stack.Screen name="ProjectDetails" component={ProjectDetails} />
                       <Stack.Screen name="CreateProposal" component={CreateProposal} />
                         <Stack.Screen name="H_CreateProposal" component={H_CreateProposal} />
                        <Stack.Screen name="FinalPricing" component={FinalPricing} />
                          <Stack.Screen name="ProposalForm" component={ProposalForm} />
                             <Stack.Screen name="H_ProposalForm" component={H_ProposalForm} />
                            <Stack.Screen name="CreatePaymentPhases" component={CreatePaymentPhases} />
                             <Stack.Screen name="UpdatePaymentPhases" component={UpdatePaymentPhases} />
                             <Stack.Screen name="ViewFinalPricing" component={ViewFinalPricing} />
                              <Stack.Screen name="EditFinalPricing" component={EditFinalPricing} />
                               <Stack.Screen name="EditProjectDetails" component={EditProjectDetails} />
                            

    </Stack.Navigator>
  );
}
