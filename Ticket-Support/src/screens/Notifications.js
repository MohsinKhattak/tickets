import { View, Text } from 'react-native'
import React,{useEffect, useState} from 'react'
import Header from '../components/Header'
import { FlatList } from 'react-native-gesture-handler'
import NotificationCom from '../components/NotificationCom'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'


export default function Notifications() {
    const[type , setType] = useState(null)
    const[data, setData]= useState()
    async function getData () {
      console.log(type)
        try {
          const type = await AsyncStorage.getItem('userType')
          const token = await AsyncStorage.getItem('authToken')
          if (type !== null) {
            setType(type);
          } else {
            console.error('User type not found in AsyncStorage.');
            return
          }
          const response = await axios.get(`http://192.168.1.9:3000/api/${type}/pending`,
          { headers: {
            Authorization: `Bearer ${token}`,
          }});
          if (response.status === 200) {
            const tickets = response.data
            console.log(tickets);
            setData(tickets);
          }
          else{
            console.log('no ticket')
          }
        } catch (error) {
          console.error('Error fetching  pending tickets:', error);
        }
      }
      useEffect(()=>{getData()}, [])
    
    const renderHandler=(item)=>{
        return < NotificationCom user={item.item.user} date={item.item.date} depart={item.item.depart} problem={item.item.problem} priority={item.item.priority}/>
    }
  return (
    <View style={{flex:1}}>
    <Header/>
    <Text style={{
      backgroundColor: '#D8E4BCEB', 
      paddingLeft: '9%',
      flex: 0.1, 
      fontSize: 25, 
      padding: 10, 
      textAlign: 'center', 
      color: 'black',
      fontWeight: 'bold',
      }}>Notifications</Text>
      <FlatList style={{flex: 0.7}} data={data} renderItem={renderHandler}/>
    
  </View>
  )
}