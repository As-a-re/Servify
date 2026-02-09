import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, TextInput, RefreshControl, Platform, FlatList, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { categoriesAPI, servicesAPI } from './services/api';

export default function HomeScreen({ navigation }) {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [featuredServices, setFeaturedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serviceTypes, setServiceTypes] = useState([]);

  /* =========================
     Fetch Data
  ========================= */
const fetchData = useCallback(async () => {
  try {
    setLoading(true);
    setError(null);
const [categoriesRes, servicesRes, serviceTypesRes] = await Promise.all([
    // Fetch categories with counts
    categoriesAPI.getAllCategories(),
        servicesAPI.getAllServices({ featured: true, limit: 3 }),
        servicesAPI.getServiceTypes(),
      ]);

      setCategories(categoriesRes.data?.categories || []);
      setFeaturedServices(servicesRes.data?.services || []);
      setServiceTypes(serviceTypesRes.data?.serviceTypes || []);
  } catch (error) {
    console.error('Home fetch error:', error);
    Alert.alert('Error', 'Failed to load data. Please try again later.');
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
}, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  const visibleCategories = Array.isArray(categories) && categories.length > 0
  ? (showAllCategories ? categories : categories.slice(0, 4))
  : [];

  /* =========================
     Static Products (unchanged)
  ========================= */
  const products = [
    { id: 1, title: 'Wireless Headphones', price: '$150', image: require('./images/3D.png') },
    { id: 2, title: 'Smartwatch', price: '$120', image: require('./images/3D.png') },
    { id: 3, title: 'Bluetooth Speaker', price: '$60', image: require('./images/3D.png') },
    { id: 4, title: 'Gaming Mouse', price: '$40', image: require('./images/3D.png') },
    { id: 5, title: 'VR Headset', price: '$300', image: require('./images/3D.png') },
    { id: 6, title: 'Portable Charger', price: '$25', image: require('./images/3D.png') },
  ];

  const renderProductCard = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() =>
        navigation.navigate('AdditionalScreens', {
          screen: 'Playlist',
          productId: item.id,
        })
      }
    >
      <Image style={styles.productImage} source={item.image} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#4CAF50', '#2E7D32']} style={styles.headerGradient}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Ahana 👋</Text>
            <Text style={styles.subGreeting}>What service do you need today?</Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('AdditionalScreens', { screen: 'User' })}
          >
            <Image style={styles.profileImage} source={require('./images/3D.png')} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search services..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#666"
          />
          <TouchableOpacity style={styles.filterButton}>
            <MaterialIcons name="filter-list" size={20} color="#2E7D32" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Featured Services / Service Types */}
<View style={styles.section}>
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>
      {serviceTypes.length > 0 ? 'Service Types' : 'Featured Services'}
    </Text>
    <TouchableOpacity>
      <Text style={styles.seeAllButton}>See All</Text>
    </TouchableOpacity>
  </View>

  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    {serviceTypes.length > 0
      ? serviceTypes.map(type => (
          <TouchableOpacity
            key={type._id}
            style={styles.serviceCard}
            onPress={() =>
              navigation.navigate('AdditionalScreens', {
                screen: 'Categories',
                params: { serviceTypeId: type._id },
              })
            }
          >
            <View style={[styles.serviceImage, styles.serviceTypeIcon]}>
              <MaterialIcons
                name={type.icon || 'build'}
                size={50}
                color="#2E7D32"
              />
            </View>

            <View style={styles.serviceInfo}>
              <Text style={styles.serviceTitle}>{type.name}</Text>
              <Text style={styles.reviewsText}>
                {type.serviceCount || 0} services
              </Text>
            </View>
          </TouchableOpacity>
        ))
      : featuredServices.map(service => (
          <TouchableOpacity
            key={service._id}
            style={styles.serviceCard}
            onPress={() =>
              navigation.navigate('AdditionalScreens', {
                screen: 'Service',
                params: { serviceId: service._id },
              })
            }
          >
            <Image
              style={styles.serviceImage}
              source={{ uri: service.image || 'https://via.placeholder.com/300' }}
            />

            {service.discount > 0 && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>
                  {service.discount}% OFF
                </Text>
              </View>
            )}

            <View style={styles.serviceInfo}>
              <Text style={styles.serviceTitle}>{service.name}</Text>

              <View style={styles.ratingContainer}>
                <MaterialIcons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>
                  {service.averageRating?.toFixed(1) || 'New'}
                </Text>
                {service.reviewCount > 0 && (
                  <Text style={styles.reviewsText}>
                    ({service.reviewCount})
                  </Text>
                )}
              </View>

              <Text style={styles.servicePrice}>
                ${service.price}/hr
              </Text>
            </View>
          </TouchableOpacity>
        ))}
  </ScrollView>
</View>


        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity onPress={() => setShowAllCategories(!showAllCategories)}>
              <Text style={styles.seeAllButton}>
                {showAllCategories ? 'Show Less' : 'See All'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.categoriesGrid}>
            {visibleCategories.map(category => (
              <TouchableOpacity
                key={category._id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category._id && styles.selectedCategory,
                ]}
                onPress={() =>
                  navigation.navigate('AdditionalScreens', {
                    screen: 'Categories',
                    params: { categoryId: category._id },
                  })
                }
              >
                <View style={styles.categoryIcon}>
                  <MaterialIcons
                    name={category.icon || 'category'}
                    size={24}
                    color="#2E7D32"
                  />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryCount}>
                  {category.serviceCount || 0}+
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Products */}
        <View style={styles.section2}>
          <Text style={styles.section2Title}>Products</Text>
          <FlatList
            data={products}
            renderItem={renderProductCard}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.productRow}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerGradient: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subGreeting: {
    fontSize: 16,
    color: '#E0E0E0',
    marginTop: 5,
  },
  profileButton: {
    position: 'relative',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFF',
    marginLeft: -50,
    marginTop: -30,
  },
  notificationBadge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#FF4444',
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginTop: 10,
    height: 50,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    padding: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#FFF',
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  quickActionButton: {
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllButton: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: '600',
  },
  serviceCard: {
    width: 280,
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginRight: 15,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  serviceImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  serviceInfo: {
    padding: 15,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 5,
    fontWeight: '600',
  },
  reviewsText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  servicePrice: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: 'bold',
    marginTop: 5,
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF4444',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  discountText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  categoryIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  categoryCount: {
    fontSize: 12,
    color: '#666',
  },
  selectedCategory: {
    backgroundColor: '#E8F5E9',
    borderColor: '#2E7D32',
    borderWidth: 1,
  },
  section2: {
    padding: 20,
  },
  section2Title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    flex: 1,
    marginHorizontal: 5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  productImage: {
    width: '100%',
    height: 120,
  },
  productInfo: {
    padding: 10,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: 5,
  },
});