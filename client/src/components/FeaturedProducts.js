import React from 'react';
import ProductCard from './ProductCard';

const FeaturedProducts = ({ products }) => {
  // Get featured products (first 4 products)
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="featured-section">
      <div className="section-header">
        <h2 className="section-title">Featured Products</h2>
        <p className="section-subtitle">Handpicked items just for you</p>
      </div>
      
      <div className="featured-grid">
        {featuredProducts.map(product => (
          <ProductCard key={product._id} product={product} featured />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;