const express = require('express');
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../../src/controllers/productController');

const router = express.Router();

// Create a new product
router.post('/crateProduct', createProduct);

// Get all products
router.get('/getProduct', getAllProducts);

// Get a single product by ID
router.get('/single/:id', getProductById);

// Update a product
router.put('/update/:id', updateProduct);

// Delete a product
router.delete('/delete/:id', deleteProduct);

module.exports = router;
