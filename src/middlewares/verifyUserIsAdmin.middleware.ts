import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';

export const verifyIfUserIsAdminMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const adminUser = req.user.admin;

	if (!adminUser) {
		throw new AppError('Insufficient permission', 403);
	}

	return next();
};
