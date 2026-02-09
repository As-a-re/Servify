import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from './theme';


// Sample data for products and services
const CATALOG_DATA = [
    {
      id: 'hair',
      name: 'Hair Services',
      icon: require('./assets/icon.png'),
      items: [
        { id: 'h1', name: 'Haircut', price: 35, description: 'Professional hair styling' },
        { id: 'h2', name: 'Hair Coloring', price: 75, description: 'Full hair color treatment' },
        { id: 'h3', name: 'Highlights', price: 95, description: 'Partial or full highlights' },
        { id: 'h4', name: 'Blowout', price: 45, description: 'Smooth and styled blowout' }
      ]
    },
    {
      id: 'nail',
      name: 'Nail Services',
      icon: require('./assets/icon.png'),
      items: [
        { id: 'n1', name: 'Manicure', price: 25, description: 'Classic nail care' },
        { id: 'n2', name: 'Pedicure', price: 35, description: 'Foot and nail treatment' },
        { id: 'n3', name: 'Gel Polish', price: 45, description: 'Long-lasting gel polish' },
        { id: 'n4', name: 'Nail Art', price: 55, description: 'Custom nail design' }
      ]
    },
    {
      id: 'spa',
      name: 'Spa Treatments',
      icon: require('./assets/icon.png'),
      items: [
        { id: 's1', name: 'Swedish Massage', price: 85, description: 'Full body relaxation massage' },
        { id: 's2', name: 'Deep Tissue Massage', price: 95, description: 'Intense muscle relief' },
        { id: 's3', name: 'Facial Treatment', price: 75, description: 'Deep cleansing facial' },
        { id: 's4', name: 'Body Scrub', price: 65, description: 'Exfoliating body treatment' }
      ]
    },
    {
      id: 'makeup',
      name: 'Makeup Services',
      icon: require('./images/3D.png'),
      items: [
        { id: 'm1', name: 'Makeup Application', price: 65, description: 'Full face makeup' },
        { id: 'm2', name: 'Bridal Makeup', price: 120, description: 'Special occasion makeup' },
        { id: 'm3', name: 'Makeup Lesson', price: 85, description: 'Personal makeup tutorial' },
        { id: 'm4', name: 'Eyebrow Shaping', price: 25, description: 'Perfect brow styling' }
      ]
    }
];

export default function CategoriesScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle the hamburger menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close the menu when touching outside
  const closeMenu = () => {
    if (menuOpen) setMenuOpen(false);
  };

  // Render category item
  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.selectedCategory,
      ]}
      onPress={() => setSelectedCategory(selectedCategory === item.id ? null : item.id)}
    >
      <Image source={item.icon} style={styles.categoryIcon} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Render service/product item
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.serviceItem}>
      <View style={styles.serviceContent}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.serviceDescription}>{item.description}</Text>
        <Text style={styles.servicePrice}>${item.price}</Text>
      </View>
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // Filter items based on selected category
  const getFilteredItems = () => {
    if (!selectedCategory) {
      return CATALOG_DATA.flatMap((category) => category.items);
    }
    const category = CATALOG_DATA.find((cat) => cat.id === selectedCategory);
    return category ? category.items : [];
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
          <Text style={styles.headerTitle}>Services & Products</Text>
          <Text style={styles.headerSubtitle}>
            {selectedCategory
              ? `${CATALOG_DATA.find((c) => c.id === selectedCategory).name}`
              : 'All Services'}
          </Text>
        </View>

        {/* Category Selector */}
        <FlatList
          horizontal
          data={CATALOG_DATA}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.categoryList}
          showsHorizontalScrollIndicator={false}
        />

        {/* Services/Products List */}
        <FlatList
          data={getFilteredItems()}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.servicesList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No services found</Text>
            </View>
          }
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  header: {
    backgroundColor: theme.colors.surface,
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: theme.colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '400',
  },
  categoryList: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  selectedCategory: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  categoryIcon: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  servicesList: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  serviceContent: {
    flex: 1,
    marginRight: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginBottom: 6,
    fontWeight: '400',
  },
  servicePrice: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  bookButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  bookButtonText: {
    color: theme.colors.surface,
    fontWeight: '700',
    fontSize: 13,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.textTertiary,
    fontWeight: '400',
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '60%',
    height: '100%',
    backgroundColor: theme.colors.card,
    paddingTop: 50,
    paddingHorizontal: 16,
    elevation: 5,
    zIndex: 10,
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 12,
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },
});
