import { Router } from 'express';
import {
	createUserController,
	deleteUserController,
	listAllUsersController,
	updateUserController,
} from '../controllers/users.controller';
import { verifyEmailExistsMiddleware } from '../middlewares/verifyEmailExists.middleware';
import { verifyRequestBodyIsValidMiddleware } from '../middlewares/verifyRequestBodyIsValid.middleware';
import { verifyTokenIsValidMiddleware } from '../middlewares/verifyTokenIsValid.middleware';
import { verifyUserExistsMiddleware } from '../middlewares/verifyUserExists.middleware';
import { verifyIfUserIsAdminMiddleware } from '../middlewares/verifyUserIsAdmin.middleware';
import { verifyIfUserIsOwnerMiddleware } from '../middlewares/verifyUserIsOwner.middleware';
import { updateUserSchema, userSchema } from '../schemas/users.schema';

export const userRoutes: Router = Router();

userRoutes.post(
	'',
	verifyRequestBodyIsValidMiddleware(userSchema),
	verifyEmailExistsMiddleware,
	createUserController
);
userRoutes.get(
	'',
	verifyTokenIsValidMiddleware,
	verifyIfUserIsAdminMiddleware,
	listAllUsersController
);
userRoutes.patch(
	'/:id',
	verifyTokenIsValidMiddleware,
	verifyUserExistsMiddleware,
	verifyIfUserIsOwnerMiddleware,
	verifyRequestBodyIsValidMiddleware(updateUserSchema),
	verifyEmailExistsMiddleware,
	updateUserController
);
userRoutes.delete(
	'/:id',
	verifyTokenIsValidMiddleware,
	verifyUserExistsMiddleware,
	verifyIfUserIsAdminMiddleware,
	deleteUserController
);
