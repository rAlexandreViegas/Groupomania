const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const handleError = require("../modules/handle.error");

const prisma = new PrismaClient();

// Check if the user is connected to the website
function userAuthentication(req, res, next) {
  !req.cookies.Token
    ? res.status(403).json({
        error: "To use the social network, please log in.",
      })
    : next();
}

// Check if the user is authorized to manage data
function userAuthorization(route) {
  return async (req, res, next) => {
    try {
      let request = null;

      switch (route) {
        case "user":
          request = prisma.users;
          break;
        case "post":
          request = prisma.posts;
          break;
        case "comment":
          request = prisma.comments;
          break;
        default:
          break;
      }

      const token = req.cookies.Token;
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.userId;

      const data = await request.findUnique({
        where: { id: Number(req.params.id) },
      });

      const isAdmin = await prisma.users.findUnique({
        where: { id: userId },
        include: { users_roles: true },
      });

      isAdmin.users_roles[0].role_id !== 1 &&
      userId !== data.id &&
      userId !== data.user_id
        ? res.status(403).json({ error: "Unauthorized user" })
        : next();
    } catch (error) {
      handleError(res, error);
    }
  };
}

module.exports = {
  userAuthentication,
  userAuthorization,
};
