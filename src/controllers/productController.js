const Product = require('../../src/models/productModel');

// Create a new product
const createProduct = async (req, res) => {
    try {
        const {
            p_name,
            p_category,
            p_brand,
            p_quantity,
            p_price,
            p_cost,
            p_images,
            p_unit,
            tax,
            p_details,
        } = req.body;

        // Validate required fields
        if (!p_name || !p_category || !p_brand || !p_quantity || !p_price || !p_cost || !p_unit || !tax) {
            return res.status(400).json({ message: 'All required fields must be provided.' });
        }

        // Create the product
        const newProduct = await Product.create({
            p_name,
            p_category,
            p_brand,
            p_quantity,
            p_price,
            p_cost,
            p_images,
            p_unit,
            tax,
            p_details,
        });

        res.status(201).json({
            message: 'Product created successfully',
            product: newProduct,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json({ 
        message: 'All products retrieved successfully.', 
        totalProducts: products.length,  // Number of products
        products: products 
      }); 
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
// Get a single product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the current product data
        const currentProduct = await Product.findById(id);

        if (!currentProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the incoming data is identical to the current data
        const isSame = Object.keys(req.body).every(
            (key) => JSON.stringify(req.body[key]) === JSON.stringify(currentProduct[key])
        );

        if (isSame) {
            return res.status(200).json({ message: 'No changes made to product' });
        }

        // Update the product if data is different
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            message: 'Product updated successfully',
            product: updatedProduct,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
