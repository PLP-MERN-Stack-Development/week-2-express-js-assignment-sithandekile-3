// server.js - Starter Express server for Week 2 assignment
require('dotenv').config();
// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');


// Initialize Express app
const app = express();
// Load environment variables from .env file
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());

// Request Logging Middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Authentication Middleware
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey === process.env.API_KEY) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized: Invalid API key' });
  }
});

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// Validate Product Middleware
function validateProduct(req, res, next) {
  const { name, description, price, category, inStock } = req.body;

  if (
    !name || !description || price === undefined || !category || inStock === undefined
  ) {
    return res.status(400).json({ message: 'Missing required product fields' });
  }

  if (
    typeof name === 'string' &&
    typeof description === 'string' &&
    typeof price === 'number' &&
    typeof category === 'string' &&
    typeof inStock === 'boolean'
  ) {
    next();
  } else {
    res.status(400).json({ message: 'Invalid product data types' });
  }
}

// GET /api/products - List products with filtering and pagination
app.get('/api/products', (req, res) => {
  let result = products;

  // Filtering
  if (req.query.category) {
    result = result.filter(p => p.category === req.query.category);
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || result.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = result.slice(start, end);

  res.json({
    page,
    limit,
    total: result.length,
    products: paginated
  });
});

// GET /api/products/:id - Get a specific product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// POST /api/products - Create a new product
app.post('/api/products', validateProduct, (req, res) => {
  const newProduct = {id: uuidv4(),...req.body};
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id - Update an existing product
app.put('/api/products/:id', validateProduct, (req, res) => {
  const productId = req.params.id;
  const index = products.findIndex(p => p.id === productId);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// DELETE /api/products/:id - Delete a product
app.delete('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const initialLength = products.length;
  products = products.filter(p => p.id !== productId);
  if (products.length < initialLength) {
    res.json({ message: `Product with id ${productId} has been deleted successfully` });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// GET /api/products/search?name=keyword - Search by name
app.get('/api/products/search', (req, res) => {
  const name = req.query.name ? req.query.name.toLowerCase() : '';
  const result = products.filter(p => p.name.toLowerCase().includes(name));
  res.json(result);
});

// GET /api/products/stats - Count products per category
app.get('/api/products/stats', (req, res) => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json(stats);
});

// Error Handling Middleware (last!)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export app for testing
module.exports = app;
