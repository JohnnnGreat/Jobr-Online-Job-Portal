const jwt = require("jsonwebtoken");

const employerProtect = async (req, res, next) => {
  let token = "";

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decode the token to get the user ID
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);

      const { isVerified, isAdmin } = decoded;

      if (!isAdmin) {
        return res.status(403).json({ message: "User is not an admin" });
      }
      // if (!isVerified) {
      //   return res.status(403).json({ message: "User is not verified" });
      // }
      // Fetch the user from the database and attach it to the request
      req.userDetails = { user: decoded?.userId, role: decoded?.role };

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { employerProtect };
