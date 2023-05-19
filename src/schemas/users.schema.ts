import { z } from 'zod';

export const userSchema = z.object({
	name: z.string().min(1).max(45),
	email: z.string().email().min(1).max(45),
	admin: z.boolean().default(false),
	password: z.string().min(1).max(120),
});

export const returnUserSchema = userSchema
	.extend({
		id: z.number(),
		createdAt: z.string(),
		updatedAt: z.string(),
		deletedAt: z.string().nullable(),
	})
	.omit({
		password: true,
	});

export const returnAllUsersSchema = returnUserSchema.array();

export const updateUserSchema = z.object({
	name: z.string().min(1).max(45).optional(),
	email: z.string().email().min(1).max(45).optional(),
	password: z.string().min(1).max(120).optional(),
});
export const returnUpdateUserSchema = updateUserSchema
	.extend({
		id: z.number(),
		admin: z.boolean(),
		createdAt: z.string(),
		updatedAt: z.string(),
		deletedAt: z.string().nullable(),
	})
	.omit({
		password: true,
	});

export const returnUserScheduleSchema = userSchema.extend({
	id: z.number(),
	createdAt: z.string(),
	updatedAt: z.string(),
	deletedAt: z.string().nullable(),
});
