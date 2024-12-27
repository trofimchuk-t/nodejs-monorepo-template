import { Transaction } from '../types/Transaction';

export interface TransactionState {
	transactions: Transaction[];
	error: string | null;
	loading: boolean;
}

export enum ActionType {
	GET_TRANSACTIONS = 'GET_TRANSACTIONS',
	TRANSACTIONS_ERROR = 'TRANSACTIONS_ERROR',
	ADD_TRANSACTION = 'ADD_TRANSACTION',
	DELETE_TRANSACTION = 'DELETE_TRANSACTION',
}

type Action<ActionType, TPayload> = {
	type: ActionType;
	payload: TPayload;
};

type TransactionAction =
	| Action<ActionType.GET_TRANSACTIONS, Transaction[]>
	| Action<ActionType.TRANSACTIONS_ERROR, string>
	| Action<ActionType.ADD_TRANSACTION, Transaction>
	| Action<ActionType.DELETE_TRANSACTION, Pick<Transaction, 'id'>>;

const TransactionsReducer = (state: TransactionState, action: TransactionAction): TransactionState => {
	switch (action.type) {
		case ActionType.GET_TRANSACTIONS:
			return {
				...state,
				loading: false,
				transactions: action.payload,
			};
		case ActionType.TRANSACTIONS_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		case ActionType.ADD_TRANSACTION:
			return {
				...state,
				transactions: [...state.transactions, action.payload],
			};
		case ActionType.DELETE_TRANSACTION:
			return {
				...state,
				transactions: state.transactions.filter(
					(transaction: Transaction) => transaction.id !== action.payload.id,
				),
			};
		default:
			return state;
	}
};
export default TransactionsReducer;
