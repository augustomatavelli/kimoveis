import { Router } from 'express';
import {
	createScheduleController,
	listScheduleOfRealEstateController,
} from '../controllers/schedules.controller';
import { verifyRealEstateExistsMiddleware } from '../middlewares/verifyRealEstateExists.middleware';
import { verifyRequestBodyIsValidMiddleware } from '../middlewares/verifyRequestBodyIsValid.middleware';
import { verifyTokenIsValidMiddleware } from '../middlewares/verifyTokenIsValid.middleware';
import { verifyIfUserIsAdminMiddleware } from '../middlewares/verifyUserIsAdmin.middleware';
import { scheduleSchema } from '../schemas/schedules.schema';

export const schedulesRoutes: Router = Router();

schedulesRoutes.post(
	'',
	verifyTokenIsValidMiddleware,
	verifyRequestBodyIsValidMiddleware(scheduleSchema),
	createScheduleController
);

schedulesRoutes.get(
	'/realEstate/:id',
	verifyTokenIsValidMiddleware,
	verifyIfUserIsAdminMiddleware,
	verifyRealEstateExistsMiddleware,
	listScheduleOfRealEstateController
);
