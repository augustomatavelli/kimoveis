import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const verifyTokenIsValidMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	let token = req.headers.authorization;

	token = token?.split(' ')[1];

	if (!token) {
		throw new AppError('Missing bearer token', 401);
	}

	jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
		if (error) {
			throw new AppError(error.message, 401);
		}
		req.user = {
			id: parseInt(decoded.sub),
			admin: decoded.admin,
		};

		return next();
	});
};
