const express = require('express');
const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require('../../src/controllers/categoryController');

const router = express.Router();

// Create a new category
router.post('/crate-category', createCategory);

// Get all categories
router.get('/getCategories', getAllCategories);

// Get a single category by ID
router.get('/single/:id', getCategoryById);

// Update a category
router.put('/update/:id', updateCategory);

// Delete a category
router.delete('/delete/:id', deleteCategory);

module.exports = router;
