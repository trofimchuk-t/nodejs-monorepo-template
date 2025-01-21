import { deleteTransactionAsync } from '../reducers/transactionsSlice';
import { useAppDispatch } from '../store/hooks';
import { Transaction } from '../types/Transaction';

export const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
	const dispatch = useAppDispatch();
	const sign = transaction.amount < 0 ? '-' : '';

	return (
		<li className={transaction.amount < 0 ? 'minus' : 'plus'}>
			{transaction.text}{' '}
			<span>
				{sign}${Math.abs(transaction.amount)}
			</span>
			<button onClick={() => dispatch(deleteTransactionAsync(transaction.id))} className='delete-btn'>
				x
			</button>
		</li>
	);
};
