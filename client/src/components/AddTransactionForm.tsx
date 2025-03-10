import { useContext, useState } from 'react';
import { TransactionsContext } from '../context/TransactionsContext';

export const AddTransactionForm = () => {
	const { addTransaction } = useContext(TransactionsContext);
	const [text, setText] = useState('');
	const [amount, setAmount] = useState(0);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newTransaction = {
			text,
			amount,
		};
		addTransaction(newTransaction);
		setText('');
		setAmount(0);
	};

	return (
		<>
			<h3>Add new transaction</h3>
			<form onSubmit={onSubmit}>
				<div className='form-control'>
					<label htmlFor='text'>Text</label>
					<input
						type='text'
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder='Enter text...'
					/>
				</div>
				<div className='form-control'>
					<label htmlFor='amount'>
						Amount <br />
						(negative - expense, positive - income)
					</label>
					<input
						type='number'
						value={amount}
						onChange={(e) => setAmount(+e.target.value)}
						placeholder='Enter amount...'
					/>
				</div>
				<button className='btn'>Add transaction</button>
			</form>
		</>
	);
};
