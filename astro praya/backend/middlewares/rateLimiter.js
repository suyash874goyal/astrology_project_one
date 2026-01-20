const rateLimit = require("express-rate-limit");

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 1 IP se max 10 requests
  message: {
    success: false,
    message: "Too many requests. Please try again after some time.",
  },
});

module.exports = contactLimiter;
