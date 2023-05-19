import { Router } from 'express';
import { loginController } from '../controllers/login.controller';
import { verifyRequestBodyIsValidMiddleware } from '../middlewares/verifyRequestBodyIsValid.middleware';
import { loginSchema } from '../schemas/login.schema';

export const loginRoutes: Router = Router();

loginRoutes.post(
	'',
	verifyRequestBodyIsValidMiddleware(loginSchema),
	loginController
);
