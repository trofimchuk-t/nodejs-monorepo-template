import { useContext, useEffect } from 'react';
import { TransactionsContext } from '../context/TransactionsContext';
import { TransactionItem } from './TransactionItem';

export const TransactionList = () => {
	const { transactions, loading, error, getTransactions } = useContext(TransactionsContext);

	useEffect(() => {
		getTransactions();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<h3>History</h3>
			{loading ? (
				<p>Loading...</p>
			) : (
				<ul className='list'>
					{transactions.map((transaction) => (
						<TransactionItem key={transaction.id} transaction={transaction} />
					))}
				</ul>
			)}
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</>
	);
};
