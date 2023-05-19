import { Request, Response } from 'express';
import { IRealEstate } from '../interfaces/realEstate.interface';
import { createRealEstateService } from '../services/realEstate/createRealEstate.service';
import { listRealEstateService } from '../services/realEstate/listRealEstate.service';

export const createRealEstateController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const realEstateData: IRealEstate = req.body;

	const realEstate = await createRealEstateService(realEstateData);

	return res.status(201).json(realEstate);
};

export const listRealEstateController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const realEstate = await listRealEstateService();

	return res.json(realEstate);
};
