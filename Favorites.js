import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import theme from './theme';

const FavoritesPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigation = useNavigation();

  const favorites = [
    { id: '1', name: 'Plumbing Services', description: 'Highly rated for quick fixes and installations.' },
    { id: '2', name: 'Electrician Services', description: 'Experienced in residential and commercial work.' },
    // Add more favorites...
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
                navigation.navigate('OffersRequests');
                toggleMenu();
              }}
            >
              <Ionicons name="list-outline" size={20} color="#2E7D32" />
              <Text style={styles.menuText}>Offers & Requests</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                navigation.navigate('ProfileSettings');
                toggleMenu();
              }}
            >
              <Ionicons name="settings-outline" size={20} color="#2E7D32" />
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleMenu}>
            <Ionicons name="menu" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Favorites</Text>
        </View>

        {/* Favorites List */}
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '60%',
    height: '100%',
    backgroundColor: theme.colors.card,
    padding: 16,
    zIndex: 1000,
    elevation: 10,
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },
  header: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginLeft: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    padding: 16,
    color: theme.colors.textPrimary,
  },
  card: {
    padding: 16,
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    marginBottom: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '400',
  },
});

export default FavoritesPage;
