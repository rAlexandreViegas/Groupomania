const express = require("express");

const {
  checkUserAuthentication,
  checkUserAuthorization,
} = require("../middlewares/auth");
const { postImageConfig } = require("../middlewares/multer.config");
const { validateMessage } = require("../middlewares/validator");
const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} = require("../controllers/post.controllers");

const router = express.Router();

// Get, Create, Update, Delete a post
router.get("/", checkUserAuthentication, getAllPosts);
router.post(
  "/",
  checkUserAuthentication,
  postImageConfig,
  validateMessage,
  createPost
);
router.put(
  "/:id",
  checkUserAuthorization("post"),
  postImageConfig,
  validateMessage,
  updatePost
);
router.delete("/:id", checkUserAuthorization("post"), deletePost);

// Like a post
router.post("/:id/like", checkUserAuthentication, likePost);

module.exports = router;
