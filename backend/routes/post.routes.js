const express = require("express");

const CHECK = require("../middlewares/auth");
const CONFIG = require("../middlewares/multer.config");
const VALIDATE = require("../middlewares/validator");
const POST = require("../controllers/post.controllers");

const router = express.Router();

// Get, Create, Update, Delete a post
router.get("/", CHECK.userAuthentication, POST.fetchPosts);
router.post(
  "/",
  CHECK.userAuthentication,
  CONFIG.postImage,
  VALIDATE.message,
  POST.createPost
);
router.put(
  "/:id",
  CHECK.userAuthorization("post"),
  CONFIG.postImage,
  VALIDATE.message,
  POST.updatePost
);
router.delete("/:id", CHECK.userAuthorization("post"), POST.deletePost);

// Like a post
router.post("/:id/like", CHECK.userAuthentication, POST.likePost);

module.exports = router;
