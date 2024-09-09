var express = require('express');
const productController = require('../controllers/product_controller');
const router = express.Router();

// GET /products
router.get('/products', productController.getProducts);


exports.router = router;