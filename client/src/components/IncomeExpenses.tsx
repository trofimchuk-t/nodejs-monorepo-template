import { observer } from 'mobx-react';
import { useContext } from 'react';
import { TransactionsContext } from '../context/TransactionsContext';

export const IncomeExpenses = observer(() => {
	const { totalIncome, totalExpense } = useContext(TransactionsContext);

	return (
		<div className='inc-exp-container'>
			<div>
				<h4>Income</h4>
				<p className='money plus'>+${totalIncome}</p>
			</div>
			<div>
				<h4>Expense</h4>
				<p className='money minus'>-${totalExpense}</p>
			</div>
		</div>
	);
});
