import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL || ''}/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Error fetching product: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const success = await addToCart(product._id, quantity);
    if (success) {
      alert(`${quantity} item(s) added to cart!`);
    } else {
      alert('Failed to add product to cart');
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading product...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">{error}</div>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link to="/" className="btn btn-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container">
        <div className="error">Product not found</div>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link to="/" className="btn btn-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/" className="btn btn-secondary">
          ← Back to Products
        </Link>
      </div>
      
      <div className="product-detail">
        <div>
          <img 
            src={product.image} 
            alt={product.name}
            className="product-detail-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x400?text=Product+Image';
            }}
          />
        </div>
        
        <div className="product-detail-info">
          <div className="product-detail-category">{product.category}</div>
          <h1>{product.name}</h1>
          <div className="product-detail-price">${product.price}</div>
          <p className="product-detail-description">{product.description}</p>
          
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="quantity" style={{ marginRight: '0.5rem' }}>
              Quantity:
            </label>
            <select 
              id="quantity"
              value={quantity} 
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="btn btn-primary"
            style={{ width: '100%', fontSize: '1.1rem' }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;