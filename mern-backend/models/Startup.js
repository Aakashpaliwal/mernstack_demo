const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StartupSchema = new Schema({
  startup_name: { type: String },
  startup_description: { type: String },
});

module.exports = Startup = mongoose.model("startups", StartupSchema);
