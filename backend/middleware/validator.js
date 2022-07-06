const { body, validationResult } = require("express-validator");

exports.signUp = [
  body("lastName")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Le nom doit contenir que des lettres !")
    .isLength({ min: 3, max: 40 })
    .withMessage("Le nom doit faire entre 3 et 40 caractères !"),
  body("firstName")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Le prénom doit contenir que des lettres !")
    .isLength({ min: 3, max: 40 })
    .withMessage("Le prénom doit faire entre 3 et 40 caractères !"),
  body("email")
    .isEmail()
    .withMessage("Email invalide !")
    .isLength({ max: 255 })
    .withMessage("Maximum 255 caractères !")
    .normalizeEmail(),
  body("password")
    .isStrongPassword()
    .withMessage(
      "Le mot de passe doit faire minimum 8 caractères et doit contenir : 1 lettre MAJ, 1 lettre MIN, 1 chiffre et 1 caractère spécial !"
    )
    .isLength({ max: 255 })
    .withMessage("Maximum 255 caractères !"),
  (req, res, next) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
];

exports.editProfile = [
  body("lastName")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Le nom doit contenir que des lettres !")
    .isLength({ min: 3, max: 40 })
    .withMessage("Le nom doit faire entre 3 et 40 caractères !"),
  body("firstName")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Le prénom doit contenir que des lettres !")
    .isLength({ min: 3, max: 40 })
    .withMessage("Le prénom doit faire entre 3 et 40 caractères !"),
  (req, res, next) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
];

exports.message = [
  body("message")
    .isLength({ min: 1, max: 255 })
    .withMessage("Le message doit faire entre 1 et 255 caractères !"),
  (req, res, next) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
];
