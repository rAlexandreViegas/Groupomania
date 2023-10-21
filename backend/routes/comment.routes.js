const express = require("express");

const check = require("../middleware/auth");
const validate = require("../middleware/validator");
const { createComment, deleteComment } = require("../controllers/comment.controllers");

const router = express.Router();

// Create, Delete a comment
router.post("/", check.cookie, validate.message, createComment);
router.delete("/:id", check.auth("comment"), deleteComment);

module.exports = router;
