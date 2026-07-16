const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Import model + sample data
const Product = require("./models/Product");
const products = require("./data/products");

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerceDB")
  .then(() => {
    console.log("MongoDB connected successfully");
    insertProducts(); // call function after DB connection
  })
  .catch(err => console.log(err));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend + MongoDB is running");
});

// Insert sample products ONLY if DB is empty
async function insertProducts() {
  try {
    const count = await Product.countDocuments();

    if (count === 0) {
      await Product.insertMany(products);
      console.log("Sample products inserted");
    } else {
      console.log("Products already exist in DB");
    }
  } catch (error) {
    console.error("Error inserting products:", error);
  }
}

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});