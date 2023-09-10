import { View, Text, StyleSheet , FlatList} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ActiveTicket from '../components/ActiveTicket';
import TicketButton from '../components/TicketButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TicketsCom from '../components/Tickets';
const { format, parseISO } = require('date-fns');


export default function Home({navigation}) {

  const[ data, setData] = useState()
  const [type , setType] = useState('')
  const[ name, setName ] = useState('');
  

  const renderHandler=(item)=>{
    // Parse the input date string into a Date object
    const parsedDate = parseISO(item.item.createdAt);
      
    // Format the parsed date into the desired format
    const formattedDate = format(parsedDate, 'dd MMM yyyy')
    return(
      <TicketsCom phase={item.item.phase} white={true} Navigation={navigation} id={item.item.id} date={formattedDate} depart={item.item.department} problem={item.item.message} priority={item.item.priority}/>
    )
  }
  const openTicketPage = () => {
    navigation.navigate('openTicket');
  };

  const viewTicket = () => {
    navigation.navigate('Tickets');
  };

  const viewClosedTicket = () => {
    navigation.navigate('Closed');
  };


  async function getTikets () {
    const type = await AsyncStorage.getItem('userType')
    console.log(type)
      try {
        const token = await AsyncStorage.getItem('authToken')
        const response = await axios.get(`http://192.168.1.9:3000/api/${type}/active`,
        { headers: {
          Authorization: `Bearer ${token}`,
        }});
        if (response.status === 200) {
          const tickets = response.data
          console.log(tickets);
          setData(tickets);
        }
      } catch (error) {
        console.error('Error fetching  active tickets:', error);
      }
    }       

  getType =async()=>{
    const type = await AsyncStorage.getItem('userType');
    setType(type);
  }
  useEffect(async() => {
    await getType();
    await getTikets();
  }, []);
  return (
    <View style={{flex:1}}>
      <Header/>
      {type==='sender'?<View style={styles.buttonCon}>
        <Button title="Open A Ticket" click={openTicketPage} />
      </View>:<></>}
      

      <View style={styles.activeTicketCon}>
        <View style={styles.smallActiveTicketCon}>
          <View style={styles.headingContent}>
            <Text style={styles.heading}>Active Tickets</Text>
            <Icon name="arrow-right" size={25} color="#181A18" />
          </View>
          {data?
          <FlatList data={data} renderItem={renderHandler} style={styles.ticketList}></FlatList>
        :<Text>No active Tickets yet</Text>}
        </View>
      </View>
      <View style={styles.buttonsCon}>
      <TicketButton title={'Total Tickets'} bgColor= {'#FADA5E'} iconPath={require('../assets/Icons/nfc.png')} onPressFunc={viewTicket}/>
      <TicketButton title={'Closed Tickets'} bgColor= {'#FF0000'} iconPath={require('../assets/Icons/contactless.png')} onPressFunc={viewClosedTicket}/>

      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  buttonCon:{
    flex: 0.2,
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#D8E4BC',
    paddingLeft:'10%'
    
  },
  activeTicketCon:{
    flex: 1,
  },
  smallActiveTicketCon:{
    backgroundColor: '#D8E4BC',
    flex:1,
    margin: '8%',
    borderRadius: 20,
    padding: '5%'
  },
  headingContent:{
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  heading:{
    fontSize: 20,
    color: 'black',
    fontWeight: '500'
  },
  buttonsCon:{
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: '3%'
  },
  ticketList:{
    flex:0.7
  },
  tabNav:{
    flex: 0.2
  }
})