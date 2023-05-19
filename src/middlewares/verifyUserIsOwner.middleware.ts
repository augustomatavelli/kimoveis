import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';

export const verifyIfUserIsOwnerMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const adminUser = req.user.admin;
	const userId = req.user.id;
	const userRequestedId: number = parseInt(req.params.id);
	if (adminUser) {
		return next();
	}

	if (userId !== userRequestedId) {
		throw new AppError('Insufficient permission', 403);
	}

	return next();
};
