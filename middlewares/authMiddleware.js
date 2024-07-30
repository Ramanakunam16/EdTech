const jwt = require("jsonwebtoken");
const config = require("../utils/config");
function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).send("access denied,invalid token");

  jwt.verify(token, config.JWT_PRIVATE_KEY, (err, decode) => {
    if (err) return res.status(401).send("access denied,invalid token");
    req.user = decode;
    next();
  });
}
module.exports = authMiddleware;
