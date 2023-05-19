import { Router } from 'express';
import {
	createCategoryController,
	listCategoriesController,
	listRealEstateOfCategoryController,
} from '../controllers/categories.controller';
import { verifyCategoryExistsMiddleware } from '../middlewares/verifyCategoriesExists.middleware';
import { verifyCategoryNameExistsMiddleware } from '../middlewares/verifyCategoryNameExists.middleware';
import { verifyRequestBodyIsValidMiddleware } from '../middlewares/verifyRequestBodyIsValid.middleware';
import { verifyTokenIsValidMiddleware } from '../middlewares/verifyTokenIsValid.middleware';
import { verifyIfUserIsAdminMiddleware } from '../middlewares/verifyUserIsAdmin.middleware';
import { categorySchema } from '../schemas/categories.schema';

export const categoriesRoutes: Router = Router();

categoriesRoutes.post(
	'',
	verifyTokenIsValidMiddleware,
	verifyIfUserIsAdminMiddleware,
	verifyRequestBodyIsValidMiddleware(categorySchema),
	verifyCategoryNameExistsMiddleware,
	createCategoryController
);
categoriesRoutes.get('', listCategoriesController);
categoriesRoutes.get(
	'/:id/realEstate',
	verifyCategoryExistsMiddleware,
	listRealEstateOfCategoryController
);
