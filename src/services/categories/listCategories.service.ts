import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Category } from '../../entities';
import { IAllCategoriesReturn } from '../../interfaces/categories.interface';
import { returnAllCategories } from '../../schemas/categories.schema';

export const listCategoriesService =
	async (): Promise<IAllCategoriesReturn> => {
		const categoryRepository: Repository<Category> =
			AppDataSource.getRepository(Category);

		const categories = await categoryRepository.find();

		const categoriesReturn = returnAllCategories.parse(categories);

		return categoriesReturn;
	};
