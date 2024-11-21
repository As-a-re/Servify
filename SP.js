import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ServiceAndProduct = () => {
  const [ratings, setRatings] = useState({});

  const products = [
    {
      id: 1,
      name: 'Premium Taxi Service',
      description: 'Safe, reliable, and convenient taxi services for students.',
      image: 'https://via.placeholder.com/300x200.png?text=Taxi+Service',
      price: '$10/trip',
    },
    {
      id: 2,
      name: 'Shuttle Reservations',
      description: 'Reserve your seat for university shuttle services with ease.',
      image: 'https://via.placeholder.com/300x200.png?text=Shuttle+Service',
      price: 'Free',
    },
  ];

  const handleRating = (productId, star) => {
    setRatings({ ...ratings, [productId]: star });
  };

  const renderStars = (productId) => {
    const userRating = ratings[productId] || 0;
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRating(productId, star)}>
            <Ionicons
              name={star <= userRating ? 'star' : 'star-outline'}
              size={24}
              color={star <= userRating ? '#FFD700' : '#B0B0B0'}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Our Services & Products</Text>
        <Text style={styles.subtitle}>Making your campus life easier!</Text>
      </View>

      {/* Product Cards */}
      <View style={styles.productContainer}>
        {products.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
            {renderStars(product.id)}
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.contactButton}>
          <Ionicons name="chatbox-ellipses-outline" size={20} color="#FFF" />
          <Text style={styles.contactButtonText}>Contact Us</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
  },
  header: {
    marginVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  productContainer: {
    marginTop: 20,
  },
  productCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 2,
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  productDescription: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#1e88e5',
    marginTop: 5,
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  buyButton: {
    backgroundColor: '#1e88e5',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 5,
  },
  buyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginTop: 30,
  },
  contactButton: {
    flexDirection: 'row',
    backgroundColor: '#1e88e5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ServiceAndProduct;
