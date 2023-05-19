import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Address, Category, RealEstate } from '../../entities';
import { AppError } from '../../errors';
import {
	IRealEstate,
	IRealEstateReturn,
} from '../../interfaces/realEstate.interface';
import { returnRealEstateSchema } from '../../schemas/realEstate.schema';

export const createRealEstateService = async (
	realEstateData: IRealEstate
): Promise<IRealEstateReturn> => {
	const realEstateRepository: Repository<RealEstate> =
		AppDataSource.getRepository(RealEstate);
	const addressRepository: Repository<Address> =
		AppDataSource.getRepository(Address);
	const categoryRepository: Repository<Category> =
		AppDataSource.getRepository(Category);

	const verifyCategory = await categoryRepository.findOne({
		where: {
			id: realEstateData.categoryId,
		},
	});

	if (!verifyCategory) {
		throw new AppError('Category not found', 404);
	}

	let addressNumber = realEstateData.address.number;

	if (addressNumber) {
		const verifyAddress = await addressRepository.findOne({
			where: {
				street: realEstateData.address.street,
				zipCode: realEstateData.address.zipCode,
				number: addressNumber,
				city: realEstateData.address.city,
				state: realEstateData.address.state,
			},
		});
		if (verifyAddress) {
			throw new AppError('Address already exists', 409);
		}
	} else {
		const verifyAddress = await addressRepository.findOne({
			where: {
				street: realEstateData.address.street,
				zipCode: realEstateData.address.zipCode,
				city: realEstateData.address.city,
				state: realEstateData.address.state,
			},
		});
		if (verifyAddress) {
			throw new AppError('Address already exists', 409);
		}
	}

	const newAddress = addressRepository.create({
		...realEstateData.address,
	});
	await addressRepository.save(newAddress);

	const realEstate: RealEstate = realEstateRepository.create({
		value: realEstateData.value,
		size: realEstateData.size,
		category: verifyCategory,
		address: newAddress,
	});

	await realEstateRepository.save(realEstate);

	const newRealEstate = returnRealEstateSchema.parse(realEstate);

	return newRealEstate;
};
