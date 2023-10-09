const jwt = require("jsonwebtoken");

// Set token secret and expiration date
const secret = "mysecretsshhhhh";
const expiration = "2h";

module.exports = {
  // Function for our authenticated routes
  authMiddleware: function ({ req }) {
    // Allow the token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // If the token is sent in the headers, extract it
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    // If no token is found, return the request object as is
    if (!token) {
      return req;
    }

    // Verify the token and extract user data from it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    // Return the request object with user data if valid token is found
    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    // Create and sign a JWT token with the payload data
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
