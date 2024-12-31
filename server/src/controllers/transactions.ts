import { NextFunction, Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '../models/errors';
import Transaction from '../models/Transaction';

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Public
export const getTransactions = async (_req: Request, res: Response, _next: NextFunction): Promise<any> => {
	try {
		const transactions = await Transaction.find();
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
	try {
		const transaction = await Transaction.create(req.body);
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
	try {
		const transaction = await Transaction.findById(req.params.id);

		if (!transaction) {
			throw new NotFoundError(`Transaction not found with id of ${req.params.id}`);
		}

		await Transaction.deleteOne({ _id: req.params.id });

		return res.status(200).json({
			success: true,
			data: transaction,
		});
	} catch (err: any) {
		throw new Error('Server Error: ' + err.message);
	}
};
