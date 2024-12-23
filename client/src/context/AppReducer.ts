export const Actions = {
	GET_TRANSACTIONS: 'GET_TRANSACTIONS',
	TRANSACTIONS_ERROR: 'TRANSACTIONS_ERROR',
	ADD_TRANSACTION: 'ADD_TRANSACTION',
	DELETE_TRANSACTION: 'DELETE_TRANSACTION',
};

const AppReducer = (state: any, action: any) => {
	switch (action.type) {
		case Actions.GET_TRANSACTIONS:
			return {
				...state,
				loading: false,
				transactions: action.payload,
			};
		case Actions.TRANSACTIONS_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		case Actions.ADD_TRANSACTION:
			return {
				...state,
				transactions: [...state.transactions, action.payload],
			};
		case Actions.DELETE_TRANSACTION:
			return {
				...state,
				transactions: state.transactions.filter((transaction: any) => transaction.id !== action.payload),
			};
		default:
			return state;
	}
};
export default AppReducer;
