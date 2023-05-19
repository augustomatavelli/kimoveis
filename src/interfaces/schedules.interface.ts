import {
	scheduleSchema,
	returnScheduleSchema,
	returnSchedulesFromRealEstateAndUserSchema,
} from '../schemas/schedules.schema';
import { z } from 'zod';

export type ISchedule = z.infer<typeof scheduleSchema>;
export type IScheduleReturn = z.infer<typeof returnScheduleSchema>;
export type IScheduleFromRealEstateAndUserReturn = z.infer<
	typeof returnSchedulesFromRealEstateAndUserSchema
>;
