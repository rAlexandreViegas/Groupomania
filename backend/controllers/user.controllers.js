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

// Get a user
const getUser = async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: Number(req.params.id) },
      select: {
        ...userSelect,
        email: true,
        users_roles: true,
      },
    });

    res.status(200).json({ user, message: "User has been retrieved!" });
  } catch (error) {
    handleError(res, error);
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: Number(req.params.id) },
    });

    // Delete the previous avatar associated with the user if a new image is uploaded
    req.file ? deleteImage(user.avatarUrl) : null;

    const updatedUser = await prisma.users.update({
      where: { id: Number(req.params.id) },
      select: userSelect,
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        // Set 'avatarUrl' to the new file path if a file is uploaded
        avatarUrl: req.file
          ? `/images/avatars/${req.file.filename}`
          : undefined,
      },
    });

    res.status(200).json({ updatedUser, message: "User has been updated!" });
  } catch (error) {
    handleError(res, error);
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: Number(req.params.id) },
    });

    // Delete the avatar if the user has one.
    user.avatarUrl ? deleteImage(user.avatarUrl) : null;

    await prisma.users.delete({
      where: { id: user.id },
    });

    res.clearCookie("Token");
    res.status(204).json();
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
};
