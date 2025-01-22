import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { TransactionsContext } from '../context/TransactionsContext';

export const IncomeExpenses = observer(() => {
	const ctx = useContext(TransactionsContext);

	return (
		<div className='inc-exp-container'>
			<div>
				<h4>Income</h4>
				<p className='money plus'>+${ctx.totalIncome}</p>
			</div>
			<div>
				<h4>Expense</h4>
				<p className='money minus'>-${ctx.totalExpense}</p>
			</div>
		</div>
	);
});
