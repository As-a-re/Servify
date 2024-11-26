import React from "react";
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function PlaylistScreen({ navigation }) {
  const serviceDetails = {
    serviceName: 'Home Cleaning Service',
    providerName: 'John Doe',
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={require('./images/3D.png')} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>Home Cleaning Service</Text>
        <Text style={styles.price}>$50/hour</Text>
        <View style={styles.providerInfo}>
          <Image source={require('./images/3D.png')} style={styles.avatar} />
          <View>
            <Text style={styles.providerName}>John Doe</Text>
            <Text style={styles.rating}>⭐️ 4.8 (120 reviews)</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          Professional home cleaning service with 5+ years of experience.
          We provide all cleaning supplies and equipment.
        </Text>

        <Text style={styles.sectionTitle}>Available Times</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.timeSlot}>
            <Text>10:00 AM</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.timeSlot}>
            <Text>2:00 PM</Text>
          </TouchableOpacity>
        </ScrollView>

        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => navigation.navigate('BookingProcess')}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.messageButton}
          onPress={() =>
            navigation.navigate('SP', {serviceName: "Home Cleaning", providerName: "John Doe" })
          }
        >
          <Text style={styles.messageButtonText}>Message Provider</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16a085',
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#007AFF',
    marginBottom: 20,
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '500',
  },
  rating: {
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    lineHeight: 24,
    color: '#444',
  },
  timeSlot: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginRight: 10,
  },
  bookButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
  },
  bookButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  messageButton: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
  },
  messageButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
