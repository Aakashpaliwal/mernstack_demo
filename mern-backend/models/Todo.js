const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  todo_description: { type: String },
  todo_responsible: { type: String },
  todo_priority: { type: String },
  todo_completed: { type: String },
});

module.exports = Todo = mongoose.model("todos", TodoSchema);
