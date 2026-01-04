const CartModel = require('./cart_model');

/**
 * Cart Controller
 * Handles operations related to the shopping cart.
 */


class CartController {
    /**
     * Adds an item to the cart.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    static async addItem(req, res) {
        try {
            const { userId, productId, quantity } = req.body;
            const cart = await CartModel.addItem(userId, productId, quantity);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Removes an item from the cart.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    static async removeItem(req, res) {
        try {
            const { userId, productId } = req.body;
            const cart = await CartModel.removeItem(userId, productId);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Gets the cart for a user.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    static async getCart(req, res) {
        try {
            const { userId } = req.params;
            const cart = await CartModel.getCart(userId);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Updates the quantity of an item in the cart.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    static async updateItemQuantity(req, res) {
        try {
            const { userId, productId, quantity } = req.body;
            const cart = await CartModel.updateItemQuantity(userId, productId, quantity);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CartController;