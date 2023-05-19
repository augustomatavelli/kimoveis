import { compare } from 'bcryptjs';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities';
import { AppError } from '../../errors';
import { ILogin } from '../../interfaces/login.interface';
import jwt from 'jsonwebtoken';

export const loginService = async (userLogin: ILogin): Promise<string> => {
	const userRepository: Repository<User> = AppDataSource.getRepository(User);

	const user: User | null = await userRepository.findOneBy({
		email: userLogin.email,
	});

	if (!user) {
		throw new AppError('Invalid credentials', 401);
	}
	const passwordMatch = await compare(userLogin.password, user.password);

	if (!passwordMatch) {
		throw new AppError('Invalid credentials', 401);
	}
	const token: string = jwt.sign(
		{ admin: user.admin },
		process.env.SECRET_KEY!,
		{
			expiresIn: '24h',
			subject: String(user?.id),
		}
	);

	return token;
};
