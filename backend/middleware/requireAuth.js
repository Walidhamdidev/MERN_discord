import jwt from "jsonwebtoken";

const requireAuth = async (req, res, next) => {
  try {
    const authorization = req.body || req.query || req.headers["authorization"];
    if (!authorization) return res.state(403).json({ error: "Unauthorized." });

    const token = authorization.split(" ")[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid token." });
  }
  next();
};

export default requireAuth;
