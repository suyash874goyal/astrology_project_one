const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const connectDB = require("./config/db");
connectDB();

const contactRoutes = require("./routes/contactRoutes");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  })
);

app.use(helmet());
app.use(express.json());

app.use("/api/contact", contactRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "Backend is running 🚀" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
