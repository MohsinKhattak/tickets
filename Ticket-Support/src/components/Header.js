import React, { useEffect, useState } from 'react';
import { Appbar , Avatar} from 'react-native-paper';
import { Platform, StyleSheet, View , Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export default function Header(props) {
  const[type, setType] = useState('')
  const[name , setName ]= useState('name')
  useEffect(() => {
    // Retrieve the user's name from AsyncStorage
    AsyncStorage.getItem('userName')
      .then((response) => {
        console.log(response)
        setName(response || 'User'); // Set the name state
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }, []);
  const getAvatar = (name) => {
    const names = name.split(' ');
    let avatarText = '';
    names.forEach((n) => {
      avatarText += n.charAt(0);
    });
    return avatarText;
  };
  
  return (
    <View style={styles.container}>
       <Appbar.Header style={styles.headContainer} >
        <Appbar.Content title={<Avatar.Text size={60} label={getAvatar(name)} backgroundColor={'#FADA5E'} color='#181A18' />}/>
      </Appbar.Header>
      <View style={styles.content}>
        <Text style={styles.contentT1}>Welcome Back</Text>
        <Text style={styles.contentT2}>{name}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:0.4,
    borderRadius: 15,
    borderBottom: 1,
    backgroundColor: '#D8E4BCEB',
    padding: '5%',
    paddingRight: '7%'
  },
  headContainer:{
    backgroundColor: '#D8E4BCEB',
  },
  content:{
    margin: '10%',
    marginLeft: '5%'
  },
  contentT1:{
    fontSize: 18,
    color: 'black',

  },
  contentT2:{
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold'
    
  }

});