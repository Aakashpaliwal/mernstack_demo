const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  //email check
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email ID is required!!";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid email ID";
  }

  //password check
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required!!";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
