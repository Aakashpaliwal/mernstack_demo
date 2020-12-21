const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const cors = require("cors");
const mongoose = require("mongoose");
// const todoRoutes = express.Router();
const passport = require("passport");

const users = require("./routes/api/users");
const PORT = 4000;

// let Todo = require("./todo.model");

// app.use(cors());
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: false }));

const db = require("./config/keys").mongoURI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("mongodb connection successfull");
});

//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

//routes
app.use("/api/users", users);

//route to get all todo list
// todoRoutes.route("/").get(function (req, res) {
//   Todo.find(function (err, todos) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(todos);
//     }
//   });
// });

// //route to get single todo
// todoRoutes.route("/:id").get(function (req, res) {
//   let id = req.params.id;
//   Todo.findById(id, function (err, todo) {
//     res.json(todo);
//   });
// });

// //update a single todo
// todoRoutes.route("/update/:id").post(function (req, res) {
//   Todo.findById(req.params.id, function (err, todo) {
//     if (!todo) {
//       res.status(404).send("Data is not found!");
//     } else {
//       todo.todo_description = req.body.todo_description;
//       todo.todo_responsible = req.body.todo_responsible;
//       todo.todo_priority = req.body.todo_priority;
//       todo.todo_completed = req.body.todo_completed;

//       todo
//         .save()
//         .then((todo) => {
//           res.json("Update successfully!!");
//         })
//         .catch((err) => {
//           res.status(400).send("Update not possible!");
//         });
//     }
//   });
// });

// //delete single todo
// todoRoutes.route("/delete/:id").delete(function (req, res) {
//   Todo.deleteOne({ _id: req.params.id }, function (err, todo) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.status(200).send("Delete Successfully!!");
//     }
//   });
// });

// //add single todo
// todoRoutes.route("/add").post(function (req, res) {
//   let todo = new Todo(req.body);
//   todo
//     .save()
//     .then((todo) => {
//       res.status(200).send("new todo add");
//     })
//     .catch((err) => {
//       res.status(400).send("unable to add new todo");
//     });
// });

// app.use("/todos", todoRoutes);

app.listen(PORT, function () {
  console.log("server is running at port no." + PORT);
});