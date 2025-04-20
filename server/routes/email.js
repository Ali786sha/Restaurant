// backend/routes/payment.js

const express = require("express");
const crypto = require("crypto");
const sendMail = require("./sendMail");
const router = express.Router();

router.post("/verify", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, email, name } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(sign.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // ✅ Payment is verified
    await sendMail(
      email,
      "Payment Confirmation - Food Delivery",
      `Hi ${name}, your payment was successful!`,
      `<h2>Hi ${name},</h2><p>Your payment <b>${razorpay_payment_id}</b> has been successfully received.</p><p>Thanks for ordering with us!</p>`
    );

    res.status(200).send("Payment verified and email sent");
  } else {
    res.status(400).send("Payment verification failed");
  }
});
