const express = require("express");
const router = express.Router();
const Order = require("../models/Order");


/* CREATE ORDER */

router.post("/", async (req, res) => {

  try {

    const order = new Order(req.body);

    await order.save();

    res.json({ message: "Order placed successfully" });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});


/* GET ALL ORDERS (ADMIN) */

router.get("/", async (req, res) => {

  const orders = await Order.find().sort({ date: -1 });

  res.json(orders);

});


/* ANALYTICS */

router.get("/analytics", async (req, res) => {

  const orders = await Order.find();

  const totalOrders = orders.length;

  const revenue = orders.reduce((sum, o) => sum + o.total, 0);

  const customers = new Set(orders.map(o => o.customer.email));

  res.json({
    totalOrders,
    revenue,
    totalCustomers: customers.size
  });

});

module.exports = router;