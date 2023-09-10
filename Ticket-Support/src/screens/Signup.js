import React, { useState } from 'react';
import { Image, Text, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, View, Platform } from 'react-native';
import Button from '../components/Button';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

export default function Signup({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [address, setAddress] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginType, setLoginType] = useState('receiver'); 

  const handleSignup = async () => {
    if (!isValidEmail(email) || email === '') {
      setEmailError('Recheck email');
      return;
    }

    if (password === '') {
      setEmailError('');
      setPasswordError('Password should not be empty');
      return;
    }

    setEmailError('');
    setPasswordError('');

    const signupEndpoint = loginType === 'receiver' ? 'http://192.168.1.9:3000/api/receiver/register' : 'http://192.168.1.9:3000/api/sender/register';

    try {
      const response = await axios.post(signupEndpoint, {
        username: fullName,
        email,
        phone,
        password,
        address
      });

      if (response.status === 201) {
        console.log('Signup successful');
        navigation.navigate('Login');
      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error while signing up:', error);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const openLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../assets/images/welcome.png')} />
        <Text style={styles.heading}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError !== '' ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="address"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {passwordError !== '' ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={loginType}
            onValueChange={(itemValue) => setLoginType(itemValue)}
            value={loginType}
            style={styles.picker}
          >
            <Picker.Item label="Sign Up as Receiver" value="receiver" />
            <Picker.Item label="Sign Up as Sender" value="user" />
          </Picker>
        </View>
        <View style={{ flex: 0.2, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Button title="Sign Up" click={handleSignup} />
        </View>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink} onPress={openLogin}>Login</Text>
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
  },
  loginText: {
    marginTop: 20,
    color: '#888',
    textAlign: 'center',
  },
  loginLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
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
    color: 'grey',
  },
});
