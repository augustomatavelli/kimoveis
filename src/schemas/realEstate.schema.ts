import { z } from 'zod';

export const realEstateSchema = z.object({
	value: z.union([z.string(), z.number()]),
	size: z.number().positive(),
	categoryId: z.number(),
	address: z.object({
		street: z.string().max(45),
		zipCode: z.string().max(8),
		number: z.string().nullish(),
		city: z.string().max(20),
		state: z.string().max(2),
	}),
});

export const returnRealEstateSchema = z.object({
	id: z.number(),
	value: z.union([z.string(), z.number()]),
	size: z.number().positive(),
	sold: z.boolean(),
	category: z.object({
		id: z.number(),
		name: z.string(),
	}),
	address: z.object({
		id: z.number(),
		street: z.string().max(45),
		zipCode: z.string().max(8),
		number: z.string().max(7).optional().nullable(),
		city: z.string().max(20),
		state: z.string().max(2),
	}),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const returnAllRealEstateSchema = returnRealEstateSchema.array();

export const returnRouteGetRealEstateSchema = z.object({
	id: z.number(),
	value: z.union([z.string(), z.number()]),
	size: z.number().positive(),
	sold: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string(),
	address: z.object({
		id: z.number(),
		street: z.string().max(45),
		zipCode: z.string().max(8),
		number: z.string().max(7).optional().nullable(),
		city: z.string().max(20),
		state: z.string().max(2),
	}),
});

export const returnRouteGetAllReaLEstateSchema =
	returnRouteGetRealEstateSchema.array();

export const realEstateOfCategory = z.object({
	id: z.number(),
	value: z.union([z.string(), z.number()]),
	size: z.number().positive(),
	sold: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string(),
});
