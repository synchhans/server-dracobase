export const fetchDataUser = (req, res) => {
  const {
    _id,
    displayName,
    firstName,
    lastName,
    role,
    plan,
    status,
    email,
    githubUsername,
    picture,
    level,
    createdAt,
  } = req.user;

  res.json({
    status: 200,
    user: {
      _id,
      displayName,
      firstName,
      lastName,
      role,
      plan,
      status,
      email,
      githubUsername,
      picture,
      level,
      createdAt,
    },
  });
};
