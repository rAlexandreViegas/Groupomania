const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

// Get a user
exports.getUser = async (req, res, next) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: Number(req.params.id) },
    });
    res.status(200).json({ user, message: "L'utilisateur a été récupéré !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Update a user
exports.updateUser = async (req, res, next) => {
  try {
    // Check if the request have an image, if yes
    if (req.file !== undefined) {
      const user = await prisma.users.findUnique({
        where: { id: Number(req.params.id) },
      });
      // Check if the user already have an avatar, if yes, delete it from the server
      if (user.avatarUrl !== null) {
        const filename = user.avatarUrl.split("/images/")[1];
        fs.unlinkSync(`images/${filename}`);
      }
      // Update the user's avatar with the new one
      await prisma.users.update({
        where: { id: user.id },
        data: { avatarUrl: `/images/avatars/${req.file.filename}` },
      });
    }
    // Update the user fisrtname and lastname
    const user = await prisma.users.update({
      where: { id: Number(req.params.id) },
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
    });
    res.status(200).json({ user, message: "L'utilisateur a été modifié !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Delete a user
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: Number(req.params.id) },
    });
    // Check if the user have an avatar, if yes, delete it from the server
    if (user.avatarUrl !== null) {
      const filename = user.avatarUrl.split("/images/")[1];
      fs.unlinkSync(`images/${filename}`);
    }
    // Delete the user
    await prisma.users.delete({
      where: { id: user.id },
    });
    res.clearCookie("Token");
    res.status(200).json({ user, message: "L'utilisateur a été surprimé !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

