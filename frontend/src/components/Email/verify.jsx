// src/components/Email/verify.jsx

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const location = useLocation();
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    name,
    email,
    items,
    totalAmount,
  } = location.state || {};

  useEffect(() => {
    const saveOrder = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/order/save", {
          customerName: name,
          email,
          items,
          totalPrice: totalAmount,
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        });

        console.log("Order saved:", response.data);
      } catch (error) {
        console.error("Error saving order:", error);
      }
    };

    if (razorpay_order_id && razorpay_payment_id && razorpay_signature) {
      saveOrder();
    }
  }, [
    name,
    email,
    items,
    totalAmount,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  ]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Thank you, {name || "Customer"}!</h2>
      <p>Your payment was successful, and your order has been saved.</p>
    </div>
  );
};

export default VerifyEmail;
