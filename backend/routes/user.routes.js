const express = require("express");

const check = require("../middleware/auth");
const upload = require("../middleware/multer-config");
const validate = require("../middleware/validator");
const { getUser, updateUser, deleteUser } = require("../controllers/user.controllers");

const router = express.Router();

// Get, Update, Delete a user
router.get("/:id", check.auth("user"), getUser);
router.put("/:id", check.auth("user"), upload.avatar, validate.editProfile, updateUser);
router.delete("/:id", check.auth("user"), deleteUser);

module.exports = router;
