const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

// Check if the user is connected to the website
exports.cookie = async (req, res, next) => {
  if (req.cookies.Token) {
    next();
  } else {
    res.status(403).json({
      error:
        "Vous devez créer un compte / vous connecter pour utiliser le réseau social !",
    });
  }
};

// Check if the user is authorized to manage data
exports.auth = (route) => {
  return async (req, res, next) => {
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
    try {
      const token = req.cookies.Token;
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.userId;
      const data = await request.findUnique({
        where: { id: Number(req.params.id) },
      });
      if (userId === 1 || userId === data.id || userId === data.user_id) {
        next();
      } else {
        res.status(403).json({ error: "Utilisateur non autorisé" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  };
};
