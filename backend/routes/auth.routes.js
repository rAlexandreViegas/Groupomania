const express = require("express");

const authCtrl = require("../controllers/auth.controllers");
const validate = require("../middleware/validator");

const router = express.Router();

// Auth
router.post("/signup", validate.signUp, authCtrl.signUp);
router.post("/login", authCtrl.login);
router.delete("/logout", authCtrl.logout);

module.exports = router;
