import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, TextInput, RefreshControl, Platform, FlatList, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { categoriesAPI, servicesAPI } from './services/api';
import theme from './theme';

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
      style={[
        styles.productCard,
        {
          activeOpacity: 0.7,
        },
      ]}
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
    backgroundColor: theme.colors.surface,
  },
  headerGradient: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: theme.colors.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  subGreeting: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginTop: 5,
    fontWeight: '400',
  },
  profileButton: {
    position: 'relative',
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: theme.colors.white,
    marginLeft: -48,
    marginTop: -24,
  },
  notificationBadge: {
    position: 'absolute',
    right: 2,
    top: 2,
    backgroundColor: theme.colors.error,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: theme.colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginTop: 10,
    height: 50,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  searchIcon: {
    marginRight: 10,
    color: theme.colors.textTertiary,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.textPrimary,
    fontWeight: '400',
  },
  filterButton: {
    padding: 8,
    backgroundColor: theme.colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
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
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  seeAllButton: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  serviceCard: {
    width: 280,
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    marginRight: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.md,
  },
  serviceImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: theme.colors.surfaceAlt,
  },
  serviceInfo: {
    padding: 16,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    fontSize: 14,
    color: theme.colors.textPrimary,
    marginLeft: 5,
    fontWeight: '600',
  },
  reviewsText: {
    fontSize: 12,
    color: theme.colors.textTertiary,
    marginLeft: 5,
  },
  servicePrice: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: '700',
    marginTop: 8,
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: theme.colors.error,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  discountText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 5,
  },
  categoryCount: {
    fontSize: 12,
    color: theme.colors.textTertiary,
  },
  selectedCategory: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  section2: {
    padding: 20,
  },
  section2Title: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 10,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    marginBottom: 15,
    overflow: 'hidden',
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  productImage: {
    width: '100%',
    height: 120,
    backgroundColor: theme.colors.surfaceAlt,
  },
  productInfo: {
    padding: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.primary,
    marginTop: 6,
  },
});
