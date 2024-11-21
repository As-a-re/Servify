import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, TextInput, Platform, Dimensions, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function MyAccountScreen({ navigation }) {
  const [profileImage, setProfileImage] = useState(null);
  const [businessName, setBusinessName] = useState('');
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
  });

  // Load saved data on mount
  useEffect(() => {
    (async () => {
      const savedProfileImage = await AsyncStorage.getItem('profileImage');
      const savedBusinessName = await AsyncStorage.getItem('businessName');
      setProfileImage(savedProfileImage || null);
      setBusinessName(savedBusinessName || '');
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);
      await AsyncStorage.setItem('profileImage', uri);
    }
  };

  const handleBusinessNameChange = async (text) => {
    setBusinessName(text);
    await AsyncStorage.setItem('businessName', text);
  };

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('http://<your_backend_url>/api/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer <your_token_here>`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
        setNewProduct({ name: '', price: '', description: '', image: null });
        Alert.alert('Success', 'Product added successfully!');
      } else {
        Alert.alert('Error', data.message || 'Failed to add product.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://<your_backend_url>/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer <your_token_here>`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
        Alert.alert('Success', 'Product deleted successfully!');
      } else {
        Alert.alert('Error', data.message || 'Failed to delete product.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
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
              onChangeText={handleBusinessNameChange}
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

          <View style={styles.inputGroup}>
            <MaterialIcons name="shopping-bag" size={24} color="#6B7280" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Product/Service Name"
              value={newProduct.name}
              onChangeText={(text) => setNewProduct({ ...newProduct, name: text })}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <MaterialIcons name="attach-money" size={24} color="#6B7280" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={newProduct.price}
              onChangeText={(text) => setNewProduct({ ...newProduct, price: text })}
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
              onChangeText={(text) => setNewProduct({ ...newProduct, description: text })}
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
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productHeader}>
                <Text style={styles.productTitle}>{product.name}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
              </View>
              <Text style={styles.productDescription}>{product.description}</Text>
              <View style={styles.productActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <MaterialIcons name="edit" size={20} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => deleteProduct(product.id)}
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
    backgroundColor: '#10B981',
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
    backgroundColor: '#10B981',
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
    color: '#10B981',
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
});