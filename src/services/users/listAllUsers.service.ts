import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities';
import { IAllUserReturn } from '../../interfaces/users.interface';
import { returnAllUsersSchema } from '../../schemas/users.schema';

export const listAllUsersService = async (): Promise<IAllUserReturn> => {
	const userRepository: Repository<User> = AppDataSource.getRepository(User);

	const findUser: User[] = await userRepository.find();

	const users = returnAllUsersSchema.parse(findUser);

	return users;
};
