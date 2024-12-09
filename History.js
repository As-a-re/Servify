import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HistoryPage = () => {
  const navigation = useNavigation();
  const [menuOpen, setMenuOpen] = useState(false);

  const bookings = [
    { id: '1', serviceName: 'Plumbing Services', date: '2024-11-20', status: 'Completed' },
    { id: '2', serviceName: 'Electrician Services', date: '2024-11-15', status: 'Completed' },
    // Add more bookings...
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <TouchableWithoutFeedback onPress={closeMenu}>
      <View style={styles.container}>
        {/* Hamburger Menu */}
        {menuOpen && (
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                navigation.navigate('Main');
                toggleMenu();
              }}
            >
              <Ionicons name="home-outline" size={20} color="#2E7D32" />
              <Text style={styles.menuText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                navigation.navigate('About');
                toggleMenu();
              }}
            >
              <Ionicons name="information-circle-outline" size={20} color="#2E7D32" />
              <Text style={styles.menuText}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                navigation.navigate('Contact');
                toggleMenu();
              }}
            >
              <Ionicons name="call-outline" size={20} color="#2E7D32" />
              <Text style={styles.menuText}>Contact</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleMenu}>
            <Ionicons name="menu" size={30} color="white" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Booking History</Text>
          </View>
        </View>

        {/* Booking History */}
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.serviceName}</Text>
              <Text style={styles.cardDate}>{item.date}</Text>
              <Text style={styles.cardStatus}>{item.status}</Text>
            </View>
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '60%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 16,
    zIndex: 1000,
    elevation: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  header: {
    backgroundColor: '#2E7D32',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 16,
  },
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDate: {
    fontSize: 14,
    color: '#777',
  },
  cardStatus: {
    fontSize: 14,
    color: '#28a745',
  },
});

export default HistoryPage;
