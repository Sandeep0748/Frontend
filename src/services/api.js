import axios from 'axios';

const API_URL = 'https://skill-exchange-server-u91b.vercel.app/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use(
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

// Handle responses
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      message: error.response?.data?.message,
      data: error.response?.data,
      originalError: error.message,
    });

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    // Create a proper error object
    const errorData = error.response?.data;
    const errorMessage = errorData?.message || error.message || 'An error occurred';
    
    const err = new Error(errorMessage);
    err.code = error.response?.status;
    err.data = errorData;
    
    return Promise.reject(err);
  }
);

export default apiClient;
