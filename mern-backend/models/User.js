const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const userModel = {
  user_name: {
    type: String,
    required: true,
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date },
};

const UserSchema = new Schema(userModel);
module.exports = mongoose.model("users", UserSchema);
