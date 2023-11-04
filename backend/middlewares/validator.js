const { body, validationResult } = require("express-validator");

// Reusable validation function
const validate = (fields) => [
  ...fields,
  (req, res, next) => {
    const errors = validationResult(req);

    !errors.isEmpty()
      ? res.status(400).json({ errors: errors.array() })
      : next();
  },
];

// Validation for sign-up
const validateSignUp = validate([
  body("lastName")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Last name should contain only letters!")
    .isLength({ min: 3, max: 40 })
    .withMessage("Last name should be between 3 and 40 characters!"),

  body("firstName")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("First name should contain only letters!")
    .isLength({ min: 3, max: 40 })
    .withMessage("First name should be between 3 and 40 characters!"),

  body("email")
    .isEmail()
    .withMessage("Invalid email!")
    .isLength({ max: 255 })
    .withMessage("Maximum 255 characters!")
    .normalizeEmail(),

  body("password")
    .isStrongPassword()
    .withMessage(
      "Password should be at least 8 characters and must contain: 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character!"
    )
    .isLength({ max: 255 })
    .withMessage("Maximum 255 characters!"),
]);

// Validation for editing profile
const validateEditProfile = validate([
  body("lastName")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Last name should contain only letters!")
    .isLength({ min: 3, max: 40 })
    .withMessage("Last name should be between 3 and 40 characters!"),

  body("firstName")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("First name should contain only letters!")
    .isLength({ min: 3, max: 40 })
    .withMessage("First name should be between 3 and 40 characters!"),
]);

// Validation for messages
const validateMessage = validate([
  body("message")
    .isLength({ min: 1, max: 255 })
    .withMessage("Message should be between 1 and 255 characters!"),
]);

module.exports = {
  validateSignUp,
  validateEditProfile,
  validateMessage,
};
