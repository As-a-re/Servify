import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LandingScreen from './Landing';
import LoginScreen from './Login';
import SignupScreen from './Signup';
import HomeScreen from './Home';
import SearchScreen from './Search';
import PlaylistScreen from './Playlist';
import MylibraryScreen from './Add';
import CategoriesScreen from './Categories';
import SPScreen from './SP';
import ServiceScreen from './Services';
import FavoriteScreen from './Favorites';
import HistoryScreen from './History';
import OfferScreen from './Offer';
import UserScreen from './User';
import ProfileScreen from './Profile';

// Initialize navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Loading Screen Component
function LoadingScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true, // Ensure native driver is used
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        delay: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.loadingContainer}>
      <Animated.Text style={[styles.loadingText, { opacity: fadeAnim }]}>
        SERVIFY
      </Animated.Text>
    </View>
  );
}

// Auth Stack with screen navigation
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AdditionalScreensStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="SP" component={SPScreen} />
      <Stack.Screen name="Service" component={ServiceScreen} />
      <Stack.Screen name="Favorite" component={FavoriteScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Playlist" component={PlaylistScreen} />
      <Stack.Screen name="Offer" component={OfferScreen} />
      <Stack.Screen name="User" component={UserScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

// Main Tabs with tab navigation
function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Playlist') {
            iconName = focused ? 'musical-notes' : 'musical-notes-outline';
          } else if (route.name === 'Mylibrary') {
            iconName = focused ? 'library' : 'library-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ACFFAC',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Playlist" component={PlaylistScreen} />
      <Tab.Screen name="Mylibrary" component={MylibraryScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (you can replace this with actual initialization logic)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="AdditionalScreens" component={AdditionalScreensStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles for loading screen and app
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ACFFAC',
    letterSpacing: 4,
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)', 
  },
});
