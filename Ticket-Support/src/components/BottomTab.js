import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import Profile from '../screens/Profile';
import Tickets from '../screens/Tickets';
import Notifications from '../screens/Notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';



const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator 
    
   screenOptions={(
        { route }) => ({
        tabBarIcon: ({ focused, size , color}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home';
          } 
          else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user';
          }
          else if (route.name === 'Tickets') {
            iconName = focused ? 'clipboard' : 'clipboard';
          }
          else if (route.name === 'Notification') {
            iconName = focused ? 'bell' : 'bell';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color}/>;
        },
        tabBarActiveTintColor: '#FADA5E',
        tabBarInactiveTintColor: 'lightgray',
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle:{
            backgroundColor: '#3F704D',
            height: '8%',
            width: '100%'

        },
        tabBarItemStyle:{
      flex: 1, // Use flex: 1 to make items take equal space
      borderRadius: 40,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center', // Center items horizontally
      margin: 8, // Add margin to c
      marginLeft: 23,
      marginRight: 25
    },
      
      })} >
        <Tab.Screen name="Home" component={Home}  />
        <Tab.Screen name="Tickets" component={Tickets}/>
        {/* <Tab.Screen name="Notification" component={Notifications}/> */}
        <Tab.Screen name="Profile" component={Profile}  />
        
        
      </Tab.Navigator>

  );
}

export default BottomTab;