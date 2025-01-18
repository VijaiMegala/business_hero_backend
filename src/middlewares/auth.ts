import { string } from "@tensorflow/tfjs";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            userId?: number; // Adding the userId property to the Request interface
        }
    }
}

interface DecodedToken extends jwt.JwtPayload {
    userId: number;  // Add any other fields in your token's payload
}


// Middleware to check token and set userId to context
const authenticateUser = (req: Request, res: Response, next: NextFunction): void | any => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        //If no token, throwing an error message
        return res.status(403).json({ error: 'Invalid token', message: 'Invalid token', status_code: 401 });
    }

    //If token is provided, verifying it
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "") as DecodedToken;
        req.userId = decoded.userId;
        next();
    } catch (err) {
        // If token verification fails, sending an error response
        return res.status(403).json({ error: 'Invalid token', message: 'Invalid or expired token', status_code: 403 });
        // return res.status(403).json({ error: 'Invalid or expired token' });
    }
};

export default authenticateUser;
