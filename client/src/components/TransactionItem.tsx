import { useContext } from 'react';
import { TransactionsContext } from '../context/TransactionsContext';
import { Transaction } from '../types/Transaction';

export const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
	const ctx = useContext(TransactionsContext);
	const sign = transaction.amount < 0 ? '-' : '';

	return (
		<li className={transaction.amount < 0 ? 'minus' : 'plus'}>
			{transaction.text}{' '}
			<span>
				{sign}${Math.abs(transaction.amount)}
			</span>
			<button onClick={() => ctx.deleteTransaction(transaction.id)} className='delete-btn'>
				x
			</button>
		</li>
	);
};
