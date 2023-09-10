import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginType, setLoginType] = useState('receiver'); 

  const handleLogin = async () => {
    try {
      if (isValidEmail(email) && password !== '') {
        const loginEndpoint =
          loginType === 'receiver'
            ? 'http://192.168.1.9:3000/api/receiver/login' 
            : 'http://192.168.1.9:3000/api/sender/login'; 
  
        const response = await axios.post(loginEndpoint, {
          email,
          password,
        });
  
        if (response.status === 200) {
          console.log('Login successful');
          
          // Save the token to AsyncStoragenpm i @react-native-async-storage/async-storage
          await AsyncStorage.setItem('authToken', response.data.token);
          await AsyncStorage.setItem('userType', loginType);
          getUser();
          // Handle the successful login, such as navigating to the appropriate screen
          navigation.navigate('Tab'); // Replace with your desired screen
        } 
        else if(response.status === 401){
          setError('You are not approved by admin yet.')
        }
        else {
          console.error('Login failed');
          setError('Check your credentials');
        }
      } else {
        setError('Check your credentials');
      }
    } catch (error) {
      console.error('Error while logging in:', error);
      setError('An error occurred while logging in.');
    }
  };
  const getUser = async () => {
    try {
      // const userType = await AsyncStorage.getItem('userType');
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.get(`http://192.168.1.9:3000/api/${loginType}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        await AsyncStorage.setItem('userName',response.data.username);
      }
     
    } catch (error) {
      console.error('Error user data:', error);
    }
  };

  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  const openRegister = () => {
    navigation.navigate('Signup');
  }

  return (
    <KeyboardAvoidingView behavior='height' style={{ flex: 1 }} >

      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../assets/images/welcome.png')} />
        <Text style={styles.heading}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={loginType}
            onValueChange={(itemValue) => setLoginType(itemValue)}
            value={loginType}
            style={styles.picker}
          >
            <Picker.Item label="Login as Receiver" value="receiver" />
            <Picker.Item label="Login as Sender" value="sender" />
          </Picker>
        </View>
        {error !== '' ? <Text style={styles.errorText}>{error}</Text> : null}
        <View style={{ flex: 0.2, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Button title={"Login"} click={handleLogin} />
        </View>

        <Text style={styles.registerText}>
          Don't have an account? <Text style={styles.registerLink} onPress={openRegister}>Register</Text>
        </Text>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    marginBottom: 10,
    paddingLeft: 15,
    borderRadius: 5,
    paddingLeft: '5%'
  },
  registerText: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 20,
    color: '#888',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
  registerText: {
    marginTop: 20,
    color: '#888',
    textAlign: 'center',
  },
  registerLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  pickerContainer: {
    flex: 0.2,
    flexDirection: 'row',
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    marginBottom: 10,
    paddingLeft: 15,
    borderRadius: 5,
  },
  picker: {
    width: '100%',
    height: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    color: 'grey'
  },
});
