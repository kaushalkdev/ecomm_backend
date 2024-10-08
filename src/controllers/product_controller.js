const model = require('../models/product_model');

/**
 * Get all products
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 */
exports.getProducts = async function (request, response) {
    try {
        const products = await model.find();
        response.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Products fetched successfully',
            numberOfProducts: products.length,
            result: products
        });
        } catch (error) {
        console.error('Error fetching products:', error);
        response.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Internal Server Error',
            numberOfProducts: 0,
            result: []
        });
    }
}

/**
 * Create a new product
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 */
exports.createProduct = async function (request, response) {
    try {
        const product = await model.create(request.body);
        response.status(201).json({
            status: 'success',
            statusCode: 201,
            message: 'Product created successfully',
            result: product
        });
    } catch (error) {
        console.error('Error creating product:', error);
        response.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Internal Server Error',
            result: null
        });
    }
}