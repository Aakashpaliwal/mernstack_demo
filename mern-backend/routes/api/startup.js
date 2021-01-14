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

//add single todo
router.post("/addstartup", (req, res) => {
  const newStartup = new Startup({
    startup_name: req.body.startup_name,
    startup_description: req.body.startup_description,
    date: new Date(Date.now()).toISOString(),
  });
  newStartup
    .save()
    .then((newStartup) => {
      res.json(newStartup);
      res.status(200).send("new startup add");
    })
    .catch((err) => {
      res.status(400).send("unable to add new startup");
    });
});

module.exports = router;
