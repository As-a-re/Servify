import React, { useState, useCallback } from 'react';
import {  View,  StyleSheet,  Text,  Image,  ScrollView,  TouchableOpacity,  TextInput, RefreshControl, Animated, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { id: 1, name: 'Food & Beverage', icon: 'restaurant-menu', count: '2.5k+' },
    { id: 2, name: 'Home & Kitchen', icon: 'house', count: '1.8k+' },
    { id: 3, name: 'Fashion & Kids', icon: 'checkroom', count: '3.2k+' },
    { id: 4, name: 'Health & Beauty', icon: 'spa', count: '1.5k+' },
    { id: 5, name: 'Business', icon: 'business-center', count: '900+' },
    { id: 6, name: 'Construction', icon: 'construction', count: '600+' },
    { id: 7, name: 'Books & Media', icon: 'menu-book', count: '2.1k+' },
    { id: 8, name: 'Sports', icon: 'sports-basketball', count: '1.2k+' },
  ];

  const featuredServices = [
    {
      id: 1,
      title: 'Home Cleaning',
      rating: 4.8,
      reviews: 1250,
      price: '$25/hr',
      image: './images/cleaning.jpg',
      discount: '15% OFF'
    },
    {
      id: 2,
      title: 'Professional Massage',
      rating: 4.9,
      reviews: 890,
      price: '$45/hr',
      image: './images/massage.jpg',
      discount: '20% OFF'
    },
    {
      id: 3,
      title: 'Personal Training',
      rating: 4.7,
      reviews: 650,
      price: '$35/hr',
      image: './images/training.jpg',
      discount: '10% OFF'
    },
  ];

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const visibleCategories = showAllCategories ? categories : categories.slice(0, 4);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header Section */}
      <LinearGradient
        colors={['#4CAF50', '#2E7D32']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Ahana 👋</Text>
            <Text style={styles.subGreeting}>What service do you need today?</Text>
          </View>
          <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('AdditionalScreens', {screen:'User'})}>
            <Image style={styles.profileImage} source={require('./images/3D.png')} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
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

      {/* Quick Actions */}
      <View style={styles.quickActions}>
  {[
    { action: 'Schedule', icon: 'event', screen: 'Search' },
    { action: 'Favorites', icon: 'favorite', screen: 'Favorite' },
    { action: 'Offers', icon: 'local-offer', screen: 'Offer' },
    { action: 'History', icon: 'history', screen: 'History' },
  ].map(({ action, icon, screen }, index) => (
    <TouchableOpacity
      key={index}
      style={styles.quickActionButton}
      onPress={() => navigation.navigate('AdditionalScreens', {screen})}
    >
      <View style={styles.quickActionIcon}>
        <MaterialIcons name={icon} size={24} color="#2E7D32" />
      </View>
      <Text style={styles.quickActionText}>{action}</Text>
    </TouchableOpacity>
  ))}
</View>

      {/* Featured Services Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Services</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllButton}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {featuredServices.map((service) => (
            <TouchableOpacity key={service.id} style={styles.serviceCard}>
              <Image style={styles.serviceImage} source={require('./images/3D.png')} />
              {service.discount && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{service.discount}</Text>
                </View>
              )}
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <View style={styles.ratingContainer}>
                  <MaterialIcons name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingText}>{service.rating}</Text>
                  <Text style={styles.reviewsText}>({service.reviews} reviews)</Text>
                </View>
                <Text style={styles.servicePrice}>{service.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Categories Section */}
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
  {visibleCategories.map((category) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryCard,
        selectedCategory === category.id && styles.selectedCategory,
      ]}
      onPress={() =>
        navigation.navigate('AdditionalScreens', {screen:'Profile'}, {
          categoryId: category.id,
          categoryName: category.name,
        })
      }
    >
      <View style={styles.categoryIcon}>
        <MaterialIcons name={category.icon} size={24} color="#2E7D32" />
      </View>
      <Text style={styles.categoryName}>{category.name}</Text>
      <Text style={styles.categoryCount}>{category.count}</Text>
    </TouchableOpacity>
  ))}
      </View>
      </View>

      {/* Trending Services */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllButton}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {featuredServices.map((service) => (
            <TouchableOpacity key={service.id} style={styles.trendingCard}>
              <View style={styles.trendingImageContainer}>
                <Image style={styles.trendingImage} source={require('./images/3D.png')} />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.trendingGradient}
                >
                  <Text style={styles.trendingTitle}>{service.title}</Text>
                  <View style={styles.trendingRating}>
                    <MaterialIcons name="star" size={16} color="#FFD700" />
                    <Text style={styles.trendingRatingText}>{service.rating}</Text>
                  </View>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
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
  trendingCard: {
    width: 200,
    height: 250,
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  trendingImageContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  trendingImage: {
    width: '100%',
    height: '100%',
  },
  trendingGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    padding: 15,
    justifyContent: 'flex-end',
  },
  trendingTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  trendingRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendingRatingText: {
    color: '#FFF',
    fontSize: 14,
    marginLeft: 5,
  },
});