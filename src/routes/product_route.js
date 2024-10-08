const express = require('express');
const productController = require('../controllers/product_controller');
const router = express.Router();

/**
 * @route GET /products
 * @description Get all products
 * @access Public
 */
router.get('/products', productController.getProducts);

/**
 * @route POST /create
 * @description Create a new product
 * @access Public
 */
router.post('/create', productController.createProduct);

module.exports = router;