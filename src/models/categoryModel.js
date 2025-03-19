const mongoose = require('mongoose');

// Define the category schema
const categorySchema = new mongoose.Schema({
    category_name: {
        required: true,
        type: String,
        unique: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Categories', categorySchema);
