import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny } from 'zod';

export const verifyRequestBodyIsValidMiddleware =
	(schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
		const validateReqBody = schema.parse(req.body);

		req.body = validateReqBody;

		return next();
	};
