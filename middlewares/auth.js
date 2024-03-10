const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Extract token from request headers
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user ID to request object for future use
    req.userId = decoded.userId;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error decoding token:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
