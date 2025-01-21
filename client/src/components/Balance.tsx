import { selectTotalAmount } from '../reducers/transactionsSlice';
import { useAppSelector } from '../store/hooks';

export const Balance = () => {
	const totalAmount = useAppSelector(selectTotalAmount);

	return (
		<>
			<h4>Your Balance</h4>
			<h1>${totalAmount}</h1>
		</>
	);
};
