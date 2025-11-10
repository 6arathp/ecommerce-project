import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

// Cart reducer for state management
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case 'ADD_TO_CART':
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  items: [],
  loading: false
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Fetch cart items from API
  const fetchCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await fetch('/api/cart');
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: 'SET_CART', payload: data });
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (response.ok) {
        const newItem = await response.json();
        // Refresh cart to get updated data
        fetchCart();
        return true;
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  };

  // Remove item from cart
  const removeFromCart = async (cartItemId) => {
    try {
      const response = await fetch(`/api/cart/${cartItemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        dispatch({ type: 'REMOVE_FROM_CART', payload: cartItemId });
        return true;
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      return false;
    }
  };

  // Get cart count
  const getCartCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  // Update cart quantity
  const updateCartQuantity = async (cartItemId, newQuantity) => {
    try {
      const response = await fetch(`/api/cart/${cartItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (response.ok) {
        dispatch({ 
          type: 'UPDATE_QUANTITY', 
          payload: { id: cartItemId, quantity: newQuantity } 
        });
        return true;
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      return false;
    }
  };

  // Get cart total
  const getCartTotal = () => {
    return state.items.reduce((total, item) => {
      return total + (item.productId.price * item.quantity);
    }, 0).toFixed(2);
  };

  // Load cart on component mount
  useEffect(() => {
    fetchCart();
  }, []);

  const value = {
    cart: state.items,
    loading: state.loading,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getCartCount,
    getCartTotal,
    fetchCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};