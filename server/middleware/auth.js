import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Check if it's using Bearer format
  const token = authHeader.startsWith('Bearer ') 
    ? authHeader.substring(7, authHeader.length) 
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}