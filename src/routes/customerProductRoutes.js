// routes/customerProductRoutes.js
const express = require("express");
const router = express.Router();
const { createCustomerProduct,getAllCustomerProducts,getSingleCustomerProduct,updateCustomerProduct, deleteCustomerProduct } = require("../../src/controllers/customerProductController");

router.post("/createCustomerProduct", createCustomerProduct);
// Route for fetching all customer products
router.get("/getAllCustomerProducts", getAllCustomerProducts);

router.get("/single/:id", getSingleCustomerProduct);
router.put("/update/:id", updateCustomerProduct );
router.delete("/delete/:id", deleteCustomerProduct );
module.exports = router;
