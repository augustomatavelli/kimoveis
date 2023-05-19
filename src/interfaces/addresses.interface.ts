import { z } from 'zod';
import {
	addressSchema,
	returnAddressSchema,
} from '../schemas/addresses.schema';

export type IAddress = z.infer<typeof addressSchema>;
export type IAddressReturn = z.infer<typeof returnAddressSchema>;
