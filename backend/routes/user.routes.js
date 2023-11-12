const express = require("express");

const CHECK = require("../middlewares/auth");
const CONFIG = require("../middlewares/multer.config");
const VALIDATE = require("../middlewares/validator");
const USER = require("../controllers/user.controllers");

const router = express.Router();

// Get, Update, Delete a user
router.get("/:id", CHECK.userAuthorization("user"), USER.fetchUser);
router.put(
  "/:id",
  CHECK.userAuthorization("user"),
  CONFIG.avatar,
  VALIDATE.profile,
  USER.updateUser
);
router.delete("/:id", CHECK.userAuthorization("user"), USER.deleteUser);

module.exports = router;
