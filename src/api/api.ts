import axios from 'axios';

// const API_BASE_URL = 'https://school-backend-u8f0.onrender.com/';
const API_BASE_URL = 'http://localhost:3000/';

export const api = axios.create({
  baseURL: API_BASE_URL
});


// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add Authorization header
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  },
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors like token expiration
    if (error.response?.status === 401) {
      console.error('Unauthorized. Redirecting to login...');
      // Optional: Clear token and redirect to login page
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export const loginApi = (data: any) => api.post('/auth/login', data);
export const addTxn = () => api.post('/transactions/create-collect-request');
export const fetchTransactions = () => api.get('/transactions');
export const fetchTransactionsBySchool = (schoolId: string) => api.get(`/transactions/school/${schoolId}`);
export const fetchTransactionStatus = (customOrderId: string) => api.get(`/transactions/status/${customOrderId}`);
