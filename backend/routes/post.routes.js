const express = require("express");

const check = require("../middleware/auth");
const upload = require("../middleware/multer-config");
const validate = require("../middleware/validator");
const { getAllPosts, createPost, updatePost, deletePost, likePost } = require("../controllers/post.controllers");

const router = express.Router();

// Get, Create, Update, Delete a post
router.get("/", check.cookie, getAllPosts);
router.post("/", check.cookie, upload.postImage, validate.message, createPost);
router.put("/:id", check.auth("post"), upload.postImage, validate.message, updatePost);
router.delete("/:id", check.auth("post"), deletePost);

// Like a post
router.post("/:id/like", check.cookie, likePost);

module.exports = router;
