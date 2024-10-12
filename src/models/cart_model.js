/**
 * @file cart_model.js
 * @description Mongoose model for the Cart collection in the e-commerce backend.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * @typedef {Object} CartItem
 * @property {String} productId - The ID of the product.
 * @property {Number} quantity - The quantity of the product.
 */

/**
 * @typedef {Object} Cart
 * @property {String} userId - The ID of the user.
 * @property {CartItem[]} items - The list of items in the cart.
 * @property {Date} createdAt - The date when the cart was created.
 * @property {Date} updatedAt - The date when the cart was last updated.
 */

const cartSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    items: [
        {
            productId: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { collection: 'carts' });

/**
 * Finds a cart by the user ID.
 * @function findCartByUserId
 * @memberof Cart
 * @param {String} userId - The ID of the user.
 * @returns {Promise<Cart|null>} The cart associated with the user ID, or null if not found.
 * @throws {Error} If there is an error finding the cart.
 */
cartSchema.statics.findCartByUserId = async function (userId) {
    try {
        const cart = await this.findOne({ userId });
        return cart;
    } catch (error) {
        throw new Error('Error finding cart: ' + error.message);
    }
};

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;