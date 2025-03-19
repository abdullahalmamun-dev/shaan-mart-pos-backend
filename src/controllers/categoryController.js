const Categories = require('../../src/models/categoryModel');

// Create a new product
const createCategory = async (req, res) => {
    try {
        const {
            category_name
        } = req.body;

        // Validate required fields
        if (!category_name) {
            return res.status(400).json({ message: 'All required fields must be provided.' });
        }

        // Create the product
        const newCategory = await Categories.create({
            category_name
        });

        res.status(201).json({
            message: 'Category created successfully',
            category: newCategory,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Categories.find();
        res.status(200).json({
            message: 'All Categories retrieved successfully.',
            totalCategories: categories.length,  // Number of categories
            categories: categories
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single product by ID
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Categories.findById(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update category
const updateCategory  = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the current Category data
        const currentCategory= await Categories.findById(id);

        if (!currentCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Check if the incoming data is identical to the current data
        const isSame = Object.keys(req.body).every(
            (key) => JSON.stringify(req.body[key]) === JSON.stringify(currentCategory[key])
        );

        if (isSame) {
            return res.status(200).json({ message: 'No changes made to Category' });
        }

        // Update the product if data is different
        const updatedCategory = await Categories.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            message: 'Category updated successfully',
            category: updatedCategory,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Delete a Category 
const deleteCategory  = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCategory = await Categories.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory 
};
