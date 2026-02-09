import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:5000/api'; // Update with your backend URL

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/login', { email, password }),
  signup: (userData) => api.post('/signup', userData),
  getProfile: () => api.get('/profile'),
  updateProfile: (userData) => api.put('/profile', userData),
};

// Services API
export const servicesAPI = {
  getAllServices: (params = {}) => api.get('/services', { params }),
  getService: (id) => api.get(`/services/${id}`),
  createService: (serviceData) => api.post('/services', serviceData),
  updateService: (id, serviceData) => api.put(`/services/${id}`, serviceData),
  deleteService: (id) => api.delete(`/services/${id}`),
  getServiceTypes: () => api.get('/service-types'),
};

// Categories API
export const categoriesAPI = {
  getAllCategories: () => api.get('/categories'),
  getServicesByCategory: (categoryId, params = {}) => 
    api.get(`/categories/${categoryId}/services`, { params }),
};

// Favorites API
export const favoritesAPI = {
  getFavorites: () => api.get('/favorites'),
  addToFavorites: (serviceId) => api.post(`/favorites/${serviceId}`),
  removeFromFavorites: (serviceId) => api.delete(`/favorites/${serviceId}`),
};

// Reviews API
export const reviewsAPI = {
  getServiceReviews: (serviceId, params = {}) => 
    api.get(`/services/${serviceId}/reviews`, { params }),
  addReview: (serviceId, reviewData) => 
    api.post(`/services/${serviceId}/reviews`, reviewData),
};

// Search API
export const searchAPI = {
  searchServices: (queryParams) => api.get('/search', { params: queryParams }),
};

// History API
export const historyAPI = {
  getHistory: () => api.get('/history'),
  addToHistory: (historyData) => api.post('/history', historyData),
};

export const productsAPI = {
  addProduct: (formData) => api.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
 }; 

export default api;
