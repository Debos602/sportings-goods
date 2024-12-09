import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import jwt from 'jsonwebtoken';
import catchAsync from '../modules/utils/catchAsync';
import config from '../config';

const auth = (requiredRole: string) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;
        console.log("authHeader", authHeader);

        if (!authHeader || !authHeader.startsWith('Bearer')) {
            throw new AppError(401, 'Authorization header missing or incorrect');
        }

        const token = authHeader.split(' ')[1];
        console.log('Token:', token);

        try {
            const decoded = jwt.verify(
                token,
                config.jwt_access_token_secret as string
            ) as jwt.JwtPayload;

            console.log('Decoded:', decoded);

            if (decoded.role !== requiredRole) {
                throw new AppError(403, 'You are forbidden');
            }

            req.user = { _id: decoded.userId, role: decoded.role };
            next();
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                throw new AppError(401, 'JWT token has expired. Please log in again.');
            } else if (err instanceof jwt.JsonWebTokenError) {
                throw new AppError(401, 'Invalid JWT token.');
            }
            throw new AppError(500, 'An unexpected error occurred during authentication.');
        }
    });
};

export default auth;
