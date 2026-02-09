import React, { useState } from 'react';
import { View, Pressable, Image, ImageBackground, Text, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI } from './services/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      // ✅ Use authAPI instead of axios
      const response = await authAPI.login(email, password);

      if (response.data?.token) {
        // Store token and user data
        await AsyncStorage.setItem('userToken', response.data.token);
        await AsyncStorage.setItem(
          'userData',
          JSON.stringify(response.data.user)
        );

        Alert.alert('Success', 'Login successful');
        // Reset the navigation stack to prevent going back to auth screens
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Failed to login';
      Alert.alert('Error', errorMessage);
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.main}>
      <ImageBackground
        source={require('./images/3D.png')}
        style={styles.image}
      >
        <View style={styles.container}>
          <Text style={styles.tan}>Login</Text>

          <View style={styles.man}>
            <TextInput
              placeholder="Email"
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />

            <Pressable
              style={styles.pen}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Logging in...' : 'Login'}
              </Text>
            </Pressable>

            <Pressable
              style={styles.pern}
              onPress={() => navigation.navigate('Landing')}
            >
              <Image
                source={require('./images/3D.png')}
                style={styles.icon}
              />
              <Text style={styles.socialText}>Google</Text>
            </Pressable>

            <Pressable
              style={styles.pean}
              onPress={() => navigation.navigate('Main')}
            >
              <Image
                source={require('./images/3D.png')}
                style={styles.icon}
              />
              <Text style={styles.socialText}>Facebook</Text>
            </Pressable>

            <Text
              style={styles.pien}
              onPress={() => navigation.navigate('Signup')}
            >
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
