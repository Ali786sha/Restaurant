const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const verifyToken = require('../middleware/authMiddleware');

// Public route for frontend users
router.get('/public', menuController.getMenu);

// Admin-only routes
router.get('/', verifyToken("admin"), menuController.getMenu);
router.post('/', verifyToken("admin"), menuController.addMenuItem);
router.delete('/:id', verifyToken("admin"), menuController.deleteMenuItem);

module.exports = router;
