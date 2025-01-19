import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            userId?: number; 
        }
    }
}

interface DecodedToken extends jwt.JwtPayload {
    userId: number;  
}

const authenticateUser = (req: Request, res: Response, next: NextFunction): void | any => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ error: 'Invalid token', message: 'Invalid token', status_code: 401 });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "") as DecodedToken;
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Invalid token', message: 'Invalid or expired token', status_code: 403 });
    }
};

export default authenticateUser;
