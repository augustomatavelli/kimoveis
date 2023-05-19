import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities';

export const deleteUserService = async (userId: number) => {
	const userRepository: Repository<User> = AppDataSource.getRepository(User);

	const user = await userRepository.findOne({
		where: {
			id: userId,
		},
	});

	await userRepository.softRemove(user!);
};
