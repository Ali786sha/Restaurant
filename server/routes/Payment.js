// backend/routes/payment.js

const Razorpay = require("razorpay");
const express = require("express");
const router = express.Router();
require("dotenv").config();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

router.post("/create-order", async (req, res) => {
  const options = {
    amount: req.body.amount * 100, // amount in paise
    currency: "INR",
    receipt: "receipt_order_" + Date.now(),
  };

  try {
    const order = await instance.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).send("Error creating order");
  }
});

module.exports = router;
