const express = require("express");
const Order = require("../models/orderCollection");

const router = express.Router();

router.post("/order", async function (req, res) {
  const order = new Order(req.body);
  try {
    const resp = await order.save();
    if (resp) {
      res.status(200).send("success");
    }
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
