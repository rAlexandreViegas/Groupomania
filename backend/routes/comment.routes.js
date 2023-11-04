const express = require("express");

const {
  checkUserAuthentication,
  checkUserAuthorization,
} = require("../middlewares/auth");
const { validateMessage } = require("../middlewares/validator");
const {
  createComment,
  deleteComment,
} = require("../controllers/comment.controllers");

const router = express.Router();

// Create, Delete a comment
router.post("/", checkUserAuthentication, validateMessage, createComment);
router.delete("/:id", checkUserAuthorization("comment"), deleteComment);

module.exports = router;
