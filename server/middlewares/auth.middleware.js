import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token =
    req.headers.authorization?.split(" ")[1] || req.cookies.auth_token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication token is required",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(`Error in authMiddleware: ${error.message}`);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;
