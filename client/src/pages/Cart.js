import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';
import QuantitySelector from '../components/QuantitySelector';

const Cart = () => {
  const { cart, loading, removeFromCart, getCartTotal, updateCartQuantity } = useCart();
  const [updatingItems, setUpdatingItems] = useState({});

  const handleRemoveItem = async (cartItemId) => {
    const success = await removeFromCart(cartItemId);
    if (!success) {
      alert('Failed to remove item from cart');
    }
  };

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setUpdatingItems(prev => ({ ...prev, [cartItemId]: true }));
    const success = await updateCartQuantity(cartItemId, newQuantity);
    setUpdatingItems(prev => ({ ...prev, [cartItemId]: false }));
    
    if (!success) {
      alert('Failed to update quantity');
    }
  };

  if (loading) {
    return (
      <div className="container">
        <LoadingSpinner message="Loading cart..." />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container">
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
          Shopping Cart
        </h1>
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
        Shopping Cart
      </h1>
      
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/" className="btn btn-secondary">
          ← Continue Shopping
        </Link>
      </div>

      <div className="cart-items">
        {cart.map(item => (
          <div key={item._id} className="cart-item">
            <img 
              src={item.productId.image} 
              alt={item.productId.name}
              className="cart-item-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/80x80?text=Product';
              }}
            />
            
            <div className="cart-item-info">
              <div className="cart-item-name">{item.productId.name}</div>
              <div className="cart-item-price">${item.productId.price}</div>
              <div className="cart-item-quantity">
                <QuantitySelector
                  quantity={item.quantity}
                  onIncrease={() => handleQuantityChange(item._id, item.quantity + 1)}
                  onDecrease={() => handleQuantityChange(item._id, item.quantity - 1)}
                  min={1}
                  max={10}
                />
                {updatingItems[item._id] && <span className="updating-text">Updating...</span>}
              </div>
              <div style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>
                Subtotal: ${(item.productId.price * item.quantity).toFixed(2)}
              </div>
            </div>
            
            <div>
              <button 
                onClick={() => handleRemoveItem(item._id)}
                className="btn btn-danger"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          Total: ${getCartTotal()}
        </div>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button 
            className="btn btn-primary"
            style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}
            onClick={() => alert('Checkout functionality would be implemented here!')}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;