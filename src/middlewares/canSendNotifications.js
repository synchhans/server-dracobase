const canSendNotifications = (req, res, next) => {
  if (req.user && (req.user.level === "admin" || req.user.level === "dosen")) {
    next();
  } else {
    res.status(403).json({
      message:
        "Akses ditolak. Anda tidak memiliki izin untuk mengirim notifikasi.",
    });
  }
};

export default canSendNotifications;
