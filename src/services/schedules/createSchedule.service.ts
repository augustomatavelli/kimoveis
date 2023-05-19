import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { RealEstate, Schedule } from '../../entities';
import { AppError } from '../../errors';

export const createScheduleService = async (
	scheduleData: any,
	userId: any
): Promise<string> => {
	const scheduleRepository: Repository<Schedule> =
		AppDataSource.getRepository(Schedule);

	const realEstateRepository: Repository<RealEstate> =
		AppDataSource.getRepository(RealEstate);

	const verifyRealEstateScheduled = await realEstateRepository.findOne({
		where: {
			id: scheduleData.realEstateId,
		},
	});

	if (!verifyRealEstateScheduled) {
		throw new AppError('RealEstate not found', 404);
	}

	const hourScheduled = parseInt(scheduleData.hour);

	if (hourScheduled < 8) {
		throw new AppError('Invalid hour, available times are 8AM to 18PM', 400);
	}
	if (hourScheduled >= 18) {
		throw new AppError('Invalid hour, available times are 8AM to 18PM', 400);
	}

	const verifyWeekdayDateScheduled = new Date(scheduleData.date);
	const weekday = verifyWeekdayDateScheduled.getDay();
	if (weekday === 0 || weekday > 5) {
		throw new AppError('Invalid date, work days are monday to friday', 400);
	}

	const verifyIfExistsScheduleOfRealEstate = await scheduleRepository
		.createQueryBuilder('schedule')
		.select()
		.where('schedule.date = :date', { date: scheduleData.date })
		.andWhere('schedule.hour = :hour', { hour: scheduleData.hour })
		.andWhere('schedule.realEstateId = :realEstateId', {
			realEstateId: scheduleData.realEstateId,
		})
		.getOne();

	if (verifyIfExistsScheduleOfRealEstate) {
		throw new AppError(
			'Schedule to this real estate at this date and time already exists',
			409
		);
	}

	const verifyIfUserAlreadyHasASchedule = await scheduleRepository
		.createQueryBuilder('schedule')
		.select()
		.where('schedule.userId = :userId', { userId: userId })
		.andWhere('schedule.date = :date', { date: scheduleData.date })
		.andWhere('schedule.hour = :hour', { hour: scheduleData.hour })
		.getOne();

	if (verifyIfUserAlreadyHasASchedule) {
		throw new AppError(
			'User schedule to this real estate at this date and time already exists',
			409
		);
	}

	const scheduleRealEstate: Schedule = scheduleRepository.create({
		date: scheduleData.date,
		hour: scheduleData.hour,
		realEstate: scheduleData.realEstateId,
		user: userId,
	});

	await scheduleRepository.save(scheduleRealEstate);

	return 'Schedule created';
};
