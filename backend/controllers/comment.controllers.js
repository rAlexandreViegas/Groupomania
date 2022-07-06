const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Create a comment
exports.createComment = async (req, res, next) => {
  try {
    const comment = await prisma.comments.create({
      data: {
        message: req.body.message,
        user_id: Number(req.body.user_id),
        post_id: Number(req.body.post_id),
      },
      include: { users: true },
    });
    res.status(200).json({ comment, message: "Le commentaire a été créé !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Update a comment
exports.updateComment = async (req, res, next) => {
  try {
    const comment = await prisma.comments.update({
      where: { id: Number(req.params.id) },
      data: { message: req.body.message },
      include: { users: true },
    });
    res
      .status(200)
      .json({ comment, message: "Le commentaire a été modifié !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Delete a comment
exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await prisma.comments.delete({
      where: { id: Number(req.params.id) },
    });
    res
      .status(200)
      .json({ comment, message: "Le commentaire a été surprimé !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
