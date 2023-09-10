import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Avatar } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const Profile = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [userType, setUserType] = useState('');
  const [token, setToken] = useState('');

  async function getUserData() {
    try {
      const storedUserType = await AsyncStorage.getItem('userType')
      const token = await AsyncStorage.getItem('authToken')

      setUserType(storedUserType);
      setToken(token);
      console.log(storedUserType);
      const response = await axios.get(`http://192.168.1.9:3000/api/${storedUserType}/`,
      { headers: {
        Authorization: `Bearer ${token}`,
      }});
      if (response.status === 200) {
        const userData = response.data;
        setName(userData.username);
        setEmail(userData.email);
        setAddress(userData.address);
        setPhone(userData.phone);
        console.log(userData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };

  const handleEdit = async () => {
    if(address!='' && name != '' && email !=""){
      try {
        console.log(token)

        const response = await axios.put(`http://192.168.1.9:3000/api/${userType}/`,
        {
          username: name, 
          email: email, 
          address: address,
          phone: phone
        },
        { headers: {
          Authorization: `Bearer ${token}`,
        }});
        if (response.status === 200) {
          const userData = response.data;
          console.log(userData)
        }
      } catch (error) {
        console.error('Error editing data:', error)
      }

    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              // Implement the logic to delete the user's account on the server
              await axios.delete(`http://192.168.1.9:3000/api/${userType}/`,
              { headers: {
                Authorization: `Bearer ${token}`,
              }});

              await AsyncStorage.clear();
              navigation.navigate('Login');
            } catch (error) {
              console.error('Error while deleting user:', error);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const getAvatar = () => {
    const names = name.split(' ');
    let avatarText = '';
    names.forEach((n) => {
      avatarText += n.charAt(0);
    });
    return avatarText;
  };

  return (
    <View style={{flex:1,justifyContent: 'center'}}>
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Avatar.Text size={100} label={getAvatar()} backgroundColor={'#FADA5E'} color="#181A18" />
        <View style={styles.containerInput}>
          <Text style={styles.label}>Username:</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
        </View>

        <View style={styles.containerInput}>
          <Text style={styles.label}>Email:</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} />
        </View>
        {
          userType=='sender'?
          <>
            <View style={styles.containerInput}>
          <Text style={styles.label}>Phone:</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <View style={styles.containerInput}>
          <Text style={styles.label}>Address:</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
          />
        </View>
          </>:<></>
        }
        
      </View>
      <View style={styles.buttonCon}>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <AntDesign name="edit" size={24} color="white" />
          <Text style={styles.buttonText}>Edit </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Feather name="trash-2" size={24} color="white" />
          <Text style={styles.buttonText}>Delete </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Feather name="trash-2" size={24} color="white" />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8E4BCEB',
    padding: '3%',
    // justifyContent: 'center'

  },
  profileContainer: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: {width:0, height:2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: '80%',
    alignSelf: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    marginBottom: 10,
  },
  password: {
    fontSize: 16,
    marginBottom: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: '3%',
  },
  containerInput: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  buttonCon: {
    marginTop: '5%',
    flex:0.2,
  },
});

export default Profile;
