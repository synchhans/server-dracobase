const setReqUserFromJwt = (req, res, next) => {
  if (!req.user) {
    return next();
  }

  if (req.user.user) {
    req.user = req.user.user;
  }

  next();
};

export default setReqUserFromJwt;
