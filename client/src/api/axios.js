import axios from 'axios';

const api = axios.create({
  // This looks for the Vercel variable first. 
  // // If it's not found, it falls back to localhost for your local testing.
  baseURL: import.meta.env.VITE_API_BASE_URL 
    ? `${import.meta.env.VITE_API_BASE_URL}/api` 
    : 'http://localhost:5000/api',
       baseURL: 'http://localhost:5000/api'
});

// Automatically attach the JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
