import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Category } from '../../entities';
import {
	ICategory,
	ICategoryReturn,
} from '../../interfaces/categories.interface';
import { returnCategorySchema } from '../../schemas/categories.schema';

export const createCategoryService = async (
	categoryData: ICategory
): Promise<ICategoryReturn> => {
	const categoryRepository: Repository<Category> =
		AppDataSource.getRepository(Category);

	const category = categoryRepository.create(categoryData);

	await categoryRepository.save(category);

	const newCategory = returnCategorySchema.parse(category);

	return newCategory;
};
