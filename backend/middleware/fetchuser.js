const jwt = require("jsonwebtoken");
const JWT_SECRET = "never$reveal#secret";

//This is a middleware function. Call to next() executes calling function.
const fetchuser = (req, res, next) => {
  //Get user from JWT token and add Id to request
  const token = req.header("auth-token");

  if (!token) {
    console.log("Retrieved token =" + token);
    return res.status(401).json({ error: "Please authenticate using a valid token." });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Please authenticate using a valid token." });
  }
};

module.exports = fetchuser;
