import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: { userId: string; username: string };
}

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): Response | void => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is missing in environment variables!");
      return res.status(500).json({ message: 'Internal server error' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string; username: string };
    req.user = decoded;
    next();
  } catch (err) {
    console.error("❌ Invalid token:", err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export { verifyToken, AuthRequest };
