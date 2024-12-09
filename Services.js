import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const ServicesPage = ({ navigation }) => {
  const services = [
    { id: '1', name: 'Plumbing Services', description: 'Fix leaks, installations, and repairs.' },
    { id: '2', name: 'Electrician Services', description: 'Wiring, installations, and repairs.' },
    { id: '3', name: 'Graphic Design', description: 'Logos, branding, and more.' },
    // Add more services...
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Browse Services</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ServiceDetails', { service: item })}
        >
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
        </TouchableOpacity>
        )}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#f9f9f9' 
},
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 16 
},
  card: { 
    padding: 16, 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    marginBottom: 16 
},
  cardTitle: { 
    fontSize: 18, 
    fontWeight: 'bold' 
},
  cardDescription: { 
    fontSize: 14, 
    color: '#555' 
},
});

export default ServicesPage;
