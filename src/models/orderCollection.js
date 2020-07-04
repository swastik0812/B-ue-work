const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  orderId: {
    type: Number,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
    ref: "user-collections",
  },
  subtotal: {
    type: Number,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
});

const orderCollection = mongoose.model("orderCollection", orderSchema);

module.exports = orderCollection;
