const express = require("express");
const router = express.Router();
const Todo = require("../../models/Todo");

//route to get all todo list
router.get("/gettodos", (req, res) => {
  Todo.find(function (err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

module.exports = router;
