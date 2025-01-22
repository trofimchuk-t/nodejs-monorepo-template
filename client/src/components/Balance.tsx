import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { TransactionsContext } from '../context/TransactionsContext';

export const Balance = observer(() => {
	const ctx = useContext(TransactionsContext);

	return (
		<>
			<h4>Your Balance</h4>
			<h1>${ctx.totalAmount}</h1>
		</>
	);
});
