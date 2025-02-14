const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  // Check if token exists
  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user to the request object
    next(); // Proceed to the next middleware
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

exports.authRoles = (roles) => {
  return (req, res, next) => {
    // Ensure the user is already authenticated (req.user exists)
    if (!req.user) {
      return res
        .status(403)
        .json({ message: "Access denied. Authentication required." });
    }

    // Ensure roles is an array and check if the user has the required role
    if (!Array.isArray(roles) || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
    }

    next(); // User is authorized, proceed to the next middleware
  };
};

exports.verifyRefreshToken = (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(403).json({ message: "Refresh token missing." });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    req.user = decoded; // Attach the decoded user data for refreshing the token
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token." });
  }
};

// Route handler to refresh the access token
exports.refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(403).json({ message: "Refresh token missing." });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIRES }
    );

    res.cookie("token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({ success: true, message: "Token refreshed." });
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token." });
  }
};
