import axios from 'axios';

// Create axios instance with base URL depending on environment
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? '' // For production, use relative URLs (empty base URL)
    : 'http://localhost:5000', // For development, use localhost:5000
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Handle errors globally here (like 401 unauthorized)
    return Promise.reject(error);
  }
);

export default api; 