import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const TicketDetails = ({ route , navigation}) => {
  const { id } = route.params;
  const [ticket, setTicket] = useState(null);
  const [type, setType] = useState(null);
  const [comment, setComment] = useState('');

  const getTicket = async () => {
    try {
      const userType = await AsyncStorage.getItem('userType');
      const token = await AsyncStorage.getItem('authToken');
      setType(userType);

      const response = await axios.get(`http://192.168.1.9:3000/api/ticket/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const fetchedTicket = response.data;
        setTicket(fetchedTicket);
      }
    } catch (error) {
      console.error('Error fetching ticket data:', error);
    }
  };

  useEffect(() => {
    getTicket();
  }, []);

  const handleCloseTicket =async () => {
    try {
        const response = await axios.put(  `http://192.168.1.9:3000/api/receiver/tickets/${id}`, {
          comment: comment
        });
  
        if (response.status === 200) {
          navigation.navigate('Tickets');
          alert('Ticket closed successfully');
        } else {
          console.error('closed failed');
        }
      } catch (error) {
        console.error('Error while closing Ticket:', error);
      }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Ticket Details</Text>
      <ScrollView>
      {ticket ? (
        <>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Subject:</Text>
            <Text style={styles.text}>{ticket.subject || 'No subject'}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Department:</Text>
            <Text style={styles.text}>{ticket.department || 'No department'}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Related Service:</Text>
            <Text style={styles.text}>{ticket.related_service || 'No related services'}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Priority:</Text>
            <Text style={styles.text}>{ticket.priority || 'No priority set'}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Message:</Text>
            <Text style={styles.text}>{ticket.message || 'No message'}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Attachment:</Text>
            <Text style={styles.text}>{ticket.attachment || 'No attachment'}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Phase:</Text>
            <Text style={styles.text}>{ticket.phase || 'No phase'}</Text>
          </View>

          {type === 'receiver' && ticket.phase!='closed' ? (
            <>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Comment:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter comment"
                value={comment}
                onChangeText={setComment}
              />
            </View>
            <View style={styles.closeButtonContainer}>
            <Button title="Close Ticket" onPress={handleCloseTicket} />
          </View>
          </>
          ) : (
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Comment:</Text>
              <Text style={styles.text}>{ticket.comment || 'No comment'}</Text>
            </View>
          )}

          
        </>
      ) : (
        <Text>Loading ticket details...</Text>
      )}

      <View style={styles.goBackContainer}>
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  goBackContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  heading: {
    textAlign: 'center',
    fontSize: 35,
    color: 'black',
  },
  fieldContainer: {
    marginBottom: 12,
    backgroundColor: '#D8E4BCEB',
    padding: 6,
    paddingLeft: 15,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'black',
  },
  text: {
    marginBottom: 12,
  },
  closeButtonContainer: {
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    backgroundColor: 'white'
  },
});

export default TicketDetails;
