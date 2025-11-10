const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    price: 79.99,
    category: 'Electronics',
    description: 'High-quality wireless headphones with noise cancellation and 20-hour battery life. Perfect for music lovers and professionals.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
  },
  {
    name: 'Smart Watch',
    price: 199.99,
    category: 'Electronics',
    description: 'Advanced smartwatch with fitness tracking, heart rate monitor, GPS, and smartphone integration.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
  },
  {
    name: 'Laptop Backpack',
    price: 49.99,
    category: 'Accessories',
    description: 'Durable laptop backpack with multiple compartments, water resistance, and ergonomic design.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
  },
  {
    name: 'Coffee Maker',
    price: 129.99,
    category: 'Home',
    description: 'Programmable coffee maker with built-in grinder, thermal carafe, and automatic shut-off.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500'
  },
  {
    name: 'Yoga Mat',
    price: 29.99,
    category: 'Fitness',
    description: 'Premium non-slip yoga mat with extra cushioning and eco-friendly materials for comfortable workouts.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500'
  },
  {
    name: 'LED Desk Lamp',
    price: 39.99,
    category: 'Home',
    description: 'Modern LED desk lamp with adjustable brightness, color temperature control, and USB charging port.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500'
  },
  {
    name: 'Wireless Mouse',
    price: 24.99,
    category: 'Electronics',
    description: 'Ergonomic wireless mouse with precision tracking and long-lasting battery life.',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500'
  },
  {
    name: 'Water Bottle',
    price: 19.99,
    category: 'Fitness',
    description: 'Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours.',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500'
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    console.log('🗑️ Clearing existing products...');
    await Product.deleteMany({});

    // Insert sample products
    console.log('📦 Adding sample products...');
    const products = await Product.insertMany(sampleProducts);
    
    console.log(`✅ Successfully added ${products.length} products to the database!`);
    
    // Display the products
    console.log('\n📋 Products added:');
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - $${product.price}`);
    });

    console.log('\n🎉 Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

seedDatabase();