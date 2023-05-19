import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email().min(1).max(45),
	password: z.string().min(1).max(120),
});
