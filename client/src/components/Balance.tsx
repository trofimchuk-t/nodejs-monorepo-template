import { observer } from 'mobx-react';
import { useContext } from 'react';
import { TransactionsContext } from '../context/TransactionsContext';

export const Balance = observer(() => {
	const { totalAmount } = useContext(TransactionsContext);

	return (
		<>
			<h4>Your Balance</h4>
			<h1>${totalAmount}</h1>
		</>
	);
});
