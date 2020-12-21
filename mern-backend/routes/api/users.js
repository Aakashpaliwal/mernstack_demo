const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const validateRegisterInput = require("../../validation/Register");
const validateLoginInput = require("../../validation/Login");
const User = require("../../models/User");
const passport = require("passport");

//reigster route
router.post("/register", (req, res) => {
  //Form Validation
  const { errors, isValid } = validateRegisterInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exist!" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      //hash passowrd
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log("regosterror", err));
        });
      });
    }
  });
});

//login routes
router.post("/login", (req, res) => {
  //Form Validation
  const { errors, isValid } = validateRegisterInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    bcrypt.compare(passport, user.password).then((isMatch) => {
      if (isMatch) {
        //create jwt_payload
        const payload = {
          id: user.id,
          name: user.name,
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556929, // 1year in seconds
          },
          (err,
          (token) => {
            res.json({ success: true, token: "Bearer " + token });
          })
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect!!" });
      }
    });
  });
});

module.exports = router;
