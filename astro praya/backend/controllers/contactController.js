const Contact = require("../models/Contact");
const transporter = require("../config/mailer");
const validator = require("validator");
const xss = require("xss");

const sendContact = async (req, res) => {
  try {
    let { name, email, phone, service, message } = req.body;

    /* ================= SANITIZE INPUT ================= */
    name = xss(name);
    email = validator.normalizeEmail(email);
    service = xss(service);
    message = xss(message);

    /* ================= VALIDATION ================= */
    if (!name || !email || !phone || !service || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Indian mobile number",
      });
    }

    /* ================= DUPLICATE EMAIL ================= */
    const exists = await Contact.findOne({ email });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    /* ================= SAVE ================= */
    const contact = new Contact({
      name,
      email,
      phone,
      service,
      message,
    });

    await contact.save();

    /* ================= EMAIL ================= */
    await transporter.sendMail({
      from: `"Shree Jyotish Kendra" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "📩 New Contact Request",
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { sendContact };
