import {
	realEstateSchema,
	returnAllRealEstateSchema,
	returnRealEstateSchema,
	returnRouteGetAllReaLEstateSchema,
	returnRouteGetRealEstateSchema,
} from '../schemas/realEstate.schema';
import { z } from 'zod';

export type IRealEstate = z.infer<typeof realEstateSchema>;
export type IRealEstateReturn = z.infer<typeof returnRealEstateSchema>;
export type IAllRealEstateReturn = z.infer<typeof returnAllRealEstateSchema>;

export type IRouteGetRealEstate = z.infer<
	typeof returnRouteGetRealEstateSchema
>;
export type IRouteGetAllRealEstate = z.infer<
	typeof returnRouteGetAllReaLEstateSchema
>;
