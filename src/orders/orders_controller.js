const Order = require('../orders/orders_model');

// /Users/administrator/Desktop/Projects/node/ecomm_backend/src/controllers/orders_controller.js


/**
 * Orders Controller
 * 
 * This controller handles operations related to orders.
 */

/**
 * Get Orders by User ID
 * 
 * This function retrieves a list of orders associated with a specific user ID.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const getOrdersByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const orders = await Order.find({ userId: userId });

        if (!orders.length) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getOrdersByUserId
};