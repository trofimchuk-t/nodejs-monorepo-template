import { Instance, types } from 'mobx-state-tree';
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
		addTransaction(item: Omit<ITransaction, 'id'>) {
			self.transactions.push(
				TransactionModel.create({
					id: self.transactions.reduce((a, b) => Math.max(a, b.id), 0) + 1,
					amount: item.amount,
					text: item.text,
				}),
			);
		},
		deleteTransaction(id: number) {
			const item = self.transactions.find((x) => x.id === id);
			if (item) {
				self.transactions.remove(item);
			}
		},
	}));

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ITransactionsContext extends Instance<typeof TransactionsStore> {}

export const store = TransactionsStore.create({
	transactions: [
		TransactionModel.create({
			id: 1,
			text: 'test',
			amount: 10,
		}),
	],
});

// Create context
export const TransactionsContext = createContext<ITransactionsContext>(null!);

// Provider component
export const TransactionsProvider = ({ children }: React.PropsWithChildren) => {
	return <TransactionsContext.Provider value={store}>{children}</TransactionsContext.Provider>;
};
