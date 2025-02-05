import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const products = [
    {
      id: '1',
      name: 'Home Cleaning Service',
      price: 50,
      rating: 4.8,
      reviews: 120,
      providerName: 'Clean Masters',
      image: './images/3D.png',
      description: 'Professional home cleaning service with 5+ years of experience. We provide all cleaning supplies and equipment.'
    },
    {
      id: '2',
      name: 'Lawn Mowing Service',
      price: 45,
      rating: 4.5,
      reviews: 85,
      providerName: 'Green Thumb Landscaping',
      image: './images/3D.png',
      description: 'Expert lawn mowing and yard maintenance. Reliable and professional service.',
    },
    {
      id: '3',
      name: 'Plumbing Repair',
      price: 80,
      rating: 4.9,
      reviews: 200,
      providerName: 'Fix-It Plumbers',
      image: './images/3D.png',
      description: 'Professional plumbing repairs and installations. Quick and reliable service.',
    },
    {
      id: '4',
      name: 'Electrical Services',
      price: 75,
      rating: 4.7,
      reviews: 150,
      providerName: 'Spark Electric',
      image: './images/3D.png',
      description: 'Comprehensive electrical services for residential and commercial properties.',
    },
    {
      id: '5',
      name: 'Painting Service',
      price: 55,
      rating: 4.6,
      reviews: 95,
      providerName: 'Color Splash Painters',
      image: './images/3D.png',
      description: 'Professional interior and exterior painting services with high-quality finishes.',
    },
    {
      id: '6',
      name: 'Moving Services',
      price: 90,
      rating: 4.9,
      reviews: 250,
      providerName: 'Swift Movers',
      image: './images/3D.png',
      description: 'Efficient and careful moving services for local and long-distance moves.',
    },
    {
      id: '7',
      name: 'Carpet Cleaning',
      price: 60,
      rating: 4.7,
      reviews: 110,
      providerName: 'Spotless Carpets',
      image: './images/3D.png',
      description: 'Deep cleaning and stain removal for all types of carpets and rugs.',
    },
  ];

  const handleProductPress = (product) => {
    navigation.navigate('Playlist', {
      serviceName: product.name,
      providerName: product.providerName,
      price: product.price,
      description: product.description,
      rating: product.rating,
      reviewCount: product.reviews
    });
  };

  const renderProductCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard} 
      onPress={() => handleProductPress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.productPrice}>${item.price}/hr</Text>
        <View style={styles.productRating}>
          <Text>⭐️ {item.rating} ({item.reviews} reviews)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Services</Text>
        <View style={styles.placeholder} /> {/* For header symmetry */}
      </View>
      <FlatList
        data={products}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#2E7D32',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  backButton: {
    padding: 8,
  },
  placeholder: {
    width: 40, 
  },
  listContainer: {
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 16, 
  },
  row: {
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '48%',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  productDetails: {
    padding: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 5,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ProfileScreen;