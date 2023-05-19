import { Request, Response } from 'express';
import { AppError } from '../errors';
import { IUpdateUser, IUser } from '../interfaces/users.interface';
import { createUserService } from '../services/users/createUser.service';
import { deleteUserService } from '../services/users/deleteUser.service';
import { listAllUsersService } from '../services/users/listAllUsers.service';
import { updateUserService } from '../services/users/updateUser.service';

export const createUserController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const userData: IUser = req.body;

	const newUser = await createUserService(userData);

	return res.status(201).json(newUser);
};

export const listAllUsersController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const userAdmin: boolean = req.user.admin;

	if (!userAdmin) {
		throw new AppError('Insufficient Permission', 403);
	}

	const users = await listAllUsersService();

	return res.json(users);
};

export const updateUserController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const userId = parseInt(req.params.id);
	const updateUserData: IUpdateUser = req.body;

	const updateUser = await updateUserService(userId, updateUserData);

	return res.json(updateUser);
};

export const deleteUserController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const userId: number = parseInt(req.params.id);

	await deleteUserService(userId);

	return res.status(204).send();
};
