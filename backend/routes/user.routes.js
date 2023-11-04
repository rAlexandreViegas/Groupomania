const express = require("express");

const { checkUserAuthorization } = require("../middlewares/auth");
const { avatarConfig } = require("../middlewares/multer.config");
const { validateEditProfile } = require("../middlewares/validator");
const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controllers");

const router = express.Router();

// Get, Update, Delete a user
router.get("/:id", checkUserAuthorization("user"), getUser);
router.put(
  "/:id",
  checkUserAuthorization("user"),
  avatarConfig,
  validateEditProfile,
  updateUser
);
router.delete("/:id", checkUserAuthorization("user"), deleteUser);

module.exports = router;
