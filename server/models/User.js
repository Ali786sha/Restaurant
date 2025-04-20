const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  // ----- me  ---- 
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  // any other fields you need...
});

module.exports = mongoose.model("User", UserSchema);
