//Importing JWT and secret file
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

module.exports = (req, res, next) => {
  //getting the token from the headers
  const token = req.headers.authorization;
  //if a token exist
  if (token) {
    //jwt verify method
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        //invalid token
        console.log(err);
        res.status(400).json({ message: "invalid token!" });
      } else {
        //if there is a token and no error call next
        //for normal request
        //passing the decodedToken in case we want to pass
        //who the user is so other pages show only specific info
        //for that user since the payload has the username
        req.decodedJwt = decodedToken;
        next();
      }
    });
    //if there is no token send message
  } else {
    res.status(401).json({ message: "Missing token in headers" });
  }
};
