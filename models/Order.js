const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderNumber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  products: {
    type: [
      {
        id: Number,
        category: String,
        description: String,
        image: String,
        price: Number,
        title: String,
        amount: Number,
      },
    ],
    required: true,
  },
  totals: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "in progress",
    enum: ["in progress", "delivered", "cancelled"],
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Buyer",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
