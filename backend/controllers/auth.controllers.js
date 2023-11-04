const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleError = require("../modules/errors");

const prisma = new PrismaClient();

// Sign up
const signUp = async (req, res) => {
  try {
    const existingUser = await prisma.users.findUnique({
      where: { email: req.body.email },
    });

    // Check if the email is already used
    if (existingUser) {
      return res.status(409).json({ error: "User found with this email!" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await prisma.users.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    await prisma.users_roles.create({
      data: { user_id: newUser.id },
    });

    res.status(201).json({ message: "User created!" });
  } catch (error) {
    handleError(res, error);
  }
};

// Login
const login = async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: { email: req.body.email },
      include: { users_roles: true },
    });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ email: "Unknown user!" });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // Check if the password is valid
    if (!passwordMatch) {
      return res.status(401).json({ password: "Incorrect password!" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("Token", token, { httpOnly: true });
    res
      .status(200)
      .json({
        userId: user.id,
        roleId: user.users_roles[0].role_id,
        message: "Login successful!",
      });
  } catch (error) {
    handleError(res, error);
  }
};

// Logout
const logout = (req, res) => {
  res.clearCookie("Token");
  res.status(204).json();
};

module.exports = {
  signUp,
  login,
  logout,
};
