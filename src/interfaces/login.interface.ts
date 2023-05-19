import { loginSchema } from '../schemas/login.schema';
import { z } from 'zod';

export type ILogin = z.infer<typeof loginSchema>;
