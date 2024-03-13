const jwt = require('jsonwebtoken');
const authorizeUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    let tokenValue;
    if (token && token.startsWith('Bearer')) {
      tokenValue = token.split(' ');
    }
    if (!token) {
      const error = res.json({
        message: 'Sorry You are Not Logged in',
      });
      return next(error);
    }
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }

  next();
};

module.exports = authorizeUser;
