import {
	categorySchema,
	returnAllCategories,
	returnCategorySchema,
} from '../schemas/categories.schema';

import { z } from 'zod';

export type ICategory = z.infer<typeof categorySchema>;
export type ICategoryReturn = z.infer<typeof returnCategorySchema>;
export type IAllCategoriesReturn = z.infer<typeof returnAllCategories>;
