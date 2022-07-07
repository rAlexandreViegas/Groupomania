const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

// Sign up
exports.signUp = async (req, res, next) => {
  try {
    const user = await prisma.users.findUnique({
      where: { email: req.body.email },
    });
    // Check if the email is already used, if yes, return an error
    if (user !== null) {
      res.status(409).json({ error: "Utilisateur trouvé avec cet email !" });
    } else {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      // Create a user
      const user = await prisma.users.create({
        data: {
          lastName: req.body.lastName,
          firstName: req.body.firstName,
          email: req.body.email,
          password: req.body.password,
        },
      });
      await prisma.users_roles.create({
        data: { user_id: user.id },
      });
      res.status(200).json({ user, message: "Utilisateur crée !" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Login
exports.login = async (req, res, next) => {
  try {
    const user = await prisma.users.findUnique({
      where: { email: req.body.email },
      include: { users_roles: true },
    });
    // Check if the email exist, if yes, return an error
    if (user === null) {
      res.status(404).json({ email: "E-mail inconnu !" });
    } else {
      const valid = await bcrypt.compare(req.body.password, user.password);
      // Check if the password is valid, if not, return an error
      if (!valid) {
        res.status(404).json({ password: "Mot de passe incorrect !" });
      } else {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res.cookie("Token", token, { httpOnly: true });
        res.status(200).json({
          userId: user.id,
          roleId: user.users_roles[0].role_id,
          message: "Connexion réussie !",
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Logout
exports.logout = (req, res, next) => {
  res.clearCookie("Token");
  res.status(200).json({ message: "Déconnexion réussie !" });
};
