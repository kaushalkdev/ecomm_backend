const express = require('express');
const ordersController = require('./orders_controller');

const router = express.Router();

/**
 * @route GET /orders/:userId
 * @desc Get all orders for a specific user
 * @access Public
 */
router.get('/orders/:userId', ordersController.getOrdersByUserId);

/**
 * @route POST /orders
 * @desc Create a new order
 * @access Public
 */
router.post('/orders/', ordersController.createOrder);

// /**
//  * @route PUT /orders/:orderId
//  * @desc Update an existing order
//  * @access Public
//  */
// router.put('/orders/:orderId', ordersController.updateOrder);

// /**
//  * @route DELETE /orders/:orderId
//  * @desc Delete an order
//  * @access Public
//  */
// router.delete('orders/:orderId', ordersController.deleteOrder);

module.exports = router;