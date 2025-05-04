const isPengamat = (req, res, next) => {
  const { level } = req.user;

  if (level !== "pengamat") {
    return res
      .status(403)
      .json({ message: "Access denied. Only pengamat are allowed." });
  }

  next();
};

export default isPengamat;
