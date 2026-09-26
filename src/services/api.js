import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('marketlink_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTH APIs
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (credentials) => api.post('/auth/login', credentials);

// PRODUCTS APIs
export const getProducts = () => api.get('/products');
export const createProduct = (productData) => api.post('/products', productData);
export const updateProduct = (id, productData) => api.put(`/products/${id}`, productData);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// ORDERS APIs
export const getOrders = () => api.get('/orders');
export const getCustomerOrders = () => api.get('/orders/customer');
export const getFarmerOrders = () => api.get('/orders/farmer');
export const createOrder = (orderData) => api.post('/orders', orderData);
export const updateOrderStatus = (id, status) => api.put(`/orders/${id}/status`, { status });

// NOTIFICATIONS APIs
export const getNotifications = () => api.get('/notifications');
export const markNotificationRead = (id) => api.put(`/notifications/${id}/read`);
export const markAllNotificationsRead = () => api.put('/notifications/read-all');

// MARKETS APIs
export const getMarkets = () => api.get('/markets');
export const createMarket = (marketData) => api.post('/markets', marketData);

export default api;
export const getUsers = () => api.get('/users');
export const updateUserStatus = (id, status) => api.put(`/users/${id}/status`, { status });
export const replyToReview = (id, reply) => api.put(`/reviews/${id}/reply`, { reply });
export const deleteReview = (id) => api.delete(`/reviews/delete/${id}`);
