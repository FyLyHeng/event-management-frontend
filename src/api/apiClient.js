import axios from 'axios';



const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});



apiClient.interceptors.request.use(
  (config) => {
    if (config.authRequired) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn('Token not found for an authenticated request');
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global error responses, e.g., token expiry
    if (error.response?.status === 401) {
      console.error('Unauthorized request - maybe token expired');
      // Handle logout or token refresh logic if needed
    }
    return Promise.reject(error);
  }
);


export default apiClient;
