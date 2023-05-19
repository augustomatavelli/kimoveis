import {
	userSchema,
	returnUserSchema,
	returnAllUsersSchema,
	returnUpdateUserSchema,
	updateUserSchema,
} from '../schemas/users.schema';
import { z } from 'zod';

export type IUser = z.infer<typeof userSchema>;
export type IUserReturn = z.infer<typeof returnUserSchema>;
export type IAllUserReturn = z.infer<typeof returnAllUsersSchema>;
export type IUpdateUser = z.infer<typeof updateUserSchema>;
export type IUpdateUserReturn = z.infer<typeof returnUpdateUserSchema>;
