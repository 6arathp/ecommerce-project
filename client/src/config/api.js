const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  products: `${API_BASE_URL}/api/products`,
  cart: `${API_BASE_URL}/api/cart`
};

export default API_BASE_URL;