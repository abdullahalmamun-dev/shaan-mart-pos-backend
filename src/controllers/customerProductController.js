const CustomerProduct = require('../../src/models/CustomerProductModel');

const createCustomerProduct = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      purchaseDate,
      purchasedProducts,
      grandTotal,
      totalItems,
      paymentStatus,
    } = req.body;

    // Check if the email or phone already exists
    // const existingCustomer = await CustomerProduct.findOne({
    //   $or: [
    //     { customerEmail },
    //     { customerPhone },
    //   ],
    // });

    // if (existingCustomer) {
    //   return res.status(400).json({
    //     message: "Customer with this email or phone number already exists.",
    //   });
    // }

    // Calculate customer points
    const customerPoints = totalItems * 100;

    // Create a new customer product entry
    const newCustomerProduct = new CustomerProduct({
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      purchaseDate, // Include this field
      purchasedProducts,
      grandTotal,
      totalItems,
      customerPoints,
      paymentStatus,
    });
    
    // Save the customer product to the database
    await newCustomerProduct.save();

    res.status(201).json({
      message: "Customer product created successfully.",
      data: newCustomerProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create customer product.",
      error: error.message,
    });
  }
};
// Function to fetch all customer products
const getAllCustomerProducts = async (req, res) => {
  try {
    // Fetch all customer products
    const customerProducts = await CustomerProduct.find();

    if (customerProducts.length === 0) {
      return res.status(404).json({
        message: "No customer products found.",
      });
    }

    res.status(200).json({
      message: "Customer products retrieved successfully.",
      totalCustomerProducts: customerProducts.length, // Number of customer products
      data: customerProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customer products.",
      error: error.message,
    });
  }
};

const getSingleCustomerProduct = async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the request parameters

    // Fetch the single customer product by its ID
    const customerProduct = await CustomerProduct.findById(id);

    // Check if the product exists
    if (!customerProduct) {
      return res.status(404).json({
        message: "Customer product not found.",
      });
    }

    // Send the response with the found product
    res.status(200).json({
      message: "Customer product retrieved successfully.",
      data: customerProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customer product.",
      error: error.message,
    });
  }
};

const updateCustomerProduct = async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the request parameters
    const updateData = req.body; // Data to update the product with

    // Find the product by ID and update it
    const updatedProduct = await CustomerProduct.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied to the updated data
    });

    // Check if the product exists
    if (!updatedProduct) {
      return res.status(404).json({
        message: "Customer product not found.",
      });
    }

    // Send the response with the updated product
    res.status(200).json({
      message: "Customer product updated successfully.",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update customer product.",
      error: error.message,
    });
  }
};

const deleteCustomerProduct = async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the request parameters

    // Find the product by ID and delete it
    const deletedProduct = await CustomerProduct.findByIdAndDelete(id);

    // Check if the product exists
    if (!deletedProduct) {
      return res.status(404).json({
        message: "Customer product not found.",
      });
    }

    // Send the response confirming deletion
    res.status(200).json({
      message: "Customer product deleted successfully.",
      data: deletedProduct, // Optional: Include the deleted product details in the response
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete customer product.",
      error: error.message,
    });
  }
};


module.exports = { createCustomerProduct , getAllCustomerProducts, getSingleCustomerProduct, updateCustomerProduct, deleteCustomerProduct};
