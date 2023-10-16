const express = require("express");

const validate = require("../middleware/validator");
const { signUp, login, logout } = require("../controllers/auth.controllers");

const router = express.Router();

// Auth
router.post("/signup", validate.signUp, signUp);
router.post("/login", login);
router.delete("/logout", logout);

module.exports = router;
