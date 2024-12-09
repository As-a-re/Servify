import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const OffersRequestsPage = () => {
  const navigation = useNavigation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [requests, setRequests] = useState([
    { id: '1', customerName: 'Alice', serviceName: 'Plumbing Services', status: 'Pending', date: '2024-11-25', details: 'Fix kitchen sink' },
    { id: '2', customerName: 'Bob', serviceName: 'Electrician Services', status: 'Accepted', date: '2024-11-20', details: 'Install ceiling fan' },
    { id: '3', customerName: 'Charlie', serviceName: 'Graphic Design', status: 'Completed', date: '2024-11-18', details: 'Design company logo' },
  ]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleRequestAction = (action, requestId) => {
    setRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === requestId ? { ...request, status: action } : request
      )
    );
    alert(`Request ${action}ed successfully!`);
  };

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
                navigation.navigate('History');
                toggleMenu();
              }}
            >
              <Ionicons name="time-outline" size={20} color="#2E7D32" />
              <Text style={styles.menuText}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                navigation.navigate('ProfileSettings');
                toggleMenu();
              }}
            >
              <Ionicons name="person-outline" size={20} color="#2E7D32" />
              <Text style={styles.menuText}>Profile Settings</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleMenu}>
            <Ionicons name="menu" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Offers & Requests</Text>
        </View>

        {/* Requests List */}
        <FlatList
          data={requests}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Customer: {item.customerName}</Text>
              <Text style={styles.cardService}>Service: {item.serviceName}</Text>
              <Text style={styles.cardDetails}>Details: {item.details}</Text>
              <Text style={styles.cardDate}>Date: {item.date}</Text>
              <Text style={styles.cardStatus}>Status: {item.status}</Text>

              {item.status === 'Pending' && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.greenButton}
                    onPress={() => handleRequestAction('Accepted', item.id)}
                  >
                    <Text style={styles.buttonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.greenButton}
                    onPress={() => handleRequestAction('Declined', item.id)}
                  >
                    <Text style={styles.buttonText}>Decline</Text>
                  </TouchableOpacity>
                </View>
              )}
              {item.status === 'Accepted' && (
                <TouchableOpacity
                  style={styles.greenButton}
                  onPress={() => handleRequestAction('Completed', item.id)}
                >
                  <Text style={styles.buttonText}>Mark as Completed</Text>
                </TouchableOpacity>
              )}
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
  cardService: {
    fontSize: 16,
    color: '#333',
  },
  cardDetails: {
    fontSize: 14,
    color: '#555',
  },
  cardDate: {
    fontSize: 14,
    color: '#777',
  },
  cardStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  greenButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default OffersRequestsPage;
