const isDosen = (req, res, next) => {
  if (req.user && (req.user.level === "dosen" || req.user.level === "admin")) {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Akses ditolak. Hanya untuk Dosen atau Admin." });
  }
};

export default isDosen;
