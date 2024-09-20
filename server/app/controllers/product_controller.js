
var productModel = require('../models/product_model');

exports.getProducts = async function (request, response) {
    try {
        const products = await productModel.find({});
        response.json(products);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }

}