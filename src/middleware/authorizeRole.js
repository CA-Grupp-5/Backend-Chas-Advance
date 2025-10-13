const authorizeRole = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const [rows] = await db(
        `SELECT roles.role AS role FROM users
            JOIN roles ON users.role = roles.id
            WHERE users.id = $1
            LIMIT 1`,
        [req.user.userId]
      );

      const user = rows[0]; //test

      if (!user || !allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied.' });
      }

      req.user.role = user.role;
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', detail: error.message });
    }
  };
};

export default authorizeRole;
