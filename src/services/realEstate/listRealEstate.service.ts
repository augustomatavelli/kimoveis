import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { RealEstate } from '../../entities';
import { IRouteGetAllRealEstate } from '../../interfaces/realEstate.interface';
import { returnRouteGetAllReaLEstateSchema } from '../../schemas/realEstate.schema';

export const listRealEstateService =
	async (): Promise<IRouteGetAllRealEstate> => {
		const realEstateRepository: Repository<RealEstate> =
			AppDataSource.getRepository(RealEstate);

		const findRealEstates = await realEstateRepository.find({
			relations: {
				address: true,
			},
		});

		const listAllRealEstates =
			returnRouteGetAllReaLEstateSchema.parse(findRealEstates);

		return listAllRealEstates;
	};
