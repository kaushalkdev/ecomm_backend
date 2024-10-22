const mongoose = require('mongoose');

/**
 * @fileoverview Mongoose schema definition for the Product model.
 * 
 * @module models/product_model
 * 
 * @requires mongoose
 */

/**
 * Product Schema
 * 
 * @typedef {Object} Product
 * @property {String} name - The name of the product. Required.
 * @property {Number} price - The price of the product. Required.
 * @property {String} description - A description of the product. Required.
 * @property {String} imageUrl - The URL of the product image. Required.
 * @property {String} category - The category of the product. Required.
 * @property {String} brand - The brand of the product. Required.
 * @property {Number} rating - The rating of the product. Required. Must be between 0 and 5.
 * @property {Number} reviews - The number of reviews for the product. Required. Must be 0 or greater.
 * @property {Date} createdAt - The date when the product was created. Automatically managed by Mongoose.
 * @property {Date} updatedAt - The date when the product was last updated. Automatically managed by Mongoose.
 */
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    reviews: { type: Number, required: true, min: 0 },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    collection: 'products'
});

/**
 * @fileoverview Mongoose model and data access methods for the Product model.
 * 
 * @module models/product_model
 * 
 * @requires mongoose
 */
const ProductModel = mongoose.model('Product', productSchema);

/**
 * Finds products based on the provided query.
 * 
 * @async
 * @function find
 * @param {Object} query - The query object to filter products.
 * @returns {Promise<Array<Product>>} - A promise that resolves to an array of products.
 * @throws Will throw an error if there is an issue with the database query.
 */
async function find(query) {
    try {
        return await ProductModel.find(query).exec();
    } catch (error) {
        console.error('Error finding products:', error);
        throw error;
    }
}

/**
 * Creates a new product.
 * 
 * @async
 * @function create
 * @param {Object} data - The data for the new product.
 * @returns {Promise<Product>} - A promise that resolves to the created product.
 * @throws Will throw an error if there is an issue with saving the product.
 */
async function create(data) {
    try {
        const product = new ProductModel(data);
        return await product.save();
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
}

/**
 * Deletes a product by its ID.
 * 
 * @async
 * @function remove
 * @param {String} id - The ID of the product to delete.
 * @returns {Promise<Object>} - A promise that resolves to the result of the deletion operation.
 * @throws Will throw an error if there is an issue with deleting the product.
 */
async function remove(id) {
    try {
        return await ProductModel.findByIdAndDelete(id).exec();
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}

module.exports = { find, create, remove };
