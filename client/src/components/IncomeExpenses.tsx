import { selectTotalExpense, selectTotalIncome } from '../reducers/transactionsSlice';
import { useAppSelector } from '../store/hooks';

export const IncomeExpenses = () => {
	const income = useAppSelector(selectTotalIncome);
	const expense = useAppSelector(selectTotalExpense);

	return (
		<div className='inc-exp-container'>
			<div>
				<h4>Income</h4>
				<p className='money plus'>+${income}</p>
			</div>
			<div>
				<h4>Expense</h4>
				<p className='money minus'>-${expense}</p>
			</div>
		</div>
	);
};
