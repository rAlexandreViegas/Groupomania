const express = require("express");

const { validateSignUp } = require("../middlewares/validator");
const { signUp, login, logout } = require("../controllers/auth.controllers");

const router = express.Router();

// Auth
router.post("/signup", validateSignUp, signUp);
router.post("/login", login);
router.delete("/logout", logout);

module.exports = router;
