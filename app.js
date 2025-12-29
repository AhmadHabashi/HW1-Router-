//214626913 אחמד חבשי
//עותמאן אגבאריה 327809190



const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const data = require('./data');

const port = process.env.PORT || 3000;

// Middleware for JSON processing (if required)
app.use(express.json());
app.use(express.static('public'));

// Routers
app.use('/api/users', userRoutes); // All user routes

// Main Page
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Main Page</h1>');
});

//Get  all Products
app.get('/api/products', (req, res) => {
  res.json(data.products);
});

//Get product by ID
app.get('/api/products/:id', (req, res) => {
  const product = data.products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

//Add new product 
app.post('/api/products', (req, res) => {
  const newProduct = {
    id:req.body.id,
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock
  };  
  if (newProduct.price > 0 && newProduct.stock >=0) {
    data.products.push(newProduct);
    res.status(201).json(newProduct);
  } else {
    res.status(400).json({ message: 'Invalid product data' });
  }
});

//uppdate the product by ID 
app.put('/api/products/:id', (req, res) => {
  const product = data.products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    const updatedPrice = req.body.price;
    const updatedStock = req.body.stock;
    if (updatedPrice > 0 && updatedStock >=0) {
      product.price = updatedPrice;
      product.stock = updatedStock;
      res.json(product);
    } else 
      {
      res.status(400).json({ message: 'Invalid product data' });
    }
  }
   else  {
    res.status(404).json({ message: 'Product not found' });
  }
});

//Delete product by ID
app.delete('/api/products/:id', (req, res) => {
  const productIndex = data.products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex !== -1) {
    const deletedProduct = data.products.splice(productIndex, 1);
    res.json(deletedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  } 
});

// Processing route 404
app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


