const express = require('express');
const dotenv = require('dotenv');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const userRoutes = require("./routes/userRoutes");
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reservations', reservationRoutes);
app.use("/api/user", userRoutes);
app.use('/api/auth', authRoutes);

// 🔥 Only this `app.listen()` after Mongo connects
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.error('Mongo~DB connection error:', err));

// Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });
  
  // Payment route
  app.post('/create-order', async (req, res) => {
    const { amount } = req.body;
  
    const options = {
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: "receipt_order_" + Date.now(),
    };
  
    try {
      const order = await razorpay.orders.create(options);
      res.json({ orderId: order.id, key: process.env.RAZORPAY_KEY_ID });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error creating order");
    }
  });
  
  app.listen(5000, () => {
    console.log('Server running on port 5000');
  });
  