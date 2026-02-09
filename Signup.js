import React, { useState } from 'react';
import { View, Pressable, StyleSheet, Text, TextInput, ImageBackground, Image, Alert } from 'react-native';
import { authAPI } from './services/api';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profession, setProfession] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    try {
      setLoading(true);

      // ✅ Use authAPI instead of axios
      const response = await authAPI.signup({
        name,
        profession,
        email,
        password,
      });

      if (response.data?.success || response.data?.user) {
        Alert.alert('Success', 'Account created successfully');
        navigation.navigate('Login');
      } else {
        Alert.alert(
          'Error',
          response.data?.message || 'Signup failed'
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to sign up'
      );
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.main}>
      <ImageBackground
        source={require('./images/3D.png')}
        style={styles.mat}
      >
        <View style={styles.contain}>
          <Text style={styles.nat}>Sign-up</Text>

          <TextInput
            placeholder="Name"
            style={styles.tip}
            onChangeText={setName}
            value={name}
          />

          <TextInput
            placeholder="Profession"
            style={styles.tip}
            onChangeText={setProfession}
            value={profession}
          />

          <TextInput
            placeholder="Email"
            style={styles.tip}
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            placeholder="Password"
            style={styles.tip}
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />

          <Pressable
            style={styles.tint}
            onPress={handleSignup}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Creating...' : 'Done'}
            </Text>
          </Pressable>

          <Text style={styles.orText}>or continue with</Text>

          <View style={styles.socialButtonsContainer}>
            <Pressable style={styles.socialButton}>
              <Image
                source={require('./images/3D.png')}
                style={styles.icon}
              />
              <Text style={styles.socialButtonText}>Google</Text>
            </Pressable>

            <Pressable style={styles.socialButton}>
              <Image
                source={require('./images/3D.png')}
                style={styles.icon}
              />
              <Text style={styles.socialButtonText}>Facebook</Text>
            </Pressable>

            <Pressable style={styles.socialButton}>
              <Image
                source={require('./images/3D.png')}
                style={styles.icon}
              />
              <Text style={styles.socialButtonText}>Apple</Text>
            </Pressable>
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
  mat: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contain: {
    width: '90%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  tint: {
    backgroundColor: '#33FF6D',
    width: 150,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nat: {
    color: '#33FF6D',
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  tip: {
    width: '100%',
    backgroundColor: '#141f2a',
    height: 50,
    marginTop: 15,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    fontSize: 18,
    paddingLeft: 10,
    borderRadius: 5,
  },
  orText: {
    marginTop: 20,
    fontSize: 14,
    color: 'white',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around',
    width: '100%',
  },
  socialButton: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  socialButtonText: {
    fontSize: 14,
    color: '#333',
  },
});
