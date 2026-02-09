import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { servicesAPI } from './services/api';
import theme from './theme';

const ServicesPage = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await servicesAPI.getAllServices();
        setServices(response.data.services || []);
      } catch (err) {
        setError('Failed to fetch services');
        console.error('Fetch services error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Browse Services</Text>

      <FlatList
        data={services}
        keyExtractor={(item) => item._id || item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('ServiceDetails', { service: item })
            }
          >
            <Text style={styles.cardTitle}>
              {item.name || item.title}
            </Text>
            <Text style={styles.cardDescription}>
              {item.description}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: theme.colors.surface,
  },
  title: { 
    fontSize: 24, 
    fontWeight: '700', 
    marginBottom: 16,
    color: theme.colors.textPrimary,
  },
  card: { 
    padding: 16, 
    backgroundColor: theme.colors.card, 
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  cardDescription: { 
    fontSize: 14, 
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
  },
  error: {
    fontSize: 16,
    color: theme.colors.error,
  },
});

export default ServicesPage;
