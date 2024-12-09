import React from "react";
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function PlaylistScreen({ route, navigation }) {
  // Destructure route params with comprehensive fallback values
  const { 
    // Common details
    name = 'Item Name',
    type = 'service', // 'service' or 'product'
    description = 'No description available.',
    price = 0,
    
    // Service-specific details
    providerName = 'Provider Name',
    rating = 0,
    reviewCount = 0,
    
    // Product-specific details
    brand = 'Unknown Brand',
    category = 'Uncategorized',
    inStock = true,
    specifications = [],
    
    // Images
    image = './images/3D.png',
    additionalImages = []
  } = route.params || {};

  // Predefined available time slots (for services)
  const availableTimes = ['10:00 AM', '2:00 PM', '4:30 PM', '7:00 PM'];

  const handleBookOrBuy = () => {
    if (type === 'service') {
      navigation.navigate('Search');
    } else {
      navigation.navigate('Cart', { item: route.params });
    }
  };

  const handleContactProvider = () => {
    navigation.navigate('AdditionalScreens', {screen:'SP'}, {
      providerName: type === 'service' ? providerName : brand
    });
  };

  const renderServiceDetails = () => (
    <>
      <View style={styles.providerInfo}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/50' }} 
          style={styles.avatar} 
        />
        <View>
          <Text style={styles.providerName}>{providerName}</Text>
          <Text style={styles.rating}>
            ⭐️ {rating.toFixed(1)} ({reviewCount} reviews)
          </Text>
        </View>
      </View>
      
      <Text style={styles.sectionTitle}>Available Times</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.timeSlotsContainer}
      >
        {availableTimes.map((time, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.timeSlot}
          >
            <Text>{time}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );

  const renderProductDetails = () => (
    <>
      <View style={styles.productInfo}>
        <Text style={styles.sectionTitle}>Product Details</Text>
        <Text style={styles.infoText}>Brand: {brand}</Text>
        <Text style={styles.infoText}>Category: {category}</Text>
        <Text style={styles.infoText}>
          Availability: {inStock ? 'In Stock' : 'Out of Stock'}
        </Text>
      </View>

      {specifications.length > 0 && (
        <View style={styles.specificationsContainer}>
          <Text style={styles.sectionTitle}>Specifications</Text>
          {specifications.map((spec, index) => (
            <Text key={index} style={styles.specItem}>
              • {spec}
            </Text>
          ))}
        </View>
      )}

      {additionalImages.length > 0 && (
        <View style={styles.additionalImagesContainer}>
          <Text style={styles.sectionTitle}>More Images</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
          >
            {additionalImages.map((imgUri, index) => (
              <Image 
                key={index}
                source={{ uri: imgUri }}
                style={styles.additionalImage}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {type === 'service' ? 'Service Details' : 'Product Details'}
        </Text>
      </View>

      <ScrollView>
        <Image 
          source={{ uri: image }} 
          style={styles.image} 
        />
        
        <View style={styles.content}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.price}>
            {type === 'service' ? `$${price}/hour` : `$${price}`}
          </Text>
          
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{description}</Text>
          
          {type === 'service' ? renderServiceDetails() : renderProductDetails()}
          
          <TouchableOpacity 
            style={styles.bookButton} 
            onPress={handleBookOrBuy}
          >
            <Text style={styles.bookButtonText}>
              {type === 'service' ? 'Book Now' : 'Add to Cart'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.messageButton} 
            onPress={handleContactProvider}
          >
            <Text style={styles.messageButtonText}>
              {type === 'service' ? 'Message Provider' : 'Contact Seller'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#2E7D32',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#007AFF',
    marginBottom: 20,
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '500',
  },
  rating: {
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    lineHeight: 24,
    color: '#444',
    marginBottom: 20,
  },
  timeSlotsContainer: {
    marginBottom: 20,
  },
  timeSlot: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginRight: 10,
  },
  bookButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  bookButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  messageButton: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 8,
  },
  messageButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  productInfo: {
    marginVertical: 15,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#444',
  },
  specificationsContainer: {
    marginVertical: 15,
  },
  specItem: {
    fontSize: 15,
    marginBottom: 5,
    color: '#666',
  },
  additionalImagesContainer: {
    marginVertical: 15,
  },
  additionalImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
});

export default PlaylistScreen;