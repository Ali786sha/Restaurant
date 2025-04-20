const MenuItem = require('../models/MenuItem');

// GET all menu items
exports.getMenu = async (req, res) => {
    try {
        const items = await MenuItem.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch menu items' });
    }
};

// POST create a new menu item
exports.addMenuItem = async (req, res) => {
    const { name, description, price, category } = req.body;

    try {
        const newItem = new MenuItem({ name, description, price, category });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ message: 'Failed to add menu item' });
    }
};

// DELETE a menu item
exports.deleteMenuItem = async (req, res) => {
    try {
        await MenuItem.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete menu item' });
    }
};
