const express = require("express");

const VALIDATE = require("../middlewares/validator");
const AUTH = require("../controllers/auth.controllers");

const router = express.Router();

// Sign up, login, logout
router.post("/signup", VALIDATE.signUp, AUTH.signUp);
router.post("/login", AUTH.login);
router.delete("/logout", AUTH.logout);

module.exports = router;
