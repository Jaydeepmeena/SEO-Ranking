import axios from 'axios';

// Get API URL from environment variable or use defaults
const getApiUrl = () => {
  // If VITE_API_URL is explicitly set (even if empty string), use it
  if (import.meta.env.VITE_API_URL !== undefined) {
    return import.meta.env.VITE_API_URL || '/api';
  }
  // Development: use localhost
  if (import.meta.env.DEV) {
    return 'http://localhost:5000/api';
  }
  // Production fallback: use relative path (won't work without backend on same domain)
  return '/api';
};

const API_URL = getApiUrl();

// Log API URL in development for debugging
if (import.meta.env.DEV) {
  console.log('🔗 API URL:', API_URL);
}

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Login failed');
  }
};

export const register = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Registration failed');
  }
};

