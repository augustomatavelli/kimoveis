import { Router } from 'express';
import {
	createRealEstateController,
	listRealEstateController,
} from '../controllers/realEstate.controller';
import { verifyRequestBodyIsValidMiddleware } from '../middlewares/verifyRequestBodyIsValid.middleware';
import { verifyTokenIsValidMiddleware } from '../middlewares/verifyTokenIsValid.middleware';
import { verifyIfUserIsAdminMiddleware } from '../middlewares/verifyUserIsAdmin.middleware';
import { realEstateSchema } from '../schemas/realEstate.schema';

export const realEstateRoutes: Router = Router();

realEstateRoutes.post(
	'',
	verifyTokenIsValidMiddleware,
	verifyIfUserIsAdminMiddleware,
	verifyRequestBodyIsValidMiddleware(realEstateSchema),
	createRealEstateController
);
realEstateRoutes.get('', listRealEstateController);
