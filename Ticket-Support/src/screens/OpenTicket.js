import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button , ScrollView} from 'react-native';
import axios from 'axios';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateTicket({ navigation }) {
  const [subject, setSubject] = useState('');
  const [department, setDepartment] = useState('');
  const [relatedService, setRelatedService] = useState('');
  const [priority, setPriority] = useState('');
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Fetch the token from AsyncStorage when the component mounts
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('authToken');
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Error while fetching token:', error);
      }
    };

    fetchToken();
  }, []); // Empty dependency array ensures this effect runs once on mount

  const handleCreateTicket = async () => {
    try {
      if (!token) {
        console.error('Token is missing.');
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post('http://192.168.1.9:3000/api/ticket/create', {
        subject,
        department,
        related_service: relatedService,
        priority,
        message,
        attachment,
      }, {
        headers,
      });

      if (response.status === 201) {
        console.log('Ticket created successfully');
        navigation.navigate('Tab');
      } else {
        console.error('Ticket creation failed');
      }
    } catch (error) {
      console.error('Error while creating ticket:', error);
    }
  };


  return (
    <ScrollView style={styles.container}>
      <Header/>
      <View style={styles.smallCon}>
      <TextInput
        style={styles.input}
        placeholder="Subject"
        value={subject}
        onChangeText={setSubject}
      />
      <TextInput
        style={styles.input}
        placeholder="Department"
        value={department}
        onChangeText={setDepartment}
      />
      <TextInput
        style={styles.input}
        placeholder="Related Service"
        value={relatedService}
        onChangeText={setRelatedService}
      />
      <TextInput
        style={styles.input}
        placeholder="Priority"
        value={priority}
        onChangeText={setPriority}
      />
      <TextInput
        style={styles.input}
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Attachment"
        value={attachment}
        onChangeText={setAttachment}
      />
      <TouchableOpacity style={styles.createButton} onPress={handleCreateTicket}>
        <Text style={styles.buttonText}>Create Ticket</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.goBackContainer}>
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  smallCon:{
    flex:1,
    padding: 20,

  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  createButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  goBackContainer: {
    alignItems: 'center',
    // marginTop: 16,
  },
});
