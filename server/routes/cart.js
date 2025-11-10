const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// GET all cart items
router.get('/', async (req, res) => {
  try {
    const cartItems = await Cart.find().populate('productId');
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST add item to cart
router.post('/', async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if item already exists in cart
    const existingItem = await Cart.findOne({ productId });
    
    if (existingItem) {
      // Update quantity
      existingItem.quantity += quantity;
      await existingItem.save();
      const updatedItem = await Cart.findById(existingItem._id).populate('productId');
      res.json(updatedItem);
    } else {
      // Create new cart item
      const cartItem = new Cart({ productId, quantity });
      await cartItem.save();
      const newItem = await Cart.findById(cartItem._id).populate('productId');
      res.status(201).json(newItem);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update cart item quantity
router.put('/:id', async (req, res) => {
  try {
    const { quantity } = req.body;
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }

    const cartItem = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    ).populate('productId');

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE item from cart
router.delete('/:id', async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndDelete(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;