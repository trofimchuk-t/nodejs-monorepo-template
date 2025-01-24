import { useContext } from 'react';
import { ITransaction, TransactionsContext } from '../context/TransactionsContext';

export const TransactionItem = ({ transaction }: { transaction: ITransaction }) => {
	const { deleteTransaction } = useContext(TransactionsContext);
	const sign = transaction.amount < 0 ? '-' : '';

	return (
		<li className={transaction.amount < 0 ? 'minus' : 'plus'}>
			{transaction.text}{' '}
			<span>
				{sign}${Math.abs(transaction.amount)}
			</span>
			<button onClick={() => deleteTransaction(transaction.id)} className='delete-btn'>
				x
			</button>
		</li>
	);
};
