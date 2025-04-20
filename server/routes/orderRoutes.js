// const express = require('express');
// const router = express.Router();
// const orderController = require('../controllers/orderController');
// const verifyToken = require('../middleware/authMiddleware');

// // For regular user to place an order
// router.post('/user', verifyToken(), orderController.userPlaceOrder);

// // For regular user to view their own orders
// router.get('/user', verifyToken(), orderController.getUserOrders);


// router.get('/', verifyToken("admin"), orderController.getOrders);
// router.post('/', verifyToken("admin"), orderController.createOrder);
// router.delete('/:id', verifyToken("admin"), orderController.deleteOrder);
// router.patch('/:id/complete', verifyToken("admin"), orderController.completeOrder);

// module.exports = router;
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const verifyToken = require('../middleware/authMiddleware');
const Order = require("../models/Order");

// 🔐 USER ROUTES
// Place an order before payment (e.g. cart data)
router.post('/user', verifyToken("user"), orderController.userPlaceOrder);

// View own orders
router.get('/user', verifyToken("user"), orderController.getUserOrders);

// 💳 Save order after successful payment
router.post("/save", verifyToken("user"), async (req, res) => {
  try {
    const {
      customerName,
      email,
      tableNumber,
      items,
      totalPrice,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const order = new Order({
      customerName,
      email,
      tableNumber,
      items,
      totalPrice,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentStatus: "Paid",
      userId: req.user.id 
    });

    await order.save();

    res.status(200).json({ message: "Order saved successfully", order });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 👑 ADMIN ROUTES
router.get('/', verifyToken("admin"), orderController.getOrders);
router.post('/', verifyToken("admin"), orderController.createOrder);
router.delete('/:id', verifyToken("admin"), orderController.deleteOrder);
router.patch('/:id/complete', verifyToken("admin"), orderController.completeOrder);

module.exports = router;
