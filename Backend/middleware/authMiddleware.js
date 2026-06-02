const jwt = require("jsonwebtoken");

const protect = (
  req,
  res,
  next
) => {

  const token =
    req.headers.authorization;

  if (!token) {

    return res.status(401).json({
      message: "No Token",
    });

  }

  try {

    jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Invalid Token",
    });

  }
};

module.exports = protect;