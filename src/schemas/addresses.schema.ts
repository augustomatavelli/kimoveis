import { z } from 'zod';

export const addressSchema = z.object({
	street: z.string().max(45),
	zipCode: z.string().max(8),
	number: z.string().max(6).optional().nullable(),
	city: z.string().max(20),
	state: z.string().length(2),
});

export const returnAddressSchema = addressSchema.extend({
	id: z.number(),
});
