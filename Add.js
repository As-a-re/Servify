import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, TextInput, Platform, Dimensions, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios'; // Make sure to install axios: npm install axios

const { width } = Dimensions.get('window');
const API_URL = 'http://10.21.32.104:5000/api'; // Replace with your backend IP/URL

export default function MyAccountScreen({ navigation, route }) {
  const [profileImage, setProfileImage] = useState(null);
  const [businessName, setBusinessName] = useState('');
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
  });

  // Load saved data and token on mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Retrieve token from AsyncStorage
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          setToken(storedToken);
          
          // Fetch products
          await fetchProducts(storedToken);
        }
      } catch (error) {
        console.error('Error loading initial data:', error);
      }
    };

    loadInitialData();
  }, []);

  // Fetch products from backend
  const fetchProducts = async (authToken) => {
    try {
      const response = await axios.get(`${API_URL}/products`, {
        headers: { 
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to fetch products');
    }
  };

  // Pick profile image
  const pickProfileImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        await updateBusinessProfile(uri);
      }
    } catch (error) {
      console.error('Image pick error:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  // Update business profile (name or image)
  const updateBusinessProfile = async (imageUri = null) => {
    try {
      const formData = new FormData();
      
      // Add business name if changed
      if (businessName) {
        formData.append('businessName', businessName);
      }

      // Add profile image if selected
      if (imageUri) {
        const filename = imageUri.split('/').pop();
        const fileType = filename.split('.').pop();
        
        formData.append('profileImage', {
          uri: imageUri,
          name: filename,
          type: `image/${fileType}`
        });
      }

      const response = await axios.post(`${API_URL}/business/profile`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        // Update local state
        setProfileImage(response.data.business.profileImage);
        Alert.alert('Success', 'Profile updated successfully');
      }
    } catch (error) {
      console.error('Profile update error:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  // Pick product image
  const pickProductImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setNewProduct(prev => ({ ...prev, image: uri }));
      }
    } catch (error) {
      console.error('Product image pick error:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  // Add new product
  const addProduct = async () => {
    // Validate required fields
    if (!newProduct.name || !newProduct.price) {
      Alert.alert('Error', 'Please fill in product name and price');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('price', newProduct.price);
      
      // Add optional description
      if (newProduct.description) {
        formData.append('description', newProduct.description);
      }

      // Add product image if selected
      if (newProduct.image) {
        const filename = newProduct.image.split('/').pop();
        const fileType = filename.split('.').pop();
        
        formData.append('productImage', {
          uri: newProduct.image,
          name: filename,
          type: `image/${fileType}`
        });
      }

      const response = await axios.post(`${API_URL}/products`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        // Update products list
        setProducts(response.data.products);
        
        // Reset new product form
        setNewProduct({
          name: '',
          price: '',
          description: '',
          image: null,
        });

        Alert.alert('Success', 'Product added successfully');
      }
    } catch (error) {
      console.error('Add product error:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to add product');
    }
  };

  // Delete product
  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`${API_URL}/products/${productId}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.data.success) {
        // Update products list
        setProducts(response.data.products);
        Alert.alert('Success', 'Product deleted successfully');
      }
    } catch (error) {
      console.error('Delete product error:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to delete product');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={pickProfileImage} style={styles.profileImageContainer}>
            {profileImage ? (
              <Image 
                source={{ 
                  uri: profileImage.startsWith('http') 
                    ? profileImage 
                    : `${API_URL.replace('/api', '')}/${profileImage}` 
                }} 
                style={styles.profileImage} 
              />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <MaterialIcons name="add-a-photo" size={30} color="#FFF" />
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.businessInfoContainer}>
            <TextInput
              style={styles.businessName}
              placeholder="Business Name"
              value={businessName}
              onChangeText={(text) => {
                setBusinessName(text);
                // Debounce the update to avoid too many API calls
                setTimeout(() => updateBusinessProfile(), 500);
              }}
              placeholderTextColor="#E0E0E0"
            />
            <Text style={styles.businessType}>Business Account</Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Add New Product/Service Card */}
        <View style={styles.addProductCard}>
          <Text style={styles.cardTitle}>Add New Product/Service</Text>

          {/* Product Image Upload */}
          {newProduct.image && (
            <Image 
              source={{ uri: newProduct.image }} 
              style={styles.productPreviewImage} 
            />
          )}
          <TouchableOpacity 
            style={styles.imagePickerButton} 
            onPress={pickProductImage}
          >
            <MaterialIcons name="photo-camera" size={24} color="#6B7280" />
            <Text style={styles.imagePickerText}>
              {newProduct.image ? 'Change Image' : 'Add Image'}
            </Text>
          </TouchableOpacity>

          <View style={styles.inputGroup}>
            <MaterialIcons name="shopping-bag" size={24} color="#6B7280" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Product/Service Name"
              value={newProduct.name}
              onChangeText={(text) => setNewProduct(prev => ({ ...prev, name: text }))}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <MaterialIcons name="attach-money" size={24} color="#6B7280" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={newProduct.price}
              onChangeText={(text) => setNewProduct(prev => ({ ...prev, price: text }))}
              keyboardType="numeric"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <MaterialIcons name="description" size={24} color="#6B7280" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description"
              value={newProduct.description}
              onChangeText={(text) => setNewProduct(prev => ({ ...prev, description: text }))}
              multiline
              numberOfLines={4}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <TouchableOpacity style={styles.addButton} onPress={addProduct}>
            <Text style={styles.addButtonText}>Add Product/Service</Text>
            <MaterialIcons name="add-circle-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Products List */}
        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>Your Products/Services</Text>
          {products.map((product) => (
            <View key={product._id} style={styles.productCard}>
              {product.image && (
                <Image 
                  source={{ 
                    uri: product.image.startsWith('http') 
                      ? product.image 
                      : `${API_URL.replace('/api', '')}/${product.image}` 
                  }} 
                  style={styles.productImage} 
                />
              )}
              <View style={styles.productHeader}>
                <Text style={styles.productTitle}>{product.name}</Text>
                <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
              </View>
              <Text style={styles.productDescription}>{product.description}</Text>
              <View style={styles.productActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <MaterialIcons name="edit" size={20} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => deleteProduct(product._id)}
                >
                  <MaterialIcons name="delete" size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#2E7D32',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFF',
    overflow: 'hidden',
    backgroundColor: '#064E3B',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  businessInfoContainer: {
    marginLeft: 15,
    flex: 1,
  },
  businessName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  businessType: {
    fontSize: 14,
    color: '#E0E0E0',
  },
  mainContent: {
    padding: 20,
  },
  addProductCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
  },
  inputIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#374151',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#2E7D32',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  productsSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 15,
  },
  productCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  productDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 10,
  },
  productActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 10,
    marginTop: 5,
  },
  actionButton: {
    padding: 8,
    marginLeft: 10,
  },
  productPreviewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  imagePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  imagePickerText: {
    marginLeft: 10,
    color: '#6B7280',
  },
  productImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginBottom: 10,
  },
});