var express = require('express');
const productController = require('../controllers/product_controller');
const router = express.Router();

router.get('/products', productController.getProducts);
router.post('/create', productController.createProduct);


exports.router = router;