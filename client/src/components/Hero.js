import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Discover Amazing Products
            <span className="hero-accent"> at Great Prices</span>
          </h1>
          <p className="hero-description">
            Shop from our curated collection of premium products. From electronics to home essentials, 
            find everything you need with fast shipping and excellent customer service.
          </p>
          <div className="hero-buttons">
            <Link to="#products" className="btn btn-primary btn-large">
              Shop Now
            </Link>
            <button className="btn btn-outline btn-large">
              Learn More
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-image-container">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" 
              alt="Shopping Experience"
              className="hero-img"
            />
            <div className="hero-overlay">
              <div className="hero-stat">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Products</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;