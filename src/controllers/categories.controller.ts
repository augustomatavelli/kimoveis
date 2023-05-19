import { Request, Response } from 'express';
import { ICategory } from '../interfaces/categories.interface';
import { createCategoryService } from '../services/categories/createCategory.service';
import { listCategoriesService } from '../services/categories/listCategories.service';
import { listRealEstateOfCategoryService } from '../services/categories/listRealEstateOfCategory.service';

export const createCategoryController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const categoryData: ICategory = req.body;

	const category = await createCategoryService(categoryData);

	return res.status(201).json(category);
};

export const listCategoriesController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const categories = await listCategoriesService();

	return res.json(categories);
};

export const listRealEstateOfCategoryController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const categoryId: number = parseInt(req.params.id);

	const listRealEstateOfCategory = await listRealEstateOfCategoryService(
		categoryId
	);

	return res.json(listRealEstateOfCategory);
};
