import { NextFunction, Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '../models/errors';

const Transactions = [
	{ id: 1, text: 'Flower', amount: -20 },
	{ id: 2, text: 'Salary', amount: 300 },
	{ id: 3, text: 'Book', amount: -10 },
];
let lastId = 3;

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Public
export const getTransactions = async (_req: Request, res: Response, _next: NextFunction): Promise<any> => {
	try {
		const transactions = Transactions;
		return res.status(200).json({
			success: true,
			count: transactions.length,
			data: transactions,
		});
	} catch (err: any) {
		throw new Error('Server Error: ' + err.message);
	}
};

// @desc    Create a new transaction
// @route   POST /api/v1/transactions
// @access  Public
export const addTransaction = async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
	const { text, amount } = req.body;

	if (!text || !amount) {
		throw new BadRequestError('Please provide a text and amount');
	}

	lastId++;
	try {
		const transaction = {
			id: lastId,
			text,
			amount,
		};
		Transactions.push(transaction);
		return res.status(201).json({
			success: true,
			data: transaction,
		});
	} catch (err: any) {
		if (err.name === 'ValidationError') {
			const message = Object.values(err.errors)
				.map((v: any) => v.message)
				.join(', ');
			throw new BadRequestError(message);
		} else {
			throw new Error('Server Error: ' + err.message);
		}
	}
};

// @desc    Delete a transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Public
export const deleteTransaction = async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
	const id = parseInt(req.params.id);
	const transaction = Transactions.find((transaction) => transaction.id === id);

	if (!transaction) {
		throw new NotFoundError(`Transaction not found with id of ${req.params.id}`);
	}

	try {
		Transactions.splice(
			Transactions.findIndex((transaction) => transaction.id === id),
			1,
		);

		return res.status(200).json({
			success: true,
			data: transaction,
		});
	} catch (err: any) {
		throw new Error('Server Error: ' + err.message);
	}
};
