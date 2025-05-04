const isAdmin = (req, res, next) => {
  const { level } = req.user;

  if (level !== "admin") {
    return res
      .status(403)
      .json({ message: "Access denied. Only admins are allowed." });
  }

  next();
};

export default isAdmin;
