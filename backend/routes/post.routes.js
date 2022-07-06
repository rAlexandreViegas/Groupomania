const express = require("express");

const postCtrl = require("../controllers/post.controllers");
const check = require("../middleware/auth");
const upload = require("../middleware/multer-config");
const validate = require("../middleware/validator");

const router = express.Router();

// Get, Create, Update, Delete a post
router.get("/", check.cookie, postCtrl.getAllPosts);
router.post(
  "/",
  check.cookie,
  upload.postImage,
  validate.message,
  postCtrl.createPost
);
router.put(
  "/:id",
  check.auth("post"),
  upload.postImage,
  validate.message,
  postCtrl.updatePost
);
router.delete("/:id", check.auth("post"), postCtrl.deletePost);

// Like a post
router.post("/:id/like", check.cookie, postCtrl.likePost);

module.exports = router;
