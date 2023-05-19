import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities';
import { IUpdateUserReturn } from '../../interfaces/users.interface';
import { returnUpdateUserSchema } from '../../schemas/users.schema';

export const updateUserService = async (
	userId: number,
	updateUserData: any
): Promise<IUpdateUserReturn> => {
	const userRepository: Repository<User> = AppDataSource.getRepository(User);

	const oldUserData = await userRepository.findOneBy({
		id: userId,
	});

	const user = userRepository.create({
		...oldUserData,
		...updateUserData,
	});

	await userRepository.save(user);

	const updateUser = returnUpdateUserSchema.parse(user);

	return updateUser;
};
