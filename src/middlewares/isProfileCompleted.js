const isProfileCompleted = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { isProfileComplete } = req.user;

  if (!isProfileComplete) {
    return res.status(403).json({ message: "Profile not completed" });
  }

  next();
};

export default isProfileCompleted;
