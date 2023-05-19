import { Request, Response } from 'express';
import { ISchedule } from '../interfaces/schedules.interface';
import { createScheduleService } from '../services/schedules/createSchedule.service';
import { listScheduleOfRealEstateService } from '../services/schedules/listScheduleOfRealEstate.service';

export const createScheduleController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const scheduleData: ISchedule = req.body;
	const userId: number = req.user.id;

	const schedule = await createScheduleService(scheduleData, userId);

	return res.status(201).json({ message: schedule });
};

export const listScheduleOfRealEstateController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const realEstateId: number = parseInt(req.params.id);

	const scheduleOfRealEstate = await listScheduleOfRealEstateService(
		realEstateId
	);

	return res.json(scheduleOfRealEstate);
};
