const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.user_name = !isEmpty(data.user_name) ? data.user_name : "";
  data.email - !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  //user_name validation
  if (Validator.isEmpty(data.user_name)) {
    errors.user_name = "Name field i required!!";
  }

  //email validation
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required!!";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Inavlid Email ID";
  }

  //password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required!!";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be atleast 6 characters.";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "confirm password field is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Password must match!!";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
