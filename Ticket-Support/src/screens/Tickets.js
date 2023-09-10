import { View, Text , StyleSheet} from 'react-native'
import React,{useState, useEffect} from 'react'
import Header from '../components/Header'
import TopTab from '../components/TopTab'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function Tickets() {
  

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
        }}>Ticket</Text>
      <TopTab style={{flex: 1}}/>
    </View>
  )
}


