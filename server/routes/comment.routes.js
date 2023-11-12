const express = require("express");

const CHECK = require("../middlewares/auth");
const VALIDATE = require("../middlewares/validator");
const COMMENT = require("../controllers/comment.controllers");

const router = express.Router();

// Create, Delete a comment
router.post(
  "/",
  CHECK.userAuthentication,
  VALIDATE.message,
  COMMENT.createComment
);
router.delete(
  "/:id",
  CHECK.userAuthorization("comment"),
  COMMENT.deleteComment
);

module.exports = router;
