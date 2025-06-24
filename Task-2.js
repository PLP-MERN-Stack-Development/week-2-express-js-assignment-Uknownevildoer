// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());

//logging middleware
app.use((req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next(); 
});

//authentication middleware
const API_KEY = process.env.API_KEY; 

const authMiddleware = (req, res, next) => {
  const userKey = req.headers['authorization']; 

  if (userKey !== API_KEY) {
    return res.status(401).json({ success: false, msg: 'Unauthorized: Invalid API key' });
  }
  next(); 
};


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

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});


app.get('/api/products', (req, res) => {
  let { search, category, maxPrice, inStock, page = 1, limit = 5 } = req.query;

  let result = [...products];

  // Search by name
  if (search) {
    result = result.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Filter by category
  if (category) {
    result = result.filter(product =>
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by price
  if (maxPrice) {
    result = result.filter(product => product.price <= Number(maxPrice));
  }

  // Filter by stock
  if (inStock) {
    const stockBool = inStock === 'true';
    result = result.filter(product => product.inStock === stockBool);
  }

  // Pagination
  limit = Number(limit);
  page = Number(page);
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = result.slice(start, end);

  res.json({
    success: true,
    total: result.length,
    page,
    limit,
    data: paginated
  });
});


app.get('/api/products/:id',(req,res)=>{
  const {id} = req.params
  const product = products.find((product)=>product.id === id)
  if(!product){
    return res.status(404).send('product not found')
  }
  res.json(product)
})
app.post('/api/products',authMiddleware,(req,res)=>{
  const { name, description, price, category, inStock } = req.body
  if(!name || !description || price== null || !category || inStock == null){
    return res.status(400).json({success: false, msg: 'Please provide all product details'})
  }
  const newProduct = {
    id: (products.length + 1).toString(),
    name,
    description,
    price,
    category,
    inStock
  };
  products.push(newProduct);
  res.status(201).json({success: true, data: products});
}) 
app.put('/api/products/:id',(req,res)=>{
  const {id}= req.params
  const { name, description, price, category, inStock}= req.body

  const product = products.find((product)=>product.id === id)
  if (!product){
    return res.status(404).json({success: false, msg:`No product with id ${id}`})
  }
  if (name !== undefined) product.name = name;
  if (description !== undefined) product.description = description;
  if (price !== undefined) product.price = price;
  if (category !== undefined) product.category = category;
  if (inStock !== undefined) product.inStock = inStock;

  res.status(200).json({success: true, data: product})
})
app.delete('/api/products/:id',authMiddleware, (req, res) => {
  const { id } = req.params;
  const product = products.find((product) => product.id === id);

  if (!product) {
    return res.status(404).json({ success: false, msg: `No product with id ${id}` });
  }

  products = products.filter((product) => product.id !== id); // update original array

  return res.status(200).json({ success: true, data: products });
});


// Start the server
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000...`);
});

// Export the app for testing purposes
module.exports = app; 
