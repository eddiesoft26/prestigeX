import axios from 'axios';

const api = axios.create({
  baseURL: 'https://prestigex.onrender.com/api', // Note the /api prefix
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
