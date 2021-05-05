const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productID: {
        type: Number,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
});

const Product = mongoose.model("Product",ProductSchema);
module.exports = Product;