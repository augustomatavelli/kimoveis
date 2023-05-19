import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { RealEstate } from '../entities';
import { AppError } from '../errors';

export const verifyRealEstateExistsMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const realEstateRepository: Repository<RealEstate> =
		AppDataSource.getRepository(RealEstate);

	const findRealEstate = await realEstateRepository.findOne({
		where: {
			id: parseInt(req.params.id),
		},
	});
	if (!findRealEstate) {
		throw new AppError('RealEstate not found', 404);
	}

	return next();
};
