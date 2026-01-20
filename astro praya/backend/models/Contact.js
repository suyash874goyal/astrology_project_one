const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true, // ❌ same email dobara save nahi hoga
      index: true,  // ⚡ fast lookup & duplicate safety
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      match: [
        /^[6-9]\d{9}$/,
        "Please enter a valid Indian mobile number",
      ],
    },

    service: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt automatically
  }
);

module.exports = mongoose.model("Contact", contactSchema);
