const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true },
    reviews: { type: Number, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
}, {
    collection: 'products'
});

const ProductModel = mongoose.model('Product', productSchema);

async function find(query) {
    var products = await ProductModel.find(query);
    return products;
}


exports = {
    find
}

