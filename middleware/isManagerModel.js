const isManagerMiddleware = (req, res, next) => {
    if (!req.user.isManager) {
      return res.status(403).json({ message: 'Access denied. Manager privileges required.' });
    }
    next();
  };
  
  module.exports = isManagerMiddleware;