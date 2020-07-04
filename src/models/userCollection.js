const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userid: {
    type: Number,
    required: true,
    ref: "orderCollection",
  },
  name: {
    type: String,
    required: true,
  },
  No_Of_Orders: {
    type: Number,
  },
});
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.userId;
  return userObject;
};

const userCollection = mongoose.model("userCollections", userSchema);

module.exports = userCollection;
