const isAdminMiddleware = (req, res, next) => {
  const user = req.user; // Assuming user data is available in req.user
  console.log(user);
  if (!user || user.type !== "admin") {
    return res
      .status(403)
      .json({ message: "Unauthorized. Only admins can perform this action." });
  }

  // If user is an admin, continue to the next middleware or route handler
  next();
};

module.exports = isAdminMiddleware;
