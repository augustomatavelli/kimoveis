import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Category } from '../../entities';

export const listRealEstateOfCategoryService = async (
	categoryId: number
): Promise<Category | null> => {
	const categoryRepository: Repository<Category> =
		AppDataSource.getRepository(Category);

	const findRealEstatesOfCategory = await categoryRepository.findOne({
		where: {
			id: categoryId,
		},
		relations: {
			realEstate: true,
		},
	});

	return findRealEstatesOfCategory;
};
