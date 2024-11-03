const Order = require('../orders/orders_model');
const Razorpay = require('razorpay');
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});



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
/**
 * Create order api which calls the razor pay module to 
 * make payment.
 * @param {Object} req take amount 
 * @param {Object} res succes and failure response
 * @returns 
 */
const createOrder = async (req, res) => {
    const { amount } = req.body;
    try {
        const options = {
            amount: amount, // Amount in paise
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        const order = await razorpay.orders.create(options);
        if (!order) {
            return res.status(500).json({
                message: 'Failed to create order'
            });
        }
        res.status(200).json({
            id: order.id,
            currency: order.currency,
            amount: order.amount
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};


module.exports = {
    getOrdersByUserId, createOrder

};