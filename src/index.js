const express = require("express");
require("./db/mongoose");
const userRouter = require("./router/user");
const orderRouter = require("./router/order");

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);
app.use(orderRouter);

app.listen(port, () => {
  console.log("server is open on port" + port);
});
