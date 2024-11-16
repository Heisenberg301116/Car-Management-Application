import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_BASE_URL;
const API_BASE_URL = `${SERVER_URL}/api`;

// console.log("=======================> SERVER_URL = ", SERVER_URL)
// console.log("=======================> api_base = ", API_BASE_URL)

// Function to get the token from localStorage or wherever you store it
const getAuthToken = () => {
  return localStorage.getItem('token'); // Adjust if you're using a different storage method
};

const api = {
  // Authentication
  login: (data) => axios.post(`${API_BASE_URL}/auth/login`, data),
  signup: (data) => axios.post(`${API_BASE_URL}/auth/signup`, data),

  // Car Management
  getCars: () => {
    const token = getAuthToken(); // Get token from storage
    return axios.get(`${API_BASE_URL}/cars`, {
      headers: {
        Authorization: `Bearer ${token}`  // Add the JWT token to the headers
      }
    });
  },

  getCar: (id) => {
    const token = getAuthToken(); // Get token from storage
    return axios.get(`${API_BASE_URL}/cars/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`  // Add the JWT token to the headers
      }
    });
  },

  createCar: (data) => {
    const token = getAuthToken(); // Get token from storage
    return axios.post(`${API_BASE_URL}/cars`, data, {
      headers: {
        Authorization: `Bearer ${token}`  // Add the JWT token to the headers
      }
    });
  },

  updateCar: (id, data) => {
    const token = getAuthToken(); // Get token from storage
    return axios.put(`${API_BASE_URL}/cars/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`  // Add the JWT token to the headers
      }
    });
  },

  deleteCar: (id) => {
    const token = getAuthToken(); // Get token from storage
    return axios.delete(`${API_BASE_URL}/cars/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`  // Add the JWT token to the headers
      }
    });
  },

  uploadImage: (data) => {
    const token = getAuthToken(); // Get token from storage
    return axios.post(`${API_BASE_URL}/upload`, data, {
      headers: {
        Authorization: `Bearer ${token}`  // Add the JWT token to the headers
      }
    });
  },
};

export default api;