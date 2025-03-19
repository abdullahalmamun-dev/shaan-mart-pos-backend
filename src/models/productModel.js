const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
    p_name: { type: String, required: true },
    p_category: { type: String, required: true },
    p_brand: { type: String, required: true },
    p_code: { type: String, default: () => Math.floor(10000000 + Math.random() * 90000000).toString(), unique: true },
    p_quantity: { type: Number, required: true },
    p_price: { type: Number, required: true },
    p_cost: { type: Number, required: true },
    p_images: { type: String, default: "" }, // Array of image URLs
    p_unit: { type: String, required: true },
    tax: { type: Number, required: true }, // Percentage value
    p_details: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Products', productSchema);
