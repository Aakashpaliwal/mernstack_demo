const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StartupSchema = new Schema({
  startup_name: { type: String },
  startup_description: { type: String },
  date: {
    type: Date,
    default: new Date(Date.now()).toISOString(),
  },
  author: {
    type: String,
    required: true,
  },
});

module.exports = Startup = mongoose.model("startups", StartupSchema);
