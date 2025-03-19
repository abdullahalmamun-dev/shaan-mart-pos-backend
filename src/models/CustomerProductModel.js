const mongoose = require("mongoose");

const customerProductSchema = new mongoose.Schema({
  customerName: { type: String },
  customerEmail: { type: String},
  customerPhone: { type: String},
  customerAddress: { type: String },
  purchaseDate: { type: Date }, // Added purchaseDate field
  totalItems: { type: Number }, // Ensure it's treated as a number
  grandTotal: { type: Number }, // Use a Number type
  customerPoints: { type: Number },
  paymentStatus: { type: String, default:"" }, //
  purchasedProducts: [{ 
    type: mongoose.Schema.Types.Mixed, // Or 'ObjectId' if you use a `Product` model reference
  }],
}, { timestamps: true });

module.exports = mongoose.model("CustomerProduct", customerProductSchema);
