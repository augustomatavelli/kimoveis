import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Category, RealEstate, Schedule } from '../../entities';
import { IScheduleFromRealEstateAndUserReturn } from '../../interfaces/schedules.interface';
import { returnSchedulesFromRealEstateAndUserSchema } from '../../schemas/schedules.schema';

export const listScheduleOfRealEstateService = async (
	realEstateId: any
): Promise<IScheduleFromRealEstateAndUserReturn> => {
	const realEstateRepository: Repository<RealEstate> =
		AppDataSource.getRepository(RealEstate);
	const scheduleRepository: Repository<Schedule> =
		AppDataSource.getRepository(Schedule);
	const categoryRepository: Repository<Category> =
		AppDataSource.getRepository(Category);

	const schedules = await scheduleRepository.find({
		where: {
			realEstate: realEstateId,
		},
		relations: {
			user: true,
		},
	});

	const schedulesFromRealEstate = await realEstateRepository.findOne({
		where: {
			id: realEstateId,
		},
		relations: {
			address: true,
		},
	});

	const category = await categoryRepository.findOne({
		where: {
			realEstate: realEstateId,
		},
	});

	const returnSchedulesFromRealEstateResponse = {
		...schedulesFromRealEstate,
		category,
		schedules,
	};

	const listOfSchedulesFromRealEstate =
		returnSchedulesFromRealEstateAndUserSchema.parse(
			returnSchedulesFromRealEstateResponse
		);

	return listOfSchedulesFromRealEstate;
};
