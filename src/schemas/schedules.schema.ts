import { z } from 'zod';
import { returnUserScheduleSchema } from './users.schema';

export const scheduleSchema = z.object({
	date: z.string(),
	hour: z.string(),
	realEstateId: z.number(),
});

export const returnScheduleSchema = scheduleSchema
	.extend({
		id: z.number(),
	})
	.omit({ realEstateId: true });

export const SchedulesFromRealEstateSchema = z.object({
	sold: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string(),
	id: z.number(),
	value: z.union([z.string(), z.number()]),
	size: z.number().positive(),
	category: z.object({
		id: z.number(),
		name: z.string(),
	}),
	address: z.object({
		id: z.number(),
		street: z.string().max(45),
		zipCode: z.string().max(9),
		number: z.string().nullish(),
		city: z.string().max(20),
		state: z.string().max(2),
	}),
});
export const schedulesWithUserSchema = returnScheduleSchema.extend({
	user: returnUserScheduleSchema,
});

export const arraySchedulesWithUserSchema = schedulesWithUserSchema.array();

export const returnSchedulesFromRealEstateAndUserSchema =
	SchedulesFromRealEstateSchema.extend({
		schedules: arraySchedulesWithUserSchema,
	});
