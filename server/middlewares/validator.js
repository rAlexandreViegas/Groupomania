const { body, validationResult } = require("express-validator");

// Reusable validation middleware function
function validate(fields) {
  return [
    ...fields,
    (req, res, next) => {
      const errors = validationResult(req);
      !errors.isEmpty()
        ? res.status(400).json({ errors: errors.array() })
        : next();
    },
  ];
}

// Validation middleware function for name fields
function validateName(fieldName) {
  return [
    body(fieldName)
      .matches(/^[A-Za-z\s]+$/)
      .withMessage(
        fieldName === "lastName"
          ? "Last name should contain only letters!"
          : "First name should contain only letters!"
      )
      .isLength({ min: 2, max: 40 })
      .withMessage(
        fieldName === "lastName"
          ? "Last name should be between 2 and 40 characters!"
          : "First name should be between 2 and 40 characters!"
      ),
  ];
}

// Validation middleware function for email field
function email() {
  return [
    body("email")
      .isEmail()
      .withMessage("Invalid email!")
      .isLength({ max: 255 })
      .withMessage("Maximum 255 characters!")
      .normalizeEmail(),
  ];
}

// Validation middleware function for password field
function validatePassword() {
  return [
    body("password")
      .isStrongPassword()
      .withMessage(
        "Password should be at least 8 characters and must contain: 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character!"
      )
      .isLength({ max: 255 })
      .withMessage("Maximum 255 characters!"),
  ];
}

// Validation middleware for sign-up
const signUp = validate([
  ...validateName("firstName"),
  ...validateName("lastName"),
  ...email(),
  ...validatePassword(),
]);

// Validation middleware for editing profile
const profile = validate([
  ...validateName("firstName"),
  ...validateName("lastName"),
]);

// Validation middleware for messages
const message = validate([
  body("message")
    .isLength({ min: 1, max: 255 })
    .withMessage("Message should be between 1 and 255 characters!"),
]);

module.exports = {
  signUp,
  profile,
  message,
};
