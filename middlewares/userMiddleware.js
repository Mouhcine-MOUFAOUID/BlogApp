// authMiddleware.js
function ensureToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
  
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(' ')[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  }
  
  module.exports = ensureToken
  