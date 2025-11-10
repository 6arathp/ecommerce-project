const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://ecommerce-project-psi-eight.vercel.app', 'https://your-custom-domain.com']
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'E-Commerce API is running!' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce')
  .then(() => {
    console.log('Connected to MongoDB');
    // Seed data if needed
    seedData();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Seed initial products if database is empty
async function seedData() {
  try {
    const Product = require('./models/Product');
    const count = await Product.countDocuments();
    
    if (count === 0) {
      const sampleProducts = [
        {
          name: 'Wireless Bluetooth Headphones',
          price: 79.99,
          category: 'Electronics',
          description: 'High-quality wireless headphones with noise cancellation and 20-hour battery life.',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
        },
        {
          name: 'Smart Watch',
          price: 199.99,
          category: 'Electronics',
          description: 'Advanced smartwatch with fitness tracking, heart rate monitor, and GPS.',
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
        },
        {
          name: 'Laptop Backpack',
          price: 49.99,
          category: 'Accessories',
          description: 'Durable laptop backpack with multiple compartments and water resistance.',
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
        },
        {
          name: 'Coffee Maker',
          price: 129.99,
          category: 'Home',
          description: 'Programmable coffee maker with built-in grinder and thermal carafe.',
          image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500'
        },
        {
          name: 'Yoga Mat',
          price: 29.99,
          category: 'Fitness',
          description: 'Non-slip yoga mat with extra cushioning for comfortable workouts.',
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500'
        },
        {
          name: 'Desk Lamp',
          price: 39.99,
          category: 'Home',
          description: 'LED desk lamp with adjustable brightness and USB charging port.',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500'
        }
      ];
      
      await Product.insertMany(sampleProducts);
      console.log('Sample products added to database');
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});