// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//     customerName: { type: String, required: true },
//     tableNumber: { type: Number, required: [true,'Table number is required and must be a number.'] },  // ✅ NEW FIELD
//     items: [{ name: String, price: Number }],
//     totalPrice: Number,
//     status: { type: String, default: 'Pending' }
// }, { timestamps: true });

// module.exports = mongoose.model('Order', orderSchema);




const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    tableNumber: {
      type: Number,
      required: [true, "Table number is required and must be a number."],
    },
    email: { type: String },
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    razorpay_order_id: { type: String },
    razorpay_payment_id: { type: String },
    razorpay_signature: { type: String },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Failed", "Pending"],
      default: "Pending",
    },
    status: {
      type: String,
      enum: ["Pending", "Preparing", "Served", "Completed", "Cancelled"],
      default: "Pending",
    },

    // 🧩 Add this field
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
