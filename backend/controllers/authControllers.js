import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const createToken = (user) => {
  return jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  const lowercaseUsername = username.toLowerCase();
  try {
    const userExists = await User.exists({ email: lowercaseUsername });
    if (userExists)
      return res.status(409).json({ error: "Email already in use." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: lowercaseUsername,
      email,
      password: hashedPassword,
    });
    const token = createToken(user);
    return res.status(201).json({
      userDetails: {
        username: lowercaseUsername,
        email,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) res.status(404).json({ error: "User not found." });

    if (user && bcrypt.compare(password, user.password)) {
      const token = createToken(user);
      return res.status(201).json({
        userDetails: {
          username: user.username,
          email,
          token,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export default {
  register,
  login,
};
