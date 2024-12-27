export interface IApiError extends Error {
	expected?: boolean;
	statusCode?: number;
	details?: Record<string, unknown>;
}

export class BadRequestError extends Error implements IApiError {
	expected = true;
	statusCode = 400;
	constructor(
		message: string,
		public details?: Record<string, unknown>,
	) {
		super(message);
		this.name = BadRequestError.name;
	}
}

export class NotFoundError extends Error implements IApiError {
	expected = true;
	statusCode = 404;
	constructor(
		message: string,
		public details?: Record<string, unknown>,
	) {
		super(message);
		this.name = NotFoundError.name;
	}
}
