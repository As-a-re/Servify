import React, { useState } from 'react';
import { View, Pressable, Image, ImageBackground, Text, TextInput, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.21.32.40:5000/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      
      if (response.data.success) {
        // Store the token
        await AsyncStorage.setItem('userToken', response.data.token);
        await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
        
        Alert.alert('Success', 'Login successful');
        navigation.replace('Main');
      } else {
        Alert.alert('Error', response.data.message || 'Invalid credentials');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to login';
      Alert.alert('Error', errorMessage);
      console.error('Login error:', error);
    }
  };

  return (
    <View style={styles.main}>
      <ImageBackground source={require('./images/3D.png')} style={styles.image}>
        <View style={styles.container}>
          <Text style={styles.tan}>Login</Text>
          <View style={styles.man}>
            <TextInput
              placeholder="Email"
              style={styles.input}
              onChangeText={setEmail}
              value={email}
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
            <Pressable style={styles.pen} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
            <Pressable style={styles.pern} onPress={() => navigation.navigate('Landing')}>
              <Image source={require('./images/3D.png')} style={styles.icon} />
              <Text style={styles.socialText}>Google</Text>
            </Pressable>
            <Pressable style={styles.pean} onPress={() => navigation.navigate('Main')}>
              <Image source={require('./images/3D.png')} style={styles.icon} />
              <Text style={styles.socialText}>Facebook</Text>
            </Pressable>
            <Text style={styles.pien} onPress={() => navigation.navigate('Signup')}>
              Create an account
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  man: {
    marginTop: 20,
    alignItems: 'center',
    width: '90%',
  },
  input: {
    width: 300,
    backgroundColor: '#141f2a',
    height: 50,
    marginTop: 15,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    fontSize: 18,
    paddingLeft: 15,
    borderRadius: 5,
  },
  pen: {
    backgroundColor: '#33FF6D',
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  pern: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 15,
  },
  pean: {
    flexDirection: 'row',
    backgroundColor: 'blue',
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 15,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  tan: {
    color: '#33FF6D',
    fontSize: 28,
    fontWeight: 'bold',
  },
  pien: {
    color: 'white',
    fontSize: 16,
    marginTop: 25,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialText: {
    fontSize: 16,
    color: '#333',
  },
});
