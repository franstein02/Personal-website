import axios from 'axios';

const API_BASE_URL = 'http://localhost:8002'; // Backend runs on 8002

const adminApi = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to attach token
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor to handle 401 Unauthorized
adminApi.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    // If not already on login page, redirect
    if (window.location.pathname !== '/admin/login') {
      localStorage.removeItem('admin_token');
      window.location.href = '/admin/login';
    }
  }
  return Promise.reject(error);
});

export default adminApi;
