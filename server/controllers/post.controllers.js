const { PrismaClient } = require("@prisma/client");

const handleError = require("../modules/handle.error");
const deleteImage = require("../modules/delete.image");

const prisma = new PrismaClient();

// Define the selected fields for user data
const userSelect = {
  firstName: true,
  lastName: true,
  avatarUrl: true,
};

// Fetch all posts
async function fetchPosts(req, res) {
  try {
    const posts = await prisma.posts.findMany({
      include: {
        users: {
          select: userSelect,
        },
        comments: {
          include: {
            users: {
              select: userSelect,
            },
          },
        },
        likes: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ posts, message: "All posts retrieved!" });
  } catch (error) {
    handleError(res, error);
  }
}

// Create a post
async function createPost(req, res) {
  try {
    const newPost = await prisma.posts.create({
      data: {
        message: req.body.message,
        // Set 'imageUrl' to the file path if a file is uploaded
        imageUrl: req.file ? `/images/posts/${req.file.filename}` : null,
        user_id: Number(req.body.user_id),
      },
    });

    res.status(201).json({ newPost, message: "Post created!" });
  } catch (error) {
    handleError(res, error);
  }
}

// Update a post
async function updatePost(req, res) {
  try {
    const post = await prisma.posts.findUnique({
      where: { id: Number(req.params.id) },
    });

    // Delete the previous image associated with the post if a new image is uploaded
    req.file ? deleteImage(post.imageUrl) : null;

    const updatedPost = await prisma.posts.update({
      where: { id: Number(req.params.id) },
      data: {
        message: req.body.message,
        // Set 'imageUrl' to the new file path if a file is uploaded
        imageUrl: req.file ? `/images/posts/${req.file.filename}` : undefined,
      },
    });

    res.status(200).json({ updatedPost, message: "Post updated!" });
  } catch (error) {
    handleError(res, error);
  }
}

// Delete a post
async function deletePost(req, res) {
  try {
    const post = await prisma.posts.findUnique({
      where: { id: Number(req.params.id) },
    });

    // Delete the image if there is one in the post.
    post.imageUrl ? deleteImage(post.imageUrl) : null;

    await prisma.posts.delete({
      where: { id: post.id },
    });

    res.status(204).json();
  } catch (error) {
    handleError(res, error);
  }
}

// Like a post
async function likePost(req, res) {
  const likeData = ({ user_id, post_id } = req.body);

  try {
    const existingLike = await prisma.likes.findFirst({
      where: likeData,
    });

    // Check if the user has already liked the post
    if (existingLike) {
      await prisma.likes.deleteMany({
        where: likeData,
      });

      res.status(204).json();
    } else {
      const newLike = await prisma.likes.create({
        data: likeData,
      });

      res.status(201).json({ newLike, message: "Post liked!" });
    }
  } catch (error) {
    handleError(res, error);
  }
}

module.exports = {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
};
