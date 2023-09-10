import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import FirstScreen from '../screens/FirstScreen';
import Signup from '../screens/Signup';
import BottomTab from './BottomTab';
import OpenTicket from '../screens/OpenTicket';
import TicketDetails from '../screens/TicketDetails';

const Stack = createStackNavigator();

const StackNav= ()=> { 
  return (
   
      <Stack.Navigator initialRouteName='FirstScreen' screenOptions={{headerShown: false}}>
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Tab" component={BottomTab} />
        <Stack.Screen name="openTicket" component={OpenTicket} />
        <Stack.Screen name="TicketDetails" component={TicketDetails} />

      </Stack.Navigator>
  )
}

export default StackNav;