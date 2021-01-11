const express = require("express");
const router = express.Router();
const Startup = require("../../models/Startup");

//route to get all todo list
router.get("/getstartups", (req, res) => {
  Startup.find(function (err, startups) {
    if (err) {
      console.log(err);
    } else {
      res.json(startups);
    }
  });
});

module.exports = router;
