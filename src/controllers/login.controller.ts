import { Request, Response } from 'express';
import { ILogin } from '../interfaces/login.interface';
import { loginService } from '../services/login/login.service';

export const loginController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const userLogin: ILogin = req.body;

	const token = await loginService(userLogin);

	return res.json({
		token: token,
	});
};
