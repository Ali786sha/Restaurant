const express = require("express");
const router = express.Router();
const { getProfile, updateProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/profile", authMiddleware("user"), getProfile);
router.put("/profile", authMiddleware("user"), updateProfile);

module.exports = router;
