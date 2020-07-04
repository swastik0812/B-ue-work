const express = require("express");
const User = require("../models/userCollection");
const Order = require("../models/orderCollection");

const router = express.Router();

router.post("/user", async function (req, res) {
  const user = new User(req.body);
  try {
    const resp = await user.save();
    if (resp) {
      res.status(200).send("success");
    }
  } catch (e) {
    res.send(e);
  }
});

router.get("/usersInformation", async function (req, res) {
  try {
    const response = [];
    const resp = await User.find({});
    const userIds = resp.map((user) => {
      return { id: user.userid, name: user.name };
    });

    for (let i = 0; i < userIds.length; i++) {
      await Order.aggregate([
        { $match: { userId: userIds[i].id } },
        {
          $group: {
            _id: null,
            userId: { $first: "$userId" },
            noOfOrders: { $sum: 1 },
            averageBillValue: { $avg: "$subtotal" },
          },
        },
      ]).then((resp) => {
        resp[0].name = userIds[i].name;
        delete resp[0]._id;
        response.push(resp[0]);
      });
    }

    res.send(response);
  } catch (e) {
    res.send(e);
  }
});

router.patch("/newUserTable", async function (req, res) {
  try {
    const response = await User.find({});
    const userIds = response.map((user) => {
      return { id: user.userid, name: user.name };
    });

    for (let i = 0; i < userIds.length; i++) {
      await Order.aggregate([
        { $match: { userId: userIds[i].id } },
        {
          $group: {
            _id: null,
            userId: { $first: "$userId" },
            noOfOrders: { $sum: 1 },
            averageBillValue: { $avg: "$subtotal" },
          },
        },
      ]).then(async (resp) => {
        const filter = { userid: resp[0].userId };
        const update = { No_Of_Orders: resp[0].noOfOrders };
        const result = await User.findOneAndUpdate(filter, update, {
          new: true,
        });
        if (result) {
          res.send();
        }
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
