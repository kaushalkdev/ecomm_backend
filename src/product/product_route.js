const express = require('express');
const productController = require('./product_controller');
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
router.post('/products/create', productController.createProduct);


/**
 * @route GET /delete
 * @description Delete a product
 * @access Public
 */
router.post('/products/delete', productController.deleteProduct);

/**
 * @route POST /details
 * @description Finds a product and returns it else returns {}
 * @access Public
 */
router.post('/products/details', productController.getProductWithId);


module.exports = router;