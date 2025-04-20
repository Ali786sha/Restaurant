// const Order = require('../models/Order');
// const Menu = require('../models/MenuItem');
// const mongoose = require("mongoose");

// // Get all orders
// exports.getOrders = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const orders = await Order.find({userId}).sort({ createdAt: -1 });
//         res.json(orders);
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to fetch orders' });
//     }
// };
 
// // Create order from selected menu items
// exports.createOrder = async (req, res) => {
//     const { customerName, tableNumber, itemIds } = req.body;

//     try {
//         const menuItems = await Menu.find({ _id: { $in: itemIds } });

//         const items = menuItems.map(item => ({
//             name: item.name,
//             price: item.price
//         }));
//         const totalPrice = items.reduce((acc, item) => acc + item.price, 0);
        

//         const newOrder = new Order({
//             customerName,
//             tableNumber, // ✅ Include table number
//             items,
//             totalPrice
//         });

//         await newOrder.save();
//         res.status(201).json(newOrder);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Failed to create order' });
//     }
// };


// // Delete order
// exports.deleteOrder = async (req, res) => {
//     try {
//         await Order.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Order deleted' });
//     } catch (err) {
//         res.status(500).json({ message: 'Delete failed' });
//     }
// };

// // Update order status to Completed
// exports.completeOrder = async (req, res) => {
//     try {
//         const updatedOrder = await Order.findByIdAndUpdate(
//             req.params.id,
//             { status: 'Completed' },
//             { new: true }
//         );
//         res.json(updatedOrder);
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to update status' });
//     }
// };

// // User places an order
// exports.userPlaceOrder = async (req, res) => {
//     const { itemIds, tableNumber } = req.body;
//     const userId = req.user.id;



//     try {
//         const objectIds = itemIds.map(id => new mongoose.Types.ObjectId(id));

//         const menuItems = await Menu.find({ _id: { $in: objectIds } });

//         console.log("Menu Items Found:", menuItems);

//         if (!menuItems.length) {
//             return res.status(400).json({ message: "No valid menu items found." });
//         }

//         const items = menuItems.map(item => ({
//             name: item.name,
//             price: item.price
//         }));

//         const totalPrice = items.reduce((acc, item) => acc + item.price, 0);

//         const newOrder = new Order({
//             customerName: req.user.name || "Guest",
//             tableNumber,
//             userId,
//             items,
//             totalPrice
//         });

//         await newOrder.save();
//         res.status(201).json(newOrder);
//     } catch (err) {
//         console.error("Order creation error:", err);
//         res.status(500).json({ message: 'Failed to create order', error: err.message });
//     }
// };

// // Get orders of logged-in user
// exports.getUserOrders = async (req, res) => {
//     const userId = req.user.id;

//     try {
//         const orders = await Order.find({ userId }).sort({ createdAt: -1 });
//         res.json(orders);
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to fetch user orders' });
//     }
// };
const Order = require('../models/Order');
const Menu = require('../models/MenuItem');
const mongoose = require("mongoose");

// ✅ Get all orders for logged-in user
exports.getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error("Error fetching orders:", err.message);
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
};


// ✅ Create order from selected menu items (admin use, no userId)
exports.createOrder = async (req, res) => {
    const { customerName, tableNumber, itemIds } = req.body;

    try {
        const menuItems = await Menu.find({ _id: { $in: itemIds } });

        const items = menuItems.map(item => ({
            name: item.name,
            price: item.price
        }));

        const totalPrice = items.reduce((acc, item) => acc + item.price, 0);

        const newOrder = new Order({
            customerName,
            tableNumber,
            items,
            totalPrice
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        console.error("Order creation error:", err.message);
        res.status(500).json({ message: 'Failed to create order' });
    }
};

// ✅ Delete order
exports.deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: 'Order deleted' });
    } catch (err) {
        console.error("Delete error:", err.message);
        res.status(500).json({ message: 'Delete failed' });
    }
};

// ✅ Mark order as completed
exports.completeOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status: 'Completed' },
            { new: true }
        );
        res.json(updatedOrder);
    } catch (err) {
        console.error("Status update error:", err.message);
        res.status(500).json({ message: 'Failed to update status' });
    }
};

// ✅ User places an order (with userId)
exports.userPlaceOrder = async (req, res) => {
    const { itemIds, tableNumber } = req.body;
    const userId = req.user.id;

    try {
        const objectIds = itemIds.map(id => new mongoose.Types.ObjectId(id));
        const menuItems = await Menu.find({ _id: { $in: objectIds } });

        if (!menuItems.length) {
            return res.status(400).json({ message: "No valid menu items found." });
        }

        const items = menuItems.map(item => ({
            name: item.name,
            price: item.price
        }));

        const totalPrice = items.reduce((acc, item) => acc + item.price, 0);

        const newOrder = new Order({
            customerName: req.user.name || "Guest",
            tableNumber,
            userId,
            items,
            totalPrice
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        console.error("Order creation error:", err.message);
        res.status(500).json({ message: 'Failed to create order', error: err.message });
    }
};

// ✅ Get logged-in user's orders
exports.getUserOrders = async (req, res) => {
    const userId = req.user.id;

    try {
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error("Fetch user orders error:", err.message);
        res.status(500).json({ message: 'Failed to fetch user orders' });
    }
};
