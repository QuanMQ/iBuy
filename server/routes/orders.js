const express = require("express");
const router = express.Router();
const { ensureAuth, ensureAd } = require("../middleware/auth");

const Order = require("../models/Order");

// *@desc Create a shopping order
// *@route POST /orders
router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.buyer = req.user.id;
    await Order.create(req.body);
  } catch (err) {
    console.error(err);
    alert("Error 500: Something went wrong");
  }
});

// *@desc Show all orders of a user
// *@route GET /orders
router.get("/", ensureAuth, async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.id })
      .sort({ createdAt: "desc" })
      .lean();
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    alert("Error 500: Something went wrong");
  }
});

// *@desc Show all orders for admin
// *@route GET /orders/admin
router.get("/admin", ensureAd, async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("buyer")
      .sort({ createdAt: "desc" })
      .lean();
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
  }
});

// *@desc Update orders
// *@route PUT /orders/:id
router.put("/:id", ensureAd, async (req, res) => {
  try {
    let order = await Order.findById(req.params.id).lean();

    if (!order) {
      alert("Error 404: Unable to find order");
    }

    await Order.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
  } catch (err) {
    console.error(err);
    alert("Error 500: Something went wrong");
  }
});

module.exports = router;
