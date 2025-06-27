const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

module.exports = router
