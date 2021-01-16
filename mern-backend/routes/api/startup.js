const express = require("express");
const passport = require("passport");
const router = express.Router();
const Startup = require("../../models/Startup");

//route to get all todo list
// router.get("/getstartups", (req, res) => {
//   Startup.find(function (err, startups) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(startups);
//     }
//   });
// });

router.get(
  "/getstartups",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Startup.find({ author: req.user.name })
      .then((startups) => res.status(200).json(startups))
      .catch((err) =>
        res
          .status(400)
          .json({ user: "Error fetching startups of logged in user" })
      );
  }
);

//add single todo
// router.post("/addstartup", (req, res) => {
//   const newStartup = new Startup({
//     startup_name: req.body.startup_name,
//     startup_description: req.body.startup_description,
//     date: new Date(Date.now()).toISOString(),
//   });
//   newStartup
//     .save()
//     .then((newStartup) => {
//       res.json(newStartup);
//       res.status(200).send("new startup add");
//     })
//     .catch((err) => {
//       res.status(400).send("unable to add new startup");
//     });
// });

router.post(
  "/addstartup",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const author = req.user.name;
    const post = req.body;
    post.author = author;
    const newStartup = new Startup(post);
    newStartup
      .save()
      .then((doc) => res.json(doc))
      .catch((err) => console.log({ create: "Error creating new startup" }));
  }
);

module.exports = router;
