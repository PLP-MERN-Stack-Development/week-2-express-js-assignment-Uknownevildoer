require('dotenv').config();
const express = require('express');
const app = express();

const logger = require('./middleware/logger');
const productRoutes = require('./routes/products');

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.send('Welcome to the Product API');
});

app.use('/api/products', productRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
});
