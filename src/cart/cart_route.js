const express = require('express');
const cartController = require('./cart_controller');
const router = express.Router();


router.post('/cart/add', cartController.addItem);
router.post('/cart/remove', cartController.removeItem);
router.post('/cart/update', cartController.updateItemQuantity);
router.get('/cart/:userId', cartController.getCart);

module.exports = router;