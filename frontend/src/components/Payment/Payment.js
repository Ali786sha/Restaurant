// frontend/src/components/Checkout.js

import React from "react";
import axios from "axios";

const Checkout = ({ amount }) => {
  const loadRazorpay = async () => {
    const { data: order } = await axios.post("http://localhost:5000/api/payment/create-order", {
      amount: amount,
    });

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: order.amount,
      currency: "INR",
      name: "Food Delivery",
      description: "Payment for your order",
      order_id: order.id,
      handler: function (response) {
        alert("Payment successful!");
        console.log(response);
        // Save payment details to DB or redirect to success page
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return <button onClick={loadRazorpay}>Pay ₹{amount}</button>;
};

export default Checkout;
