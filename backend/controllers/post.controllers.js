const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

// Get all posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await prisma.posts.findMany({
      include: {
        users: true,
        comments: { include: { users: true } },
        likes: { include: { users: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    res
      .status(200)
      .json({ posts, message: "Tous les posts ont été récupérés !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Create a post
exports.createPost = async (req, res, next) => {
  try {
    // Check if the request have an image, if yes, create the post with the image
    if (req.file !== undefined) {
      const post = await prisma.posts.create({
        data: {
          message: req.body.message,
          imageUrl: `/images/posts/${req.file.filename}`,
          user_id: Number(req.body.user_id),
        },
      });
      res.status(200).json({ post, message: "Le post a été créé !" });
    } else {
      // Create the post without image
      const post = await prisma.posts.create({
        data: {
          message: req.body.message,
          user_id: Number(req.body.user_id),
        },
      });
      res.status(200).json({ post, message: "Le post a été créé !" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Update a post
exports.updatePost = async (req, res, next) => {
  try {
    // Check if the request have an image, if yes
    if (req.file !== undefined) {
      const post = await prisma.posts.findUnique({
        where: { id: Number(req.params.id) },
      });
      // Check if the post to update already have an image, if yes, delete it from the server
      if (post.imageUrl !== null) {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlinkSync(`images/${filename}`);
      }
      // Update the post with the new image
      await prisma.posts.update({
        where: { id: post.id },
        data: { imageUrl: `/images/posts/${req.file.filename}` },
      });
    }
    // Update the post message
    const post = await prisma.posts.update({
      where: { id: Number(req.params.id) },
      data: { message: req.body.message },
    });
    res.status(200).json({ post, message: "Le post a été modifié !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Delete a post
exports.deletePost = async (req, res, next) => {
  try {
    const post = await prisma.posts.findUnique({
      where: { id: Number(req.params.id) },
    });
    // Check if the post have an image, if yes, delete it from the server
    if (post.imageUrl !== null) {
      const filename = post.imageUrl.split("/images/")[1];
      fs.unlinkSync(`images/${filename}`);
    }
    // Delete the post
    await prisma.posts.delete({
      where: { id: post.id },
    });
    res.status(200).json({ post, message: "Le post a été surprimé !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Like a post
exports.likePost = async (req, res, next) => {
  try {
    const like = await prisma.likes.findFirst({
      where: {
        user_id: req.body.user_id,
        post_id: req.body.post_id,
      },
    });
    // Check if the user already liked the post, if yes, delete the like
    if (like !== null) {
      await prisma.likes.deleteMany({
        where: {
          user_id: req.body.user_id,
          post_id: req.body.post_id,
        },
      });
      res.status(200).json({ like, message: "Le like a été supprimé !" });
    } else {
      // Create the like
      await prisma.likes.create({
        data: {
          user_id: req.body.user_id,
          post_id: req.body.post_id,
        },
      });
      res.status(200).json({ like, message: "Le post a été liké !" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
