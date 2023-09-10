import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import TicketsCom from './Tickets'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const { format, parseISO } = require('date-fns');

export default function RecentAssign() {
   
    const[data, setData]= useState()
    const renderHandler=(item)=>{
        const parsedDate = parseISO(item.item.createdAt);
        const formattedDate = format(parsedDate, 'dd MMM yyyy');
        return  <TicketsCom phase={item.item.phase} date={formattedDate} depart={item.item.department} problem={item.item.message} priority={item.item.priority}/>
    }

    async function getTikets() {
        try {

          const token = await AsyncStorage.getItem('authToken');
          const type = await AsyncStorage.getItem('userType');
          const response = await axios.get(`http://192.168.1.9:3000/api/${type}/tickets`,
          { headers: {
            Authorization: `Bearer ${token}`,
          }});
          if (response.status === 200) {
            const tickets = response.data;
            console.log(tickets);
            setData(tickets)
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      }

    useEffect(async()=>{await getTikets()},[])
    return (
    <FlatList style={{flex: 0.7}} data={data} renderItem={renderHandler}></FlatList>
   )
}