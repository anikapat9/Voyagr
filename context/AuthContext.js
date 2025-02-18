// context/AuthContext.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock API configuration - we'll replace this with real endpoints later
const mockAPI = {
  login: async (email, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    if (email && password) {
      return {
        status: 200,
        data: {
          token: 'mock-token-123',
          refreshToken: 'mock-refresh-token-123',
          user: {
            id: 1,
            email,
            name: 'Test User',
            preferences: {
              cuisineTypes: ['Italian', 'Japanese'],
              budgetRange: 'medium',
            }
          }
        }
      };
    }
    
    // Mock login failure
    throw {
      response: {
        status: 401,
        data: { message: 'Invalid credentials' }
      }
    };
  }
};

// Later, when integrating real APIs, we'll replace mockAPI with:
// const api = axios.create({
//   baseURL: 'YOUR_REAL_API_ENDPOINT',
//   timeout: 5000
// });




