
var model = require('../models/product_model');

exports.getProducts = async function (request, response) {
    try {
        let products = await model.find();
        response.status(200).json(products);

    } catch (error) {
        console.log(error);
        response.status(500).json({ error: error.message });
    }

}

exports.createProduct = async function (request, response) {
    try {
        let product = await model.create(request.body);
        response.status(201).json(product);
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: error.message });
    }
}