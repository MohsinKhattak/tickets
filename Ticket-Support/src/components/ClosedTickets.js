import { FlatList} from 'react-native'
import React, {useState, useEffect} from 'react'
import TicketsCom from './Tickets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const { format, parseISO } = require('date-fns');


export default function ClosedTickets({navigation}) {
    const[data, setData]= useState()
    async function getTikets() {
        try {
          const type = await AsyncStorage.getItem('userType');
          const token = await AsyncStorage.getItem('authToken')
          const response = await axios.get(`http://192.168.1.9:3000/api/${type}/closed`,
          { headers: {
            Authorization: `Bearer ${token}`,
          }});
          if (response.status === 200) {
            const tickets = response.data;
            console.log(tickets);
            setData(tickets);
          }
        } catch (error) {
          console.error('Error fetching closed tickets:', error);
        }
      }
    
      useEffect(() => {
        getTikets();
      }, []);

      
      
      const renderHandler=(item)=>{
          // Parse the input date string into a Date object
          const parsedDate = parseISO(item.item.createdAt);
  
          // Format the parsed date into the desired format
          const formattedDate = format(parsedDate, 'dd MMM yyyy');
          console.log(formattedDate)
  
          return  <TicketsCom phase={item.item.phase} white={false} Navigation={navigation} id={item.item.id} date={formattedDate} depart={item.item.department} problem={item.item.message} priority={item.item.priority}/>
      }
    return (
    <FlatList style={{flex: 0.7}} data={data} renderItem={renderHandler}></FlatList>
      )
}