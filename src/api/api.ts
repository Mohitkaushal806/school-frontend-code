import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer YOUR_API_TOKEN`,
  },
});

export const loginApi = (data: any) => api.post('/auth/login', data);
export const addTxn = () => api.post('/transactions/create-collect-request');
export const fetchTransactions = () => api.get('/transactions');
export const fetchTransactionsBySchool = (schoolId: string) => api.get(`/transactions/school/${schoolId}`);
export const fetchTransactionStatus = (customOrderId: string) => api.get(`/transactions/status/${customOrderId}`);
