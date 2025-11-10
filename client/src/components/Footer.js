import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>E-Commerce Store</h3>
          <p>Your one-stop shop for amazing products at great prices.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li><a href="#electronics">Electronics</a></li>
            <li><a href="#home">Home & Garden</a></li>
            <li><a href="#fitness">Fitness</a></li>
            <li><a href="#accessories">Accessories</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Connect With Us</h4>
          <div className="social-links">
            <a href="#facebook" aria-label="Facebook">📘</a>
            <a href="#twitter" aria-label="Twitter">🐦</a>
            <a href="#instagram" aria-label="Instagram">📷</a>
            <a href="#linkedin" aria-label="LinkedIn">💼</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 E-Commerce Store. All rights reserved.</p>
        <p>Built with React, Node.js, and MongoDB</p>
      </div>
    </footer>
  );
};

export default Footer;