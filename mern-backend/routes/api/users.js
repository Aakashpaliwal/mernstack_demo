const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const validateRegisterInput = require("../../validation/Register");
const validateLoginInput = require("../../validation/Login");
const User = require("../../models/User");
const passport = require("passport");

// @route POST api/users/register
// @desc Register user
// @access Public
//reigster route
router.post("/register", (req, res) => {
  //Form Validation
  const { errors, isValid } = validateRegisterInput(req.body);
  const { user_name, email, password } = req.body;

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ $or: [{ email }, { user_name }] }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exist!" });
    } else {
      const newUser = new User({
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password,
        date: new Date(Date.now()).toISOString(),
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

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
//login routes
router.post("/login", (req, res) => {
  //Form Validation
  const { errors, isValid } = validateLoginInput(req.body);

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

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          user_name: user.user_name,
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
            // expiresIn: "3s",
          },
          (err, token) => {
            return res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
