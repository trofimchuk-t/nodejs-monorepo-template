import axios from 'axios';
import React, { createContext, useMemo, useReducer } from 'react';
import { Transaction } from '../types/Transaction';
import TransactionsReducer, { ActionType, TransactionState } from './TransactionsReducer';

interface Context {
	transactions: Transaction[];
	error: any;
	loading: boolean;
	getTransactions: () => Promise<void>;
	deleteTransaction: (id: number) => Promise<void>;
	addTransaction: (transaction: Omit<Transaction, '_id'>) => Promise<void>;
}

// Initial State
const initialState: TransactionState = {
	transactions: [],
	error: null,
	loading: true,
};

// Create context
export const TransactionsContext = createContext<Context>(null!);

// Provider component
export const TransactionsProvider = ({ children }: React.PropsWithChildren) => {
	const [state, dispatch] = useReducer(TransactionsReducer, initialState);

	// Actions
	async function getTransactions() {
		try {
			const response = await axios.get('/api/v1/transactions');

			dispatch({
				type: ActionType.GET_TRANSACTIONS,
				payload: response.data.data,
			});
		} catch (err: any) {
			dispatch({
				type: ActionType.TRANSACTIONS_ERROR,
				payload: err.response.data.error,
			});
		}
	}

	async function deleteTransaction(id: number) {
		try {
			await axios.delete(`/api/v1/transactions/${id}`);

			dispatch({
				type: ActionType.DELETE_TRANSACTION,
				payload: { _id: id },
			});
		} catch (err: any) {
			dispatch({
				type: ActionType.TRANSACTIONS_ERROR,
				payload: err.response.data.error,
			});
		}
	}

	async function addTransaction(transaction: Omit<Transaction, '_id'>) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const response = await axios.post('/api/v1/transactions', transaction, config);

			dispatch({
				type: ActionType.ADD_TRANSACTION,
				payload: response.data.data,
			});
		} catch (err: any) {
			dispatch({
				type: ActionType.TRANSACTIONS_ERROR,
				payload: err.response.data.error,
			});
		}
	}

	const contextObj = useMemo(
		() => ({
			transactions: state.transactions,
			error: state.error,
			loading: state.loading,
			getTransactions,
			deleteTransaction,
			addTransaction,
		}),
		[state.error, state.loading, state.transactions],
	);

	return <TransactionsContext.Provider value={contextObj}>{children}</TransactionsContext.Provider>;
};
