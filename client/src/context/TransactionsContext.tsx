import axios from 'axios';
import { flow, Instance, types } from 'mobx-state-tree';
import { createContext } from 'react';

const TransactionModel = types.model({
	id: types.identifierNumber,
	amount: types.number,
	date: types.maybeNull(types.string),
	text: types.string,
});

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ITransaction extends Instance<typeof TransactionModel> {}

const TransactionsStore = types
	.model('TransactionsStore', {
		loading: false,
		error: types.maybeNull(types.string),
		transactions: types.array(TransactionModel),
	})
	.views((self) => ({
		get totalAmount() {
			return self.transactions.reduce((acc, item) => (acc += item.amount), 0).toFixed(2);
		},
		get totalExpense() {
			return (
				self.transactions.filter((item) => item.amount < 0).reduce((acc, item) => (acc += item.amount), 0) * -1
			).toFixed(2);
		},
		get totalIncome() {
			return self.transactions
				.filter((item) => item.amount > 0)
				.reduce((acc, item) => (acc += item.amount), 0)
				.toFixed(2);
		},
	}))
	.actions((self) => ({
		// The recommended way to write asynchronous actions is by using flow and generators
		// https://mobx-state-tree.js.org/concepts/async-actions
		getTransactions: flow(function* getTransactions() {
			self.error = null;
			self.loading = true;

			try {
				const response = yield axios.get('/api/v1/transactions');
				self.transactions = response?.data?.data || [];
				self.error = null;
			} catch (error: any) {
				self.error = error?.response?.data?.message || 'Could not load transactions';
			} finally {
				self.loading = false;
			}
		}),
		addTransaction: flow(function* addTransaction(transaction: Omit<ITransaction, 'id'>) {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			try {
				const response = yield axios.post('/api/v1/transactions', transaction, config);
				const createdtransaction = response?.data?.data;

				if (createdtransaction) {
					self.transactions.push(createdtransaction);
				}
				self.error = null;
			} catch (error: any) {
				self.error = error?.response?.data?.message || 'Could not create transaction';
			}
		}),
		deleteTransaction: flow(function* deleteTransaction(id: number) {
			try {
				yield axios.delete(`/api/v1/transactions/${id}`);
				self.error = null;
				self.transactions.replace(self.transactions.filter((x) => x.id !== id));
			} catch (error: any) {
				self.error = error?.response?.data?.message || 'Could not delete transaction';
			}
		}),
	}));

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ITransactionsContext extends Instance<typeof TransactionsStore> {}

export const store = TransactionsStore.create({
	// transactions: [
	// 	TransactionModel.create({
	// 		id: 1,
	// 		text: 'test',
	// 		amount: 10,
	// 	}),
	// ],
});

// Create context
export const TransactionsContext = createContext<ITransactionsContext>(null!);

// Provider component
export const TransactionsProvider = ({ children }: React.PropsWithChildren) => {
	return <TransactionsContext.Provider value={store}>{children}</TransactionsContext.Provider>;
};
