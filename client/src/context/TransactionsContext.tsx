import axios from 'axios';
import { action, computed, makeObservable, observable } from 'mobx';
import { createContext } from 'react';
import { Transaction } from '../types/Transaction';

interface Context {
	transactions: Transaction[];
	error: any;
	loading: boolean;
	totalAmount: string;
	totalIncome: string;
	totalExpense: string;
	getTransactions: () => void;
	deleteTransaction: (id: number) => void;
	addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

export class TransactionsStore implements Context {
	transactions: Transaction[] = [];
	error: any = null;
	loading = true;

	constructor() {
		makeObservable(this, {
			transactions: observable,
			error: observable,
			loading: observable,
			getTransactions: action,
			deleteTransaction: action,
			addTransaction: action,
			totalAmount: computed,
			totalExpense: computed,
			totalIncome: computed,
		});
		// Loading transactions	could be done here OR triggered from component
		//this.getTransactions();
	}

	get totalAmount() {
		return this.transactions.reduce((acc, item) => (acc += item.amount), 0).toFixed(2);
	}

	get totalExpense() {
		return (
			this.transactions.filter((item) => item.amount < 0).reduce((acc, item) => (acc += item.amount), 0) * -1
		).toFixed(2);
	}

	get totalIncome() {
		return this.transactions
			.filter((item) => item.amount > 0)
			.reduce((acc, item) => (acc += item.amount), 0)
			.toFixed(2);
	}

	getTransactions() {
		this.loading = true;
		axios
			.get('/api/v1/transactions')
			.then((response) => {
				this.loading = false;
				this.error = null;
				this.transactions = response.data.data;
			})
			.catch((err: any) => {
				this.loading = false;
				this.error = err.response.data.message;
			});
	}

	deleteTransaction(id: number) {
		axios
			.delete(`/api/v1/transactions/${id}`)
			.then(() => {
				this.error = null;
				this.transactions = this.transactions.filter((transaction) => transaction.id !== id);
			})
			.catch((err: any) => {
				this.error = err.response.data.message;
			});
	}

	addTransaction(transaction: Omit<Transaction, 'id'>) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		axios
			.post('/api/v1/transactions', transaction, config)
			.then((response) => {
				this.error = null;
				this.transactions.push(response.data.data);
			})
			.catch((err: any) => {
				this.error = err.response.data.message;
			});
	}
}

// Create context
export const TransactionsContext = createContext<Context>(null!);
