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
}, {
    timestamps: true,
    collection: 'carts',
});



const Cart = mongoose.model('Cart', cartSchema);

/**
 * Gets a cart for a user (guest or authenticated).
 * Creates a new cart if one doesn't exist.
 * @param {String} userId - The ID of the user (can be guest UUID or real user ID).
 * @returns {Promise<Cart>} The cart associated with the user ID.
 * @throws {Error} If there is an error finding or creating the cart.
 */
Cart.getCart = async function (userId) {
    try {
        let cart = await this.findOne({ userId });

        // If cart doesn't exist, create a new one
        if (!cart) {
            cart = new Cart({
                userId,
                items: []
            });
            await cart.save();
        }

        return cart;
    } catch (error) {
        throw new Error('Error getting cart: ' + error.message);
    }
};

/**
 * Adds an item to the cart or updates quantity if item already exists.
 * @param {String} userId - The ID of the user (can be guest UUID or real user ID).
 * @param {String} productId - The ID of the product to add.
 * @param {Number} quantity - The quantity to add.
 * @returns {Promise<Cart>} The updated cart.
 * @throws {Error} If there is an error adding the item.
 */
Cart.addItem = async function (userId, productId, quantity) {
    try {
        let cart = await this.getCart(userId);

        // Check if item already exists in cart
        const existingItemIndex = cart.items.findIndex(
            item => item.productId === productId
        );

        if (existingItemIndex > -1) {
            // Update quantity if item exists
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // Add new item
            cart.items.push({ productId, quantity });
        }
        await cart.save();

        return cart;
    } catch (error) {
        throw new Error('Error adding item to cart: ' + error.message);
    }
};

/**
 * Removes an item from the cart.
 * @param {String} userId - The ID of the user.
 * @param {String} productId - The ID of the product to remove.
 * @returns {Promise<Cart>} The updated cart.
 * @throws {Error} If there is an error removing the item.
 */
Cart.removeItem = async function (userId, productId) {
    try {
        let cart = await this.getCart(userId);

        // Filter out the item
        cart.items = cart.items.filter(item => item.productId !== productId);
        await cart.save();

        return cart;
    } catch (error) {
        throw new Error('Error removing item from cart: ' + error.message);
    }
};

/**
 * Updates the quantity of an item in the cart.
 * @param {String} userId - The ID of the user.
 * @param {String} productId - The ID of the product.
 * @param {Number} quantity - The new quantity.
 * @returns {Promise<Cart>} The updated cart.
 * @throws {Error} If there is an error updating the item quantity.
 */
Cart.updateItemQuantity = async function (userId, productId, quantity) {
    try {
        let cart = await this.getCart(userId);

        const itemIndex = cart.items.findIndex(
            item => item.productId === productId
        );

        if (itemIndex === -1) {
            throw new Error('Item not found in cart');
        }

        if (quantity <= 0) {
            // Remove item if quantity is 0 or negative
            cart.items.splice(itemIndex, 1);
        } else {
            // Update quantity
            cart.items[itemIndex].quantity = quantity;
        }
        await cart.save();

        return cart;
    } catch (error) {
        throw new Error('Error updating item quantity: ' + error.message);
    }
};

/**
 * Merges a guest cart into an authenticated user's cart.
 * This is called when a user logs in after adding items as a guest.
 * @param {String} guestId - The guest user ID (UUID).
 * @param {String} authenticatedUserId - The real authenticated user ID.
 * @returns {Promise<Cart>} The merged cart.
 * @throws {Error} If there is an error merging carts.
 */
Cart.mergeGuestCart = async function (guestId, authenticatedUserId) {
    try {
        // Get both carts
        const guestCart = await this.findOne({ userId: guestId });
        const userCart = await this.getCart(authenticatedUserId);

        // If no guest cart exists, just return user cart
        if (!guestCart || guestCart.items.length === 0) {
            return userCart;
        }

        // Merge items from guest cart into user cart
        for (const guestItem of guestCart.items) {
            const existingItemIndex = userCart.items.findIndex(
                item => item.productId === guestItem.productId
            );

            if (existingItemIndex > -1) {
                // Add quantities if item exists in both carts
                userCart.items[existingItemIndex].quantity += guestItem.quantity;
            } else {
                // Add new item from guest cart
                userCart.items.push({
                    productId: guestItem.productId,
                    quantity: guestItem.quantity
                });
            }
        }

        await userCart.save();

        // Delete the guest cart after merging
        await this.deleteOne({ userId: guestId });

        return userCart;
    } catch (error) {
        throw new Error('Error merging guest cart: ' + error.message);
    }
};

/**
 * Clears all items from a cart.
 * @param {String} userId - The ID of the user.
 * @returns {Promise<Cart>} The cleared cart.
 * @throws {Error} If there is an error clearing the cart.
 */
Cart.clearCart = async function (userId) {
    try {
        let cart = await this.getCart(userId);
        cart.items = [];
        await cart.save();
        return cart;
    } catch (error) {
        throw new Error('Error clearing cart: ' + error.message);
    }
};

module.exports = Cart;