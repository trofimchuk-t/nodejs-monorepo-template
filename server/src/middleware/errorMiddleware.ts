import { NextFunction, Request, Response } from 'express';
import { IApiError } from '../models/errors';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

// ToDo: Add a logger
// ToDo: Refactor and add a type for the error response
export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
	const isProduction = process.env.NODE_ENV === 'production';
	const message = err.message;
	let name = err.name;
	let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	let expected = false;
	let details: Record<string, unknown> | undefined;
	const stack = isProduction ? null : err.stack;

	const apiError = err as IApiError;
	if (apiError) {
		statusCode = apiError.statusCode ?? 500;
		expected = apiError.expected ?? false;
		name = apiError.name;
		if (!isProduction) {
			details = apiError.details;
		}
	}

	const errorResponse =
		!expected && isProduction && statusCode > 500
			? {
					name: 'InternalServerError',
					message: 'An unexpected error occurred',
				}
			: { name, message, details, stack };

	res.status(statusCode).json(errorResponse);
};
