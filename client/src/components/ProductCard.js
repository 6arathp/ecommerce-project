import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    const success = await addToCart(product._id);
    setIsAdding(false);
    
    // You can replace this with toast notifications later
    if (success) {
      // Show success feedback
      const button = e.target;
      const originalText = button.textContent;
      button.textContent = '✓ Added!';
      button.style.backgroundColor = '#28a745';
      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '';
      }, 2000);
    }
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Product+Image';
          }}
        />
        <div className="product-info">
          <div className="product-category">{product.category}</div>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">
            {product.description.substring(0, 100)}...
          </p>
          <div className="product-price">${product.price}</div>
        </div>
      </Link>
      <div style={{ padding: '0 1rem 1rem' }}>
        <button 
          onClick={handleAddToCart}
          className="btn btn-primary"
          style={{ width: '100%' }}
          disabled={isAdding}
        >
          {isAdding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;